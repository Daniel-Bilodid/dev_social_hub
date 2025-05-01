import React from "react";

function SearchTags({ tags, setFilteredTags, setCustomTags }) {
  function handleSearch(e) {
    const query = e.target.value.toLowerCase();

    if (!query && setCustomTags) {
      setCustomTags([]);
      return;
    }

    if (!query && setFilteredTags) {
      setFilteredTags(tags);

      return;
    }

    const filtered = tags.filter((item) => item.toLowerCase().includes(query));

    if (setFilteredTags) setFilteredTags(filtered);
    if (setCustomTags) setCustomTags(filtered);
  }

  return (
    <input
      type="text"
      placeholder="Search tags..."
      className="border p-2 rounded w-full"
      onChange={(e) => handleSearch(e)}
    />
  );
}

export default SearchTags;
