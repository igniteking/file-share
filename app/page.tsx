"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";

export default function Home() {
  const listFiles = useQuery(api.files.listFiles);
  const createFile = useMutation(api.files.createNewFile);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedOut>
        <SignInButton>
          <Button variant="outline">Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <SignOutButton>
          <Button variant="outline">Sign Out</Button>
        </SignOutButton>
      </SignedIn>
      {listFiles?.map((files) => {
        return <div key={files._id}>{files.name}</div>;
      })}
      <Button
        onClick={() => {
          createFile({ name: "Hello world" });
        }}
        variant="secondary"
      >
        Insert
      </Button>
    </main>
  );
}
