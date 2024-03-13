'use client'; // This is the editor, needs to be interactive 😄

import { JsonImport } from '@/components/editor/json-import';
import { ModeToggle } from '@/components/theme-toggle';
import Image from 'next/image';

import { SchematicJSON } from '@/lib/interfaces/SchematicJSON';
import { SchematicNBT } from '@/lib/interfaces/SchematicNBT';
import React from 'react';

export default function Home() {
  // TODO: Do this in a context provider or something
  const [jsonData, setJsonData] = React.useState<SchematicJSON | null>(null);
  const [nbt, setNbt] = React.useState<SchematicNBT | null>(null);

  return (
    <main>
      <JsonImport
        jsonData={jsonData}
        setJsonData={setJsonData}
        setNbt={setNbt}
      />
    </main>
  );
}
