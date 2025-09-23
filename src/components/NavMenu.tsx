import { Link } from '@tanstack/react-router';
import React from 'react';

import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export type NavMenuItem = {
  label: string
  to?: string
  external?: boolean
  children?: Array<NavMenuItem>
}

interface NavMenuProps {
  items: Array<NavMenuItem>
}

export const NavMenu: React.FC<NavMenuProps> = ({ items }) => {
  return (
    <nav className="flex gap-4">
      {items.map((item, idx) => (
        <NavMenuEntry key={item.label + idx} item={item} />
      ))}
    </nav>
  );
};

const navButtonClass =
  'text-lg font-semibold px-4 py-2 rounded-xl transition-all duration-200 shadow-sm active:scale-95 bg-transparent dark:bg-transparent ' +
  'hover:bg-primary/80 hover:text-primary-foreground focus:bg-primary/90 focus:text-primary-foreground ' +
  'dark:hover:bg-primary dark:hover:text-primary-foreground dark:focus:bg-primary dark:focus:text-primary-foreground';

const dropdownItemClass =
  'w-full text-left text-base rounded-lg px-4 py-2 transition-colors bg-transparent dark:bg-transparent ' +
  'hover:bg-primary/80 hover:text-primary-foreground focus:bg-primary/90 focus:text-primary-foreground ' +
  'dark:hover:bg-primary dark:hover:text-primary-foreground dark:focus:bg-primary dark:focus:text-primary-foreground';

const NavMenuEntry: React.FC<{ item: NavMenuItem }> = ({ item }) => {
  if (item.children && item.children.length > 0) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={
              navButtonClass + ' flex items-center gap-1 cursor-pointer'
            }
          >
            {item.label}
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="min-w-[180px] p-1 bg-card text-card-foreground border border-border rounded-lg shadow-lg dark:bg-neutral-900/95"
        >
          {item.children.map((child, idx) =>
            child.children && child.children.length > 0 ? (
              <NavMenuEntry key={child.label + idx} item={child} />
            ) : (
              <DropdownMenuItem
                asChild
                key={child.label + idx}
                className={dropdownItemClass}
              >
                {child.external ? (
                  <a
                    href={child.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    {child.label} ➚
                  </a>
                ) : (
                  <Link to={child.to || '#'} className="cursor-pointer">
                    {child.label}
                  </Link>
                )}
              </DropdownMenuItem>
            ),
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  if (item.to) {
    if (item.external) {
      return (
        <Button asChild variant="ghost" className={navButtonClass}>
          <a
            href={item.to}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            {item.label} ➚
          </a>
        </Button>
      );
    } else {
      return (
        <Button asChild variant="ghost" className={navButtonClass}>
          <Link to={item.to}>{item.label}</Link>
        </Button>
      );
    }
  }
  return (
    <Button variant="ghost" className={navButtonClass} disabled>
      {item.label}
    </Button>
  );
};
