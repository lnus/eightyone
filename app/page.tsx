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
      <div className="overflow-hidden">
        <div className="h-full flex-col md:flex">
          <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
            <h2 className="text-lg w-full font-semibold">Schematic Editor</h2>
            <div className="ml-auto flex w-full h-full justify-end align-center">
              <JsonImport />
              <Button
                variant="outline"
                onClick={() => {
                  window.navigator.clipboard.writeText(
                    JSON.stringify(jsonData)
                  );
                }}
                className="ml-2"
              >
                Copy JSON
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <div className="container h-full py-6">
              <EditorDataTable />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
