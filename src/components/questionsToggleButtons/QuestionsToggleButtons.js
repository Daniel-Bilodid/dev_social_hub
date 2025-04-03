import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { getResponses } from "@/utils/getQuestions";

const QuestionsToggleButtons = ({
  usersFilteredQuestions,
  setUsersFilteredQuestions,
  setDisplayQuestions,
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
              sx={{
                backgroundColor:
                  activeButton === label
                    ? "var(--color-secondary)"
                    : "var(--color-third)",
                borderColor: "var(--color-secondary)",
                color: "var(--color-font)",
                "&:hover": {
                  backgroundColor:
                    activeButton === label
                      ? "var(--color-secondary-hover)"
                      : "var(--color-third-hover)",
                },
              }}
              key={label}
              onClick={() => toggleQuestion(label)}
              variant="contained"
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
