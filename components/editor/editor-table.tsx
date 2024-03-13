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
import { SchematicNBT } from '@/lib/interfaces/SchematicNBT';

interface TableEntry {
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
  if (!jsonData || !nbt) return null;

  const [tableData, setTableData] = React.useState<TableEntry[]>([]);

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
    <Table>
      {tableData.map((entry, index) => (
        <TableRow key={index}>
          <TableCell>{entry.name}</TableCell>
          <TableCell>{entry.mod}</TableCell>
          <TableCell>{entry.count}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}
