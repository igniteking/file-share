"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useOrganization,
  useUser,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }
  const listFiles = useQuery(api.files.listFiles, orgId ? { orgId } : "skip");
  const createFile = useMutation(api.files.createNewFile);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {listFiles?.map((files) => {
        return <div key={files._id}>{files.name}</div>;
      })}
      <Button
        onClick={() => {
          if (!orgId) return;
          createFile({ name: orgId, orgId: orgId });
        }}
        variant="secondary"
      >
        Insert
      </Button>
    </main>
  );
}
