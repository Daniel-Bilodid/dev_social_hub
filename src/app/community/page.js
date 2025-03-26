"use server";

import React from "react";
import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";

export default async function CommunityPage() {
  try {
    const clerk = await clerkClient();

    const users = await clerk.users.getUserList();
    console.log(users.data);

    return (
      <div>
        <h1>Community page</h1>
        <ul>
          {users.data.map((user) => (
            <Link href={`/community/${user.id}`} key={user.id}>
              {user.imageUrl && (
                <Image
                  src={user.imageUrl}
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt="User image"
                />
              )}
              {user.username}
            </Link>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return <div>Error</div>;
  }
}
