"use server";

import React from "react";
import { clerkClient } from "@clerk/nextjs/server";

import UsersList from "@/components/usersList/UsersList";

export default async function CommunityPage() {
  try {
    const clerk = await clerkClient();

    const users = await clerk.users.getUserList();
    const plainUsers = JSON.parse(JSON.stringify(users));
    console.log(users.data);

    return (
      <div>
        <h1>All users</h1>

        <div className="flex flex-wrap mt-12 justify-center">
          <UsersList users={plainUsers} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return <div>Error</div>;
  }
}
