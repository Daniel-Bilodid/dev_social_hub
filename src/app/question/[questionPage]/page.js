"use client";

import { React, useEffect, useState } from "react";
import { getQuestions } from "@/utils/getQuestions";
import { formatDistance } from "date-fns";
import { useParams } from "next/navigation";
import Image from "next/image";

const QuestionPage = () => {
  const [usersQuestions, setUsersQuestions] = useState([]);
  const { questionPage } = useParams();
  useEffect(() => {
    const fetchQuestions = async () => {
      const questions = await getQuestions();

      setUsersQuestions(
        questions.find((item) => item.id === questionPage) || {}
      );
    };
    fetchQuestions();
  }, []);

  return (
    <div>
      <div className="mx-auto w-full max-w-5xl">
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
              {usersQuestions.createdAt
                ? formatDistance(
                    usersQuestions.createdAt.toDate(),
                    new Date(),
                    { addSuffix: true }
                  )
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
