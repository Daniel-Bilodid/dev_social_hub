"use client";

import React, { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import Link from "next/link";
import useTechnologies from "@/hooks/useTechnologies";
import { getInterests } from "@/utils/actions";
import { useAuth } from "@clerk/nextjs";
import Question from "./question/page";

import { getTags } from "@/utils/getTags";

import AddToInterests from "@/utils/addInterests";
import CustomizeModal from "./customizeModal/CustomizeModal";

export default function Home() {
  const { userId } = useAuth();
  const [interests, setInterests] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [ignored, setIgnored] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alignment, setAlignment] = React.useState("Wathced tags");

  const { user } = useUser();
  const addWatchedHasRun = useRef(false);

  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  useEffect(() => {
    const fetchTags = async () => {
      const fetchedTags = await getTags();

      const tagValues = fetchedTags.map((tag) => tag.value);

      setTags(tagValues);

      console.log("tags", fetchedTags);
    };
    fetchTags();
  }, []);

  const [filteredTags, setFilteredTags] = useState([]);
  useEffect(() => {
    if (addWatchedHasRun.current) return;
    AddToInterests(selectedTag, user?.id, "watched");
    addWatchedHasRun.current = true;
  }, [selectedTag, user?.id]);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const interestsData = await getInterests(userId, "interests");
        const sortedInterests = interestsData.map((i) => i.technology);
        const uniqueInterests = [...new Set([...sortedInterests, ...watched])];
        setInterests(uniqueInterests.filter((item) => !ignored.includes(item)));
      } catch (err) {
        console.error(err);
      }
    };

    fetchInterests();
  }, [userId, watched, ignored]);

  console.log("interest", interests);

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
  console.log("types", watched);

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
            onClick={() => setIsModalOpen(true)}
            className="border-0 bg-none underline text-blue-500 cursor-pointer"
          >
            Customize your feed
          </button>
        </p>
        <CustomizeModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          alignment={alignment}
          handleChange={handleChange}
          tags={tags}
          filteredTags={filteredTags}
          setFilteredTags={setFilteredTags}
          ignored={ignored}
          setIgnored={setIgnored}
          watched={watched}
          setWatched={setWatched}
        />
        <Question questions={questions} user={user} />
      </div>
    </div>
  );
}
