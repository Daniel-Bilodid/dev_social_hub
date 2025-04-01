"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const CommunityHandlers = ({
  usersList,
  usersFilteredList,
  setUsersFilteredList,
}) => {
  const [filtered, setFiltered] = useState("");

  const handleChange = (event) => {
    setFiltered(event.target.value);

    const sortedUsers = [...usersFilteredList].sort((a, b) =>
      event.target.value === "old-user"
        ? a.createdAt - b.createdAt
        : b.createdAt - a.createdAt
    );

    setUsersFilteredList(sortedUsers);

    console.log("users", usersList);
  };

  function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    if (!query) {
      setUsersFilteredList(usersList);
      return;
    }

    const filtered = usersList.filter(
      (user) =>
        (user.firstName || "").toLowerCase().includes(query) ||
        (user.lastName || "").toLowerCase().includes(query)
    );

    console.log("filter", filtered);
    setUsersFilteredList(filtered);
  }
  return (
    <div>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
        noValidate
        autoComplete="off"
        className="flex"
      >
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={(e) => handleSearch(e)}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select a Filter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filtered}
            label="Filter"
            onChange={handleChange}
          >
            <MenuItem value={"new-user"}>New Users</MenuItem>
            <MenuItem value={"old-user"}>Old Users</MenuItem>
            <MenuItem value={"top-contributor"}>Top Contributors</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default CommunityHandlers;
