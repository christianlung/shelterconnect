'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import { UserButton, SignedOut, SignedIn } from '@clerk/nextjs';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Banner() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="fixed top-0 z-50 flex h-20 w-full items-center gap-4 bg-gradient-to-tr from-primary-300 to-primary-500 px-6 py-4 shadow-lg"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleMenuClick}
        className="rounded-full p-2 transition-colors hover:bg-white/10"
      >
        <MenuIcon sx={{ fontSize: 24, color: 'white' }} />
      </motion.button>

      <Sidebar open={isSidebarOpen} onClose={handleSidebarClose} />

      <Link
        href="/"
        className="flex items-center gap-3 transition-opacity hover:opacity-90"
      >
        <Image
          src="/favicon_white.png"
          alt="ShelterConnect Logo"
          width={48}
          height={48}
          className="h-12 w-12 object-contain"
          priority
        />
        <h1 className="hidden text-2xl font-bold text-white sm:block">
          ShelterConnect
        </h1>
      </Link>

      <div className="ml-auto flex items-center gap-4">
        <SignedOut>
          <Link
            href="/sign-in"
            className="rounded-lg px-4 py-2 text-white transition-colors hover:bg-white/10 hover:text-gray-200"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="rounded-lg bg-white px-6 py-2 font-medium text-primary-500 shadow-md transition-colors hover:bg-gray-100"
          >
            Sign up
          </Link>
        </SignedOut>

        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  'w-10 h-10 ring-2 ring-white/20 hover:ring-white/40 transition-all',
                userButtonPopulator: 'hover:opacity-80 transition-opacity',
              },
            }}
          />
        </SignedIn>
      </div>
    </motion.div>
  );
}
