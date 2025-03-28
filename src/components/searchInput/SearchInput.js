import React from "react";

const SearchInput = ({
  usersQuestions,
  usersFilteredQuestions,
  setUsersFilteredQuestions,
}) => {
  function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    if (!query) {
      setUsersFilteredQuestions(usersQuestions);
      return;
    }

    const filtered = usersQuestions.filter((item) =>
      item.question?.toLowerCase().includes(query)
    );

    setUsersFilteredQuestions(filtered);
  }

  return (
    <input
      type="text"
      placeholder="Search questions..."
      className="border p-2 rounded"
      onChange={(e) => handleSearch(e)}
    />
  );
};

export default SearchInput;
