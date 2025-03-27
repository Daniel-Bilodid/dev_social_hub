import React from "react";

import { FaRegCalendarAlt } from "react-icons/fa";
import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import UserQuestions from "@/components/userQuestions/userQuestions";

export default async function UserPage({ params }) {
  try {
    const clerk = await clerkClient();
    const { user } = await params;
    const userInfo = await clerk.users.getUser(user);

    const date = new Date(userInfo.createdAt);

    return (
      <div>
        <div className="flex">
          {userInfo.imageUrl && (
            <Image
              src={userInfo.imageUrl}
              width={100}
              height={100}
              className="rounded-full"
              alt="User image"
            />
          )}

          <div className="flex flex-col">
            <div className="flex gap-1">
              <span>{userInfo.firstName}</span>
              <span> {userInfo.lastName}</span>
            </div>
            <span>@{userInfo.username}</span>
            <div className="flex gap-1">
              {" "}
              <FaRegCalendarAlt />
              {date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
        </div>

        <div>Top Questions</div>
        <div>
          <UserQuestions userId={user} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return <div>Error</div>;
  }
}
