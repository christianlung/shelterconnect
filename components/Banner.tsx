'use client';

import Image from 'next/image';
import { UserButton, SignedOut, SignedIn } from '@clerk/nextjs';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';

export default function Banner() {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="sticky top-0 z-50 flex h-12 w-full items-center gap-2 bg-gray-100 px-4 py-2 shadow-lg md:h-20 md:gap-4 md:px-6 md:py-4"
    >
      <Link
        href="/"
        className="flex items-center gap-2 transition-opacity hover:opacity-80 md:gap-3"
      >
        <div className="flex items-center justify-center rounded-lg bg-primary-500 px-1.5 py-1 md:px-2 md:py-1.5">
          <Image
            src="/favicon_white.png"
            alt="ShelterConnect Logo"
            width={24}
            height={24}
            className="h-5 w-5 object-contain md:h-7 md:w-7"
            priority
          />
        </div>
        <h1 className="hidden text-2xl font-bold text-primary-500 sm:block">
          ShelterConnect
        </h1>
      </Link>

      <div className="ml-auto flex items-center gap-2 md:gap-4">
        <Link
          href="/donate"
          className="flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-1.5 text-sm font-medium text-white shadow-md transition-colors hover:bg-primary-600 md:px-6 md:py-2 md:text-base"
        >
          <FontAwesomeIcon
            icon={faHandHoldingDollar}
            className="h-4 w-4 md:h-5 md:w-5"
          />
          Donate
        </Link>
        <SignedOut>
          <Link
            href="/sign-in"
            className="rounded-lg px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 md:px-4 md:py-2 md:text-base"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="rounded-lg bg-primary-500 px-4 py-1.5 text-sm font-medium text-white shadow-md transition-colors hover:bg-primary-600 md:px-6 md:py-2 md:text-base"
          >
            Sign up
          </Link>
        </SignedOut>

        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  'w-8 h-8 ring-2 ring-primary-100 hover:ring-primary-200 transition-all md:w-10 md:h-10',
                userButtonPopulator: 'hover:opacity-80 transition-opacity',
              },
            }}
          />
        </SignedIn>
      </div>
    </motion.div>
  );
}
