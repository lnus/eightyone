import { TableEntry } from './editor-table';

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

export function EditorEntry({
  entry,
  key,
}: {
  entry: TableEntry;
  key: string | number;
}) {
  return (
    <Dialog key={key}>
      <ContextMenu>
        <TableRow className="cursor-pointer">
          <ContextMenuTrigger>
            <TableCell>{entry.name}</TableCell>
          </ContextMenuTrigger>
          <TableCell>{entry.mod}</TableCell>
          <TableCell>{entry.count}</TableCell>
        </TableRow>
        <ContextMenuContent>
          <DialogTrigger asChild>
            <ContextMenuItem>More information</ContextMenuItem>
          </DialogTrigger>
        </ContextMenuContent>
      </ContextMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{entry.name}</DialogTitle>
          <DialogDescription>
            {entry.mod} - {entry.count}
          </DialogDescription>
        </DialogHeader>
        <DialogContent>
          <p>More information here</p>
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
}
