'use client'; // This is the editor, needs to be interactive 😄

import React from 'react';
import { JsonImport } from '@/components/editor/json-import';
import { EditorDataTable } from '@/components/editor/editor-data-table';
import { useDataStore } from '@/store/zustand';
import { Button } from '@/components/ui/button';

export default function Home() {
  // Get the data from zustand DataState
  // TODO: Might not even be needed here, tbf
  const { jsonData, nbt, setJsonData, setNbt } = useDataStore();

  return (
    <main>
      <JsonImport />
      <EditorDataTable />
      <Button
        onClick={() => {
          window.navigator.clipboard.writeText(JSON.stringify(jsonData));
        }}
      >
        Copy JSON to clipboard
      </Button>
    </main>
  );
}
