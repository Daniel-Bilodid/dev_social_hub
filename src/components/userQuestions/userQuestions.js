"use client";

import React, { useState, useEffect } from "react";
import { getQuestions } from "@/utils/getQuestions";
import QuestionComponent from "../questionComponent/QuestionComponent";
import { getResponses } from "@/utils/getQuestions";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const UserQuestions = ({ userId }) => {
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [filteredResponses, setFilteredResponses] = useState([]);
  const [responses, setResponses] = useState([]);
  const [alignment, setAlignment] = React.useState("topQuestions");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  useEffect(() => {
    async function fetchResponses() {
      const fetchedResponses = await Promise.all(
        filteredQuestions.map((q) => getResponses(q.id))
      );
      setResponses(fetchedResponses);
    }

    fetchResponses();
  }, [filteredQuestions]);

  const fetchQuestions = async () => {
    const questions = await getQuestions();

    const filtered = (questions || []).filter((item) => item.userId === userId);
    setFilteredQuestions(filtered);

    const filteredResponse = (responses || []).filter(
      (item) => item.userId === userId
    );
    setFilteredResponses(filteredResponse);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);
  console.log(responses);
  console.log(filteredResponses);
  return (
    <div>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="topQuestions">Top Questions</ToggleButton>
        <ToggleButton value="answers">Answers</ToggleButton>
      </ToggleButtonGroup>

      {alignment === "topQuestions" ? (
        <QuestionComponent
          questions={filteredQuestions}
          responses={responses}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default UserQuestions;
