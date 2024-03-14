'use client';

import { GitHubLogoIcon, StackIcon } from '@radix-ui/react-icons';
import {
  NavigationMenu,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from './ui/button';
import { ModeToggle } from './theme-toggle';
import { SearchBar } from './search-bar';
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import { NavItem } from './nav-item';

export const MainNav = () => {
  // Yoinking the top nav from https://ui.shadcn.com/docs/, hehe
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <StackIcon className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">eightyone</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavItem href="/" text="Editor" />
              <NavItem href="/schematics" text="Schematics" />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <SearchBar />
          <nav className="flex items-center">
            <Button
              onClick={() =>
                (location.href = 'https://github.com/lnus/eightyone')
              }
              variant="outline"
              size="icon"
              className="border-0 mx-2"
            >
              <GitHubLogoIcon className="h-6 w-6" />
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};
