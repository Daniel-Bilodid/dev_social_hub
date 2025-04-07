import React from "react";

function SearchTags({ tags, setFilteredTags }) {
  function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    if (!query) {
      setFilteredTags(tags);
      return;
    }

    const filtered = tags.filter((item) => item.toLowerCase().includes(query));

    setFilteredTags(filtered);
  }

  return (
    <input
      type="text"
      placeholder="Search tags..."
      className="border p-2 rounded"
      onChange={(e) => handleSearch(e)}
    />
  );
}

export default SearchTags;
