"use client";

import React, { useState, useEffect } from "react";
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

export default function Home() {
  const { userId } = useAuth();
  const [interests, setInterests] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [alignment, setAlignment] = React.useState("Wathced tags");
  const [tagName, setTagName] = useState("");
  const { user } = useUser();
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
            <div className="flex items-center gap-5">
              <Box
                component="form"
                sx={{ flexGrow: 1 }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="Find a tag by name"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setTagName(e.target.value)}
                  value={tagName}
                />
              </Box>
              <Stack spacing={2} direction="row">
                <Button className="w-[46px] h-[46px]" variant="contained">
                  Add
                </Button>
              </Stack>
            </div>
          </div>
          <div className="absolute bottom-[-30px]">{tagName}</div>
        </Modal>
        <Question questions={questions} user={user} />
      </div>
    </div>
  );
}
