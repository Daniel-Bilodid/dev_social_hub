"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CommunityHandlers from "../communityHandlers/CommunityHandlers";
const UsersList = ({ users }) => {
  const [usersList, setUsersList] = useState(users.data);
  const [usersFilteredList, setUsersFilteredList] = useState(users.data);

  useEffect(() => {
    console.log("filtered", usersFilteredList);
  }, [usersList, usersFilteredList]);
  return (
    <div>
      <CommunityHandlers
        usersList={usersList}
        usersFilteredList={usersFilteredList}
        setUsersFilteredList={setUsersFilteredList}
      />
      <ul className="flex gap-4">
        {usersFilteredList.map((user) => (
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
  );
};

export default UsersList;
