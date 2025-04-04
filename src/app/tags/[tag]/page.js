"use client";

import React from "react";
import { use } from "react";
import useTechnologies from "@/hooks/useTechnologies";
import Question from "@/app/question/page";

const TagPage = ({ params }) => {
  const { tag } = use(params);
  const technologies = useTechnologies(tag);
  console.log("tech", technologies);
  return (
    <div>
      <Question questions={technologies} />
    </div>
  );
};

export default TagPage;
