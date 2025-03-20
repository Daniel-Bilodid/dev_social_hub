"use client";

import { React, useEffect, useState } from "react";
import { getQuestions, getResponses } from "@/utils/getQuestions";
import { formatDistance } from "date-fns";
import { useParams } from "next/navigation";
import Image from "next/image";
import QuestionEditor from "@/components/questionEditor/QuestionEditor";
const QuestionPage = () => {
  const [usersQuestions, setUsersQuestions] = useState([]);
  const [usersResponses, setUsersResponses] = useState([]);
  const { questionPage } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      const questions = await getQuestions();

      setUsersQuestions(
        questions.find((item) => item.id === questionPage) || {}
      );
    };
    fetchQuestions();
  }, [questionPage]);

  useEffect(() => {
    const fetchResponses = async () => {
      const responses = await getResponses(questionPage);
      console.log("responses1", responses);

      setUsersResponses(responses);
    };
    fetchResponses();
  }, [questionPage]);

  console.log("responses", usersResponses);
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

        <div>
          {usersResponses.map((response) => (
            <div key={response.userId}>
              <div>
                <div className="flex">
                  <div>
                    {response.imageUrl ? (
                      <Image
                        src={response.imageUrl}
                        width={40}
                        height={40}
                        className="rounded-full"
                        alt="user image"
                      />
                    ) : null}
                  </div>
                  <div>
                    <div>{response?.username}</div>
                    <div>
                      {response.createdAt
                        ? formatDistance(
                            response.createdAt.toDate(),
                            new Date(),
                            { addSuffix: true }
                          )
                        : "No Date"}
                    </div>
                  </div>
                </div>
                <div>{response.content[0].segments[0].text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <QuestionEditor postId={questionPage} />
    </div>
  );
};

export default QuestionPage;
