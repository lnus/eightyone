import { SchematicJSON } from '@/lib/interfaces/SchematicJSON';
import { SchematicNBT } from '@/lib/interfaces/SchematicNBT';
import { create } from 'zustand';

type DataState = {
  ready: boolean;
  jsonData: SchematicJSON | null;
  nbt: SchematicNBT | null;
  setReady: (ready: boolean) => void;
  setJsonData: (data: SchematicJSON | null) => void;
  setNbt: (nbt: SchematicNBT | null) => void;
};

export const useDataStore = create<DataState>((set) => ({
  ready: false,
  jsonData: null,
  nbt: null,
  setReady: (ready) => set({ ready }),
  setJsonData: (jsonData) => set({ jsonData }),
  setNbt: (nbt) => set({ nbt }),
}));
