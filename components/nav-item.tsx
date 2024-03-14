import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
export const NavItem = ({ href, text }: { href: string; text: string }) => {
  return (
    <NavigationMenuItem>
      <Link href={href}>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {text}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};
