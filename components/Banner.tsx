'use client';

import { useState } from 'react';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import { UserButton, SignedOut, SignedIn } from "@clerk/nextjs";
import Link from 'next/link';

export default function Banner() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="from-primary-300 to-primary-500 fixed z-50 flex h-20 w-full items-center gap-4 bg-gradient-to-tr px-6 py-4 shadow-lg top-0">
      <button onClick={handleMenuClick}>
        <MenuIcon sx={{ fontSize: 30, color: 'white' }} />
      </button>

      <Sidebar open={isSidebarOpen} onClose={handleSidebarClose} />

      <Image
        src="/favicon_white.png"
        alt="ShelterConnect Logo"
        width={60}
        height={60}
        className="h-auto w-[60px] max-w-[80px] object-contain"
        priority
      />

      <h1 className="text-2xl font-semibold text-white">ShelterConnect</h1>
      
      <div className="ml-auto flex items-center gap-4">
        <SignedOut>
          <Link href="/sign-in" className="text-white hover:text-gray-200">Sign in</Link>
          <Link href="/sign-up" className="bg-white text-primary-500 px-4 py-2 rounded-lg hover:bg-gray-100">Sign up</Link>
        </SignedOut>

        <SignedIn>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-10 h-10"
              }
            }}
          />
        </SignedIn>
      </div>
    </div>
  );
}
