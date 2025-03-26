import React from "react";

import { FaRegCalendarAlt } from "react-icons/fa";
import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import UserQuestions from "@/components/userQuestions/userQuestions";

export default async function UserPage({ params }) {
  try {
    const clerk = await clerkClient();

    const user = await clerk.users.getUser(params.user);

    const date = new Date(user.createdAt);
    console.log(date);
    return (
      <div>
        <div className="flex">
          {user.imageUrl && (
            <Image
              src={user.imageUrl}
              width={100}
              height={100}
              className="rounded-full"
              alt="User image"
            />
          )}

          <div className="flex flex-col">
            <div className="flex gap-1">
              <span>{user.firstName}</span>
              <span> {user.lastName}</span>
            </div>
            <span>@{user.username}</span>
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
          <UserQuestions userId={params.slug} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return <div>Error</div>;
  }
}
