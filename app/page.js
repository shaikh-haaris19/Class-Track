"use client";
import { Button } from "@/components/ui/button";
import { useClerk, useUser } from "@clerk/nextjs";

export default function Home() {

  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={() => openSignIn()}>Click me</Button>
    </div>
  );
}
