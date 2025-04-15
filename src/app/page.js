"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import Link from "next/link";
import useTechnologies from "@/hooks/useTechnologies";
import { getInterests } from "@/utils/actions";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  const { userId } = useAuth();
  const [interests, setInterests] = useState([]);
  const { user } = useUser();
  const fetchInterests = async () => {
    try {
      const interestsData = await getInterests(userId);
      console.log("Fetched interests:", interestsData);
      setInterests(interestsData);
    } catch (error) {
      console.error("Error fetching interests:", error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchInterests();
    }
  }, [userId]);

  const technologies = useTechnologies(
    interests.some((interest) => interest.technology)
  );
  console.log("technologies", technologies);
  console.log("interests", interests);
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-[32px] font-bold">
            <span className="text-[48px]">👋</span>Welcome to the DevHub,{" "}
            {user?.firstName ? user.firstName : user?.fullName}!
          </h1>
          <p>
            Find answers to your technical questions and help others answer
            theirs.
          </p>
        </div>
        <Link href="/questions">Ask Question</Link>
      </div>

      <div>
        <h2>Interesting posts for you</h2>
        <p>
          Based on your viewing history and watched tags.{" "}
          <span>Customize your feed</span>
        </p>
      </div>
    </div>
  );
}
