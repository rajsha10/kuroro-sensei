"use client";

import KuroroLanding from "@/components/KuroroLanding"
import LoginButton from "@/components/LoginButton";
import { useOCAuth } from '@opencampus/ocid-connect-js';
import LoadingScreen from "@/components/loading-screen";

export default function Home() {
  const { isInitialized, authState, ocAuth } = useOCAuth();

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (authState.error) {
    return <div>Error: {authState.error.message}</div>;
  }

  return (
    <>
      {authState.isAuthenticated ? (
        <KuroroLanding />
       ) : (
        <LoginButton />
       )}
    </>
  )
}
