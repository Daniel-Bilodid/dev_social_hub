import React, { useState, useEffect } from "react";
import { getQuestions } from "@/utils/getQuestions";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const NavMenu = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const question = await getQuestions();

      setQuestions(question);
    };
    fetchQuestions();
  }, []);

  return (
    <div className="w-[350px] p-[24px] ">
      <h2>Top Questions</h2>

      <div>
        <ul>
          {questions.map((question, index) => (
            <Link
              href={`/question/${question.id}`}
              key={index}
              className="flex mt-[20px] cursor-pointer"
            >
              {question.question}{" "}
              <span>
                <FaArrowRight />
              </span>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavMenu;
