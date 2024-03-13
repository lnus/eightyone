'use client';

import { SchematicJSON } from '@/lib/interfaces/SchematicJSON';
import React from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

import { SchematicNBT } from '@/lib/interfaces/SchematicNBT';
import { Input } from '../ui/input';
import { EditorEntry } from './editor-entry';

export interface TableEntry {
  name: string;
  mod: string;
  count: number;
}

export function EditorTable({
  jsonData,
  nbt,
}: {
  jsonData: SchematicJSON | null;
  nbt: SchematicNBT | null;
}) {
  // Only using JSON data; checking NBT in case JSON not processed
  if (!jsonData) return null;

  // Using this rather than a DataTable
  // I couldn't get the DataTable to work properly
  const [tableData, setTableData] = React.useState<TableEntry[]>([]);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  // Format the table data, easier to display
  const formatTableData = () => {
    const materialList = jsonData.header.material_list.root_entry;
    const data: TableEntry[] = [];

    for (const entry of materialList) {
      data.push({
        name: entry.item.id,
        mod: entry.item.id.split(':')[0],
        count: entry.count,
      });
    }

    setTableData(data);
  };

  React.useEffect(() => {
    formatTableData();
  }, [jsonData]);

  return (
    <div className="w-full sm:p-4">
      <Input
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border-0"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Mod</TableHead>
            <TableHead>Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData
            .filter((entry) => {
              return entry.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            })
            .map((entry, index) => (
              <EditorEntry entry={entry} key={entry.name} />
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
