'use client';

import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { SchematicJSON } from '@/lib/interfaces/SchematicJSON';
import { SchematicNBT } from '@/lib/interfaces/SchematicNBT';
import * as NBT from 'nbtify';
import { useDataStore } from '@/store/zustand';

export function JsonImport() {
  const { setJsonData, setNbt } = useDataStore();

  // Used to not recompute everything when the JSON data changes
  // Only recompute the NBT data when the JSON import changes
  const [localJson, setLocalJson] = React.useState<SchematicJSON | null>(null);

  // TODO: Add a way to import just via text input ?
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result;
      if (typeof result !== 'string') return;

      try {
        const json = JSON.parse(result);
        setJsonData(json);
        setLocalJson(json);
      } catch (err) {
        console.error(err);
      }
    };

    reader.readAsText(file);
  };

  // For now, assume that the JSON is in good shape
  // TODO: Validate the JSON
  // TODO: Support different versions
  const parseJsonData = async () => {
    if (!localJson) {
      console.log('No JSON data');
      return;
    }

    const bodyData = localJson.body;

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

      console.log('Parsed imported NBT data', data);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    // Always recompute the NBT when the JSON data changes
    if (localJson) {
      parseJsonData();
    }
  }, [localJson]);

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {/* <Label htmlFor="schem">Upload schematic file</Label> */}
      <Input
        id="schem"
        placeholder='Upload "schematic.json" file'
        type="file"
        accept="application/json, text/plain"
        onChange={async (e) => {
          await handleFileChange(e);
        }}
      />
    </div>
  );
}
