"use client";

import { React, useEffect, useState } from "react";
import Question from "../question/page";
import AskQuestionPopup from "../questionPopup/page";
import { getFirestore, collection, addDoc, doc } from "firebase/firestore";
import { useAuth } from "@clerk/nextjs";
import { getQuestions } from "@/utils/getQuestions";
import { useUser } from "@clerk/clerk-react";
import SearchInput from "@/components/searchInput/SearchInput";
import QuestionsToggleButtons from "@/components/questionsToggleButtons/QuestionsToggleButtons";

const Questions = () => {
  const db = getFirestore();
  const { userId } = useAuth();
  const [popupToggle, setPopupToggle] = useState(false);
  const [usersQuestions, setUsersQuestions] = useState([]);
  const [usersFilteredQuestions, setUsersFilteredQuestions] = useState([]);
  const [displayQuestions, setDisplayQuestions] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    if (userId) {
      const questions = await getQuestions(userId);

      setUsersQuestions(questions || []);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, [userId]);

  useEffect(() => {
    setUsersFilteredQuestions(usersQuestions);
  }, [usersQuestions]);

  useEffect(() => {
    setDisplayQuestions(usersFilteredQuestions);
  }, [usersFilteredQuestions]);

  const addQuestion = async (newQuestion) => {
    if (!userId) {
      console.log("User is not signed in.");
      return;
    }

    try {
      const postsRef = collection(db, "posts");

      await addDoc(postsRef, {
        ...newQuestion,
        userId: userId,
        username: user.username,
        imageUrl: user.imageUrl,
        createdAt: new Date(),
      });
      console.log("Question added successfully");
      fetchQuestions();
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <div className="flex justify-between w-full">
      <div className="w-full pl-[4.5em] pr-[4.5em] pt-[1.5em]">
        <div className="flex justify-between flex-col">
          <div className="flex justify-between">
            <h2 className="text-[20px]">All Questions</h2>

            <button
              onClick={() => setPopupToggle(true)}
              className="bg-third text-font px-6 py-2 rounded-md text-lg font-medium hover:bg-secondary transition-all cursor-pointer "
            >
              Ask a Question
            </button>
          </div>
          <SearchInput
            usersQuestions={usersQuestions}
            usersFilteredQuestions={usersFilteredQuestions}
            setUsersFilteredQuestions={setUsersFilteredQuestions}
          />

          <QuestionsToggleButtons
            usersFilteredQuestions={usersFilteredQuestions}
            setUsersFilteredQuestions={setUsersFilteredQuestions}
            setDisplayQuestions={setDisplayQuestions}
          />
        </div>

        <Question questions={displayQuestions} user={user} />

        {popupToggle ? (
          <AskQuestionPopup
            setPopupToggle={setPopupToggle}
            addQuestion={addQuestion}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Questions;
