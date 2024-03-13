import React from 'react';
import { CommandMenu } from './command-menu';
import { Button } from './ui/button';

export function SearchBar() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-full flex-1 md:w-auto md:flex-none">
      <Button
        className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        variant="ghost"
        onClick={() => setOpen(true)}
      >
        <span className="inline-flex">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span>⌘</span>K
        </kbd>
      </Button>
      <CommandMenu open={open} setOpen={setOpen} />
    </div>
  );
}
