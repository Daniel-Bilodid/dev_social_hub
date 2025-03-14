"use client";

import { React, useState } from "react";
import Question from "../question/page";
import AskQuestionPopup from "../questionPopup/page";
import { getFirestore, collection, addDoc, doc } from "firebase/firestore";
import { useAuth } from "@clerk/nextjs";

const Questions = () => {
  const db = getFirestore();
  const { userId } = useAuth();
  const [popupToggle, setPopupToggle] = useState(false);
  const [questions, setQuestions] = useState([]);

  const addQuestion = async (newQuestion) => {
    if (!userId) {
      console.log("User is not signed in.");
      return;
    }
    console.log("im here");
    try {
      const userRef = doc(db, "users", userId);
      const questionsRef = collection(userRef, "posts");
      console.log("ref", questionsRef);
      await addDoc(questionsRef, {
        ...newQuestion,
        userId: userId,
        createdAt: new Date(),
      });
      console.log("Question added successfully");
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  return (
    <div className="flex justify-between w-full">
      <div className="w-full">
        <div className="flex justify-between">
          <h2 className="text-[20px]">All Questions</h2>
          <button
            onClick={() => setPopupToggle(true)}
            className="bg-gray-600 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-indigo-500 transition-all cursor-pointer"
          >
            Ask a Question
          </button>
        </div>
        <Question questions={questions} />

        {popupToggle ? (
          <AskQuestionPopup
            setPopupToggle={setPopupToggle}
            addQuestion={addQuestion}
          />
        ) : (
          ""
        )}
      </div>
      <div className="w-[350px]">Menu</div>
    </div>
  );
};

export default Questions;
