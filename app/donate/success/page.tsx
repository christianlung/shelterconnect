'use client'; 

import { useRouter } from 'next/navigation'; 
import { useEffect } from 'react';

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/'); 
    }, 5000); 
  }, [router]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Donation Successful!</h1>
      <p>Thank you for your donation! Your payment was successfully processed.</p>
      <p>You will be redirected shortly, or you can click the button below to return to the homepage.</p>
      <button onClick={() => router.push('/')} className="w-48 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
        Return to Home
      </button>
    </div>
  );
};

export default SuccessPage;
