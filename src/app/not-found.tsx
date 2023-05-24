'use client';

import BaseButton from '@components/BaseButton/BaseButton';
import { useRouter } from 'next/navigation';

const PageNotFound = () => {
  const router = useRouter();

  return (
    <div className="container">
      <h1 className="hero-title">Not Found Page</h1>
      <BaseButton onClick={() => router.push('/')}>Go to home page</BaseButton>
    </div>
  );
};

export default PageNotFound;
