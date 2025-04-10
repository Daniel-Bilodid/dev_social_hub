import React, { useState, useEffect } from "react";
import { getQuestions } from "@/utils/getQuestions";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { getTags } from "@/utils/getTags";
import useTagCounts from "@/hooks/useTagCounts";

const NavMenu = () => {
  const [questions, setQuestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [sortedTags, setSortedTags] = useState([]);

  const tagCounts = useTagCounts(tags);
  useEffect(() => {
    const fetchQuestionsAndTags = async () => {
      const question = await getQuestions();
      const tagsData = await getTags();

      setQuestions(question);

      const tagValues = tagsData.map((tag) => tag.value);

      setTags(tagValues);
    };
    fetchQuestionsAndTags();
  }, []);

  useEffect(() => {
    if (!tagCounts || Object.keys(tagCounts).length === 0) return;

    const sorted = tags
      .filter((tag) => tagCounts[tag] !== null)
      .sort((a, b) => tagCounts[b] - tagCounts[a]);

    console.log("tagCounts", tagCounts);
    console.log("sortedTags", sortedTags);
    setSortedTags(sorted);
  }, [tagCounts, tags]);
  return (
    <div className="w-[350px] p-[24px] ">
      <div>
        <h2 className="text-[20px] font-sans font-bold">Top Questions</h2>

        <div>
          <ul>
            {questions.slice(0, 5).map((question, index) => (
              <Link
                href={`/question/${question.id}`}
                key={index}
                className="flex justify-between items-center mt-[20px] cursor-pointer"
              >
                <p className="text-[14px]">
                  {" "}
                  {question.question.length > 70
                    ? question.question.slice(0, 70) + "..."
                    : question.question}{" "}
                </p>
                <span>
                  <MdOutlineKeyboardArrowRight />
                </span>
              </Link>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-[50px]">
        <h2 className="text-[20px] font-sans font-bold">Popular tags</h2>

        <div>
          <ul>
            {sortedTags.slice(0, 5).map((tag, index) => (
              <Link
                href={`/tags/${tag}`}
                key={index}
                className="flex justify-between items-center mt-[20px] cursor-pointer"
              >
                <h3 className="inline-flex items-center border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary hover:bg-primary/80 subtle-medium background-light800_dark300 text-dark400_light500 rounded-md border-none px-4 py-2 uppercase">
                  {tag}
                </h3>
                <p className="text-sm text-gray-300">
                  {tagCounts[tag]
                    ? `${tagCounts[tag]}`
                    : "There is no questions..."}
                </p>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
