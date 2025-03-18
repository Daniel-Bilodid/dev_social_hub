"use client";

import { React, useEffect, useState } from "react";
import { getQuestions } from "@/utils/getQuestions";
import Image from "next/image";

const QuestionPage = ({ params }) => {
  const [usersQuestions, setUsersQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const questions = await getQuestions();

      setUsersQuestions(
        questions.find((item) => item.id === params.questionPage) || {}
      );
    };
    fetchQuestions();
  }, []);

  return (
    <div>
      <div>
        <div className="flex">
          <div>
            {usersQuestions.imageUrl ? (
              <Image
                src={usersQuestions.imageUrl}
                width={40}
                height={40}
                className="rounded-full"
                alt="user image"
              />
            ) : null}
          </div>
          <div>
            <div>{usersQuestions?.username}</div>
            <div>
              {" "}
              {usersQuestions.createdAt
                ? usersQuestions.createdAt.toDate().toLocaleString()
                : "No Date"}
            </div>
          </div>
        </div>

        <div>{usersQuestions?.question}</div>

        <div>{usersQuestions?.text}</div>
      </div>
    </div>
  );
};

export default QuestionPage;
