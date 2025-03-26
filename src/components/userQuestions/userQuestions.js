"use client";

import React, { useState, useEffect } from "react";
import { getQuestions } from "@/utils/getQuestions";

const UserQuestions = ({ userId }) => {
  const [userQuestions, setUsersQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const fetchQuestions = async () => {
    const questions = await getQuestions();

    setUsersQuestions(questions || []);

    console.log("user questions", userQuestions);
    const filtered = questions.filter((item) => item.userId === userId);
    console.log("Filtered questions:", filtered);
    setFilteredQuestions(filtered);
  };
  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    console.log("filteredQuestions updated:", filteredQuestions);

    console.log("userQuestions updated:", userQuestions);
    console.log("userId", userId);
  }, [filteredQuestions, userQuestions, userId]);

  return <div>UserQuestions</div>;
};

export default UserQuestions;
