'use client';

import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { SchematicJSON } from '@/lib/interfaces/SchematicJSON';
import { SchematicNBT } from '@/lib/interfaces/SchematicNBT';
import * as NBT from 'nbtify';

export function JsonImport({
  jsonData,
  setJsonData,
  setNbt,
}: {
  jsonData: SchematicJSON | null;
  setJsonData: React.Dispatch<React.SetStateAction<SchematicJSON | null>>;
  setNbt: React.Dispatch<React.SetStateAction<SchematicNBT | null>>;
}) {
  const [ready, setReady] = React.useState(false);
  // TODO: Add a way to import just via text input ?
  // TODO: Limit max file size to like, 1MB or something

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setReady(false);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result;
      if (typeof result !== 'string') return;

      try {
        const json = JSON.parse(result);
        setReady(true);
        setJsonData(json);

        await parseJsonData();
      } catch (err) {
        console.error(err);
      }
    };
    reader.readAsText(file);
  };

  const parseJsonData = async () => {
    if (!jsonData) return; // null check

    // For now, assume that the JSON is in good shape
    // TODO: Validate the JSON
    // TODO: Support different versions
    const bodyData = jsonData.body;

    // Body is base64 encoded
    const body = atob(bodyData);

    // Convert to byte array
    const bytes = new Uint8Array(body.length);
    for (let i = 0; i < body.length; i++) {
      bytes[i] = body.charCodeAt(i);
    }

    // Use NBTify to parse the NBT data
    try {
      const data = (await NBT.read(bytes)) as SchematicNBT;
      setNbt(data);

      // TODO: Add alert or something
      console.log('Parsed NBT data', data);
    } catch (err) {
      // TODO: Add alert or something
      console.error(err);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="schem">Upload schematic file</Label>
      <Input
        id="schem"
        type="file"
        accept="application/json, text/plain"
        onChange={handleFileChange}
      />
    </div>
  );
}
