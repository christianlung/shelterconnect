'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

export default function RoleSelection() {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const selectRole = async (role: 'volunteer' | 'coordinator') => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      await user.update({
        unsafeMetadata: {
          role: role,
        },
      });
      router.push('/');
    } catch (error) {
      console.error('Error updating role:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Choose Your Role</h1>
          <p className="mt-2 text-sm text-gray-600">
            Select how you want to help in ShelterConnect
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => selectRole('volunteer')}
            disabled={isLoading}
            className="w-full p-4 text-left border rounded-lg hover:border-primary-500 hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-lg font-semibold">Volunteer</h2>
            <p className="text-sm text-gray-600">Help shelters and contribute to your community</p>
          </button>
          
          <button
            onClick={() => selectRole('coordinator')}
            disabled={isLoading}
            className="w-full p-4 text-left border rounded-lg hover:border-primary-500 hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-lg font-semibold">Coordinator</h2>
            <p className="text-sm text-gray-600">Manage shelter operations and coordinate volunteers</p>
          </button>
        </div>
      </div>
    </div>
  );
} 