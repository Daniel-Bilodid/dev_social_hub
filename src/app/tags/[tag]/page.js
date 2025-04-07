"use client";

import React, { useEffect, useState } from "react";
import { use } from "react";
import useTechnologies from "@/hooks/useTechnologies";
import Question from "@/app/question/page";
import SearchInput from "@/components/searchInput/SearchInput";

const TagPage = ({ params }) => {
  const { tag } = use(params);
  const technologies = useTechnologies(tag);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  console.log("tech", technologies);

  useEffect(() => {
    setFilteredQuestions(technologies);
  }, [technologies]);
  console.log("filtered", filteredQuestions);

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
