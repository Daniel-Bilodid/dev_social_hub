import React, { useState, useEffect } from "react";

import { getResponses } from "@/utils/getQuestions";
import ButtonsToggleGroup from "../buttonsToggleGroup/ButtonsToggleGroup";

const QuestionsToggleButtons = ({
  usersFilteredQuestions,
  setUsersFilteredQuestions,
  setDisplayQuestions,
}) => {
  const [activeButton, setActiveButton] = useState("Newest");
  const [responses, setResponses] = useState([]);
  const [filters, setFilters] = useState(["Newest", "Oldest", "Unanswered"]);

  useEffect(() => {
    async function fetchResponses() {
      const fetchedResponses = await Promise.all(
        usersFilteredQuestions.map((q) => getResponses(q.id))
      );
      const nonEmptyResponses = fetchedResponses.filter(
        (response) => response.length > 0
      );
      setResponses(nonEmptyResponses);
    }

    fetchResponses();
  }, [usersFilteredQuestions]);

  function toggleQuestion(label) {
    setActiveButton(label);

    if (label === "Unanswered") {
      const responseIds = responses.flat().map((response) => response.postId);

      const filteredQuestions = usersFilteredQuestions.filter((question) => {
        const contains = responseIds.includes(question.id);

        return !contains;
      });

      setDisplayQuestions(filteredQuestions);
    } else {
      const sortedUsers = [...usersFilteredQuestions].sort((a, b) =>
        label === "Newest"
          ? b.createdAt - a.createdAt
          : a.createdAt - b.createdAt
      );

      setDisplayQuestions(sortedUsers);
    }
  }
  useEffect(() => {
    toggleQuestion(activeButton);
  }, []);

  return (
    <ButtonsToggleGroup
      filters={filters}
      toggleQuestion={toggleQuestion}
      activeButton={activeButton}
    />
  );
};

export default QuestionsToggleButtons;
