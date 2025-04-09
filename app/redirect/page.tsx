'use client';

import React from 'react';
import { LoginCallBack, useOCAuth } from '@opencampus/ocid-connect-js';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/loading-screen';

// Separated into a standalone component to properly use hooks
function CustomErrorComponent() {
  const { authState } = useOCAuth();
  return <div>Error Logging in: {authState.error?.message}</div>;
}

export default function RedirectPage() {
  const router = useRouter();

  const loginSuccess = () => {
    router.push('/');
  };

  const loginError = (error: unknown) => {
    console.error('Login error:', error);
  };

  return (
    <LoginCallBack 
      errorCallback={loginError}
      successCallback={loginSuccess}
      customErrorComponent={<CustomErrorComponent />}
      customLoadingComponent={<LoadingScreen />}
    />
  );
}