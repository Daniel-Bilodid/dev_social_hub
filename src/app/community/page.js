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

        <input
          type="text"
          placeholder="Search for user"
          className="w-full px-10 py-2 rounded-md border border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-400"
        />

        <div className="flex flex-wrap mt-12 justify-center">
          <ul className="flex gap-4">
            {users.data.map((user) => (
              <Link
                className="w-[260px] p-8 flex flex-col items-center justify-center rounded-2xl border bg-gray-800"
                href={`/community/${user.id}`}
                key={user.id}
              >
                {user.imageUrl && (
                  <Image
                    src={user.imageUrl}
                    width={100}
                    height={100}
                    className="rounded-full"
                    alt="User image"
                  />
                )}

                <h2>
                  {user.firstName ?? "Unknown name"} {user.lastName}
                </h2>

                <span>@{user.username}</span>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return <div>Error</div>;
  }
}
