"use client";
import { Button } from "@/components/ui/button";
import { useClerk, useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes"
import { useEffect } from "react";

export default function Home() {

  const { openSignIn, signOut } = useClerk();
  const { user } = useUser();

  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme("light");
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {
        user ? (
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user.firstName}!</h1>
            <p className="mt-2 text-gray-600">You are logged in.</p>
            <p onClick={() => signOut()}>Sign Out</p>
          </div>
        ) : (
          <Button onClick={() => openSignIn()}>Sign In</Button>
        )
      }
    </div>
  );
}
