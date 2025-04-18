"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import Link from "next/link";
import useTechnologies from "@/hooks/useTechnologies";
import { getInterests } from "@/utils/actions";
import { useAuth } from "@clerk/nextjs";
import Question from "./question/page";

export default function Home() {
  const { userId } = useAuth();
  const [interests, setInterests] = useState([]);
  const [questions, setQuestions] = useState([]);
  const { user } = useUser();
  const fetchInterests = async () => {
    try {
      const interestsData = await getInterests(userId);
      console.log("Fetched interests:", interestsData);
      const sortedInterests = interestsData.map(
        (interest) => interest.technology
      );
      setInterests(sortedInterests);
    } catch (error) {
      console.error("Error fetching interests:", error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchInterests();
    }
  }, [userId]);
  console.log("interests before", interests);
  const technologies = useTechnologies(interests);

  useEffect(() => {
    if (technologies.length > 0) {
      const sorted = technologies;
      const filtered = [];

      for (let i = 0; i < sorted.length; i++) {
        if (!filtered.some((question) => question.id === sorted[i].id)) {
          filtered.push(sorted[i]);
          console.log("Pushed", sorted[i]);
        } else {
          console.log("Already exists", sorted[i]);
        }
      }

      setQuestions(filtered);
    }
  }, [technologies]);

  console.log("questions", questions);
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
        <h2 className="text-xl font-bold">Interesting posts for you</h2>
        <p className="text-[13px] text-gray-300">
          Based on your viewing history and watched tags.{" "}
          <button
            onClick={() => console.log("hello")}
            className="border-0 bg-none underline text-blue-500 cursor-pointer"
          >
            Customize your feed
          </button>
        </p>

        <Question questions={questions} user={user} />
      </div>
    </div>
  );
}
