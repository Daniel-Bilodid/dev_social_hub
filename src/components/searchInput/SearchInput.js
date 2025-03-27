"use client";

import React, { useState } from "react";

const SearchInput = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  function handleInput(e) {
    setSearch(e.target.value);
    onSearch(e.target.value);
  }

  return (
    <input
      type="text"
      placeholder="Search for user"
      className="w-full px-10 py-2 rounded-md border border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-400"
      onChange={handleInput}
      value={search}
    />
  );
};

export default SearchInput;
