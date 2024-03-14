'use client'; // This is the editor, needs to be interactive 😄

import { JsonImport } from '@/components/editor/json-import';
import { ModeToggle } from '@/components/theme-toggle';
import Image from 'next/image';

import { SchematicJSON } from '@/lib/interfaces/SchematicJSON';
import { SchematicNBT } from '@/lib/interfaces/SchematicNBT';
import React from 'react';
import { EditorTable } from '@/components/editor/editor-table';
import { DataTableDemo } from '@/components/editor/demo-data-table';
import { EditorDataTable } from '@/components/editor/editor-data-table';

import * as NBT from 'nbtify';

export default function Home() {
  // TODO: Do this in a context provider or something
  const [jsonData, setJsonData] = React.useState<SchematicJSON | null>(null);
  const [nbt, setNbt] = React.useState<SchematicNBT | null>(null);

  // TODO: Move this and structure better
  const updateItem = async (oldItem: string, newItem: string) => {
    if (!jsonData || !nbt) return;

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
    setJsonData(newJsonData);
    setNbt(decoded);

    // TODO: Notify the user
  };

  return (
    <main>
      <JsonImport
        jsonData={jsonData}
        setJsonData={setJsonData}
        setNbt={setNbt}
      />
      {/* <EditorTable jsonData={jsonData} nbt={nbt} /> */}
      <EditorDataTable jsonData={jsonData} />
    </main>
  );
}
