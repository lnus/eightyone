import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '../ui/button';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { TableEntry } from './editor-data-table';
import { Code, Trash } from 'lucide-react';
import { useDataStore } from '@/store/zustand';
import * as NBT from 'nbtify';
import { SchematicNBT } from '@/lib/interfaces/SchematicNBT';
import { SchematicJSON } from '@/lib/interfaces/SchematicJSON';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import React from 'react';

export function DataTableDropdown({ row }: { row: Row<TableEntry> }) {
  const { jsonData, nbt, setJsonData, setNbt } = useDataStore();
  const [newName, setNewName] = React.useState<string>(row.getValue('name'));

  const updateItem = async (oldItem: string, newItem: string) => {
    if (!jsonData || !nbt) {
      console.error('NBT or JSON data is missing');
      console.error('JSON data', jsonData);
      console.error('NBT data', nbt);
      return;
    }

    // Update the NBT data first
    // NOTE: Can't copy directly in JS, so "rewrite" a new object
    const result: Uint8Array = await NBT.write(nbt as NBT.NBTData);
    const decoded = (await NBT.read(result)) as SchematicNBT;

    // Find all indices of the item
    const indices = decoded.data.data
      .map((item: any, index: number) =>
        item.state.Name === oldItem ? index : -1
      )
      .filter((index) => index !== -1);

    // Then, update the item in NBT
    indices.forEach((index) => {
      decoded.data.data[index].state.Name = newItem;
      console.log('Updated item in NBT', decoded.data.data[index]); // TODO: Remove
    });

    // Encode and save the new NBT data
    const newResult: Uint8Array = await NBT.write(decoded as NBT.NBTData);
    const base64Data = btoa(String.fromCharCode(...newResult));
    const newJsonData = { ...jsonData } as SchematicJSON;

    // Yay, we're getting somewhere
    newJsonData.body = base64Data;

    // Update the JSON data for the same item
    const itemIndex = newJsonData.header.material_list.root_entry.findIndex(
      (item) => item.item.id === oldItem
    );
    newJsonData.header.material_list.root_entry[itemIndex].item.id = newItem;

    // Update the state
    console.log('New JSON data', newJsonData);
    setJsonData(newJsonData);
    setNbt(decoded);

    // TODO: Notify the user
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" aria-label="More options">
            <DotsHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{row.getValue('name')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Code className="mr-2 h-4 w-4" />
              <span>Edit</span>
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem disabled>
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit item</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              New name
            </Label>
            <Input
              id="name"
              defaultValue={row.getValue('name')}
              className="col-span-3"
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button onClick={() => updateItem(row.getValue('name'), newName)}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
