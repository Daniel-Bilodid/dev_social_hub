import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { getResponses } from "@/utils/getQuestions";

const QuestionsToggleButtons = ({
  usersFilteredQuestions,
  setUsersFilteredQuestions,
  usersQuestions,
}) => {
  const [activeButton, setActiveButton] = useState("Newest");
  const [responses, setResponses] = useState([]);

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

      const filteredQuestions = usersQuestions.filter((question) => {
        const contains = responseIds.includes(question.id);

        return !contains;
      });

      setUsersFilteredQuestions(filteredQuestions);
      return;
    }
    setUsersFilteredQuestions(usersQuestions);
    const sortedUsers = [...usersQuestions].sort((a, b) =>
      label === "Newest" ? a.createdAt - b.createdAt : b.createdAt - a.createdAt
    );

    setUsersFilteredQuestions(sortedUsers);
  }
  useEffect(() => {
    toggleQuestion(activeButton);
    console.log("test"); //////////////
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          gap: "10px",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          {["Newest", "Oldest", "Unanswered"].map((label) => (
            <Button
              key={label}
              onClick={() => toggleQuestion(label)}
              variant={activeButton === label ? "contained" : "outlined"}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </div>
  );
};

export default QuestionsToggleButtons;
