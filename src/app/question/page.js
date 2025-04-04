"use client";

import React, { useState, useEffect } from "react";

import { getResponses } from "@/utils/getQuestions";
import QuestionComponent from "@/components/questionComponent/QuestionComponent";

const Question = ({ questions, user }) => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    async function fetchResponses() {
      const fetchedResponses = await Promise.all(
        questions.map((q) => getResponses(q.id))
      );
      setResponses(fetchedResponses);
    }

    fetchResponses();
  }, [questions]);

  if (!Array.isArray(questions)) {
    return <div>No questions found</div>;
  }

  return (
    <>
      <QuestionComponent questions={questions} responses={responses} />
    </>
  );
};

export default Question;
