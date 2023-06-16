'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import auth from '@/utils/auth';

function Home() {
  const router = useRouter();
  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push('/login');
    } else {
      router.push('/my-actions');
    }
  });
}

export default Home;
