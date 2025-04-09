'use client';

import * as React from 'react';
import {MoonIcon, SunIcon} from 'lucide-react';
import {useTheme} from 'next-themes';
import {Button} from '@/components/ui/button';

export default function ModeToggleFull() {
  const {theme, setTheme} = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="relative items-center justify-start w-full text-start  rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <SunIcon
        className={`h-[1.2rem] w-[1.2rem] transition-opacity duration-200 ${
          theme === 'dark' ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <MoonIcon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-opacity duration-200 ${
          theme === 'dark' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{left: '0.5rem'}}
      />{' '}
      <span className="ml-2 hidden sm:inline">
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </span>
    </Button>
  );
}
