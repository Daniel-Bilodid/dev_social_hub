"use client";

import React, { useEffect, useState, useRef } from "react";
import { use } from "react";
import useTechnologies from "@/hooks/useTechnologies";
import Question from "@/app/question/page";
import SearchInput from "@/components/searchInput/SearchInput";
import AddToInterests from "@/utils/addInterests";

import { useUser } from "@clerk/clerk-react";

const TagPage = ({ params }) => {
  const { tag } = use(params);
  const technologies = useTechnologies(tag);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  console.log("tech", technologies);
  const { user } = useUser();
  const addInterestHasRun = useRef(false);

  useEffect(() => {
    setFilteredQuestions(technologies);
  }, [technologies]);
  console.log("filtered", filteredQuestions);

  useEffect(() => {
    if (addInterestHasRun.current) return;
    AddToInterests(tag, user?.id);
    addInterestHasRun.current = true;
  }, [tag, user?.id]);

  return (
    <div>
      <SearchInput
        usersQuestions={technologies}
        setUsersFilteredQuestions={setFilteredQuestions}
      />
      <Question questions={filteredQuestions} />
    </div>
  );
};

export default TagPage;
