"use client";

import React, { useState } from "react";
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
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  function handleSearch(e) {
    console.log(e.target.value);
    console.log("list", usersList);
    const query = e.target.value.toLowerCase();
    if (!query) {
      setUsersFilteredList(usersList);
      return;
    }

    const filtered = usersList.filter((user) =>
      (user.firstName || "").toLowerCase().includes(query)
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
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default CommunityHandlers;
