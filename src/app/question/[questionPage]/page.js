"use client";

import { React, useEffect, useState } from "react";
import { getQuestions } from "@/utils/getQuestions";
import { formatDistance } from "date-fns";
import { useParams } from "next/navigation";
import Image from "next/image";
import QuestionEditor from "@/components/questionEditor/QuestionEditor";
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

        <h2 className="text-[24px]">{usersQuestions?.question}</h2>

        <div>{usersQuestions?.text}</div>

        {console.log(usersQuestions)}
        <ul className="flex gap-[10px]">
          {usersQuestions?.technology?.length > 0 ? (
            usersQuestions.technology.map((item) => (
              <li className="bg-gray-800 p-2 rounded-[10px]" key={item.value}>
                {item.value}
              </li>
            ))
          ) : (
            <p>No data available</p>
          )}
        </ul>
      </div>
      <QuestionEditor postId={questionPage} />
    </div>
  );
};

export default QuestionPage;
