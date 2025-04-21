"use client";

import React, { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";
import Link from "next/link";
import useTechnologies from "@/hooks/useTechnologies";
import { getInterests } from "@/utils/actions";
import { useAuth } from "@clerk/nextjs";
import Question from "./question/page";
import Modal from "@/components/modal/Modal";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { getTags } from "@/utils/getTags";
import SearchTags from "@/components/SearchTags/SearchTags";
import AddToInterests from "@/utils/addInterests";

export default function Home() {
  const { userId } = useAuth();
  const [interests, setInterests] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [alignment, setAlignment] = React.useState("Wathced tags");
  const [tagName, setTagName] = useState("");
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
            onClick={() => setModalOpen(true)}
            className="border-0 bg-none underline text-blue-500 cursor-pointer"
          >
            Customize your feed
          </button>
        </p>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton
              onClick={() => console.log("watched")}
              value="Watched tags"
            >
              Watched tags
            </ToggleButton>
            <ToggleButton value="Ignored tags">Ignored tags</ToggleButton>
          </ToggleButtonGroup>
          <div>123</div>
          <div className="max-w-[536px] w-full ">
            <div className="flex items-center gap-5 ">
              <Box
                component="form"
                sx={{ flexGrow: 1 }}
                noValidate
                autoComplete="off"
              >
                <SearchTags tags={tags} setFilteredTags={setFilteredTags} />
              </Box>
              <Stack spacing={2} direction="row">
                <Button className="w-[46px] h-[46px]" variant="contained">
                  Add
                </Button>
              </Stack>
            </div>
          </div>
          <ul className="max-w-[452px] absolute mt-[40px] max-h-40 w-full m overflow-y-auto bg-[#243642] rounded shadow-md z-50">
            {filteredTags.map((tag) => (
              <li
                key={tag}
                onClick={() => console.log(tag)}
                className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
              >
                {tag}
              </li>
            ))}
          </ul>
        </Modal>
        <Question questions={questions} user={user} />
      </div>
    </div>
  );
}
