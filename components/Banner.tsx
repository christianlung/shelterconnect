'use client';

import { useState } from 'react';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';

export default function Banner() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="z-50 flex h-20 w-full items-center gap-4 bg-gradient-to-tr from-primary-300 to-primary-500 px-6 py-4 shadow-lg">
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
    </div>
  );
}
