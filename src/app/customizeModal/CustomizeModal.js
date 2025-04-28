import React, { useState, useEffect, use } from "react";
import Modal from "@/components/modal/Modal";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SearchTags from "@/components/SearchTags/SearchTags";
import AddToInterests from "@/utils/addInterests";
import { useUser } from "@clerk/clerk-react";
import { deleteInterests, getInterests } from "@/utils/actions";
import { useAuth } from "@clerk/nextjs";

export default function CustomizeModal({
  isModalOpen,
  setIsModalOpen,
  alignment,
  handleChange,
  tags,
  filteredTags,
  setFilteredTags,
}) {
  const [customTag, setCustomTag] = useState("");
  const [watched, setWatched] = useState([]);
  const [ignored, setIgnored] = useState([]);
  const [type, setType] = useState("watched");
  const { user } = useUser();
  const { userId } = useAuth();

  useEffect(() => {
    if (customTag && type === "watched") {
      AddToInterests(customTag, user?.id, "watched");
    } else {
      AddToInterests(customTag, user?.id, "ignored");
    }
  }, [customTag]);

  const fetchedWatched = async () => {
    try {
      const watchedData = await getInterests(userId, "watched");
      console.log("Fetched watched Data:", watchedData);
      const sortedWatched = watchedData.map((watched) => watched.technology);
      setWatched(sortedWatched);
    } catch (error) {
      console.error("Error fetching watched:", error);
    }
  };

  const fetchedIgnored = async () => {
    try {
      const ignoredData = await getInterests(userId, "ignored");
      console.log("Fetched ignored Data:", ignoredData);
      const sortedIgnored = ignoredData.map((ignored) => ignored.technology);
      setIgnored(sortedIgnored);
    } catch (error) {
      console.error("Error fetching ignored:", error);
    }
  };
  const onDeleteInterest = async (tech) => {
    deleteInterests(userId, type, tech);
  };

  useEffect(() => {
    if (userId) {
      fetchedWatched();
      fetchedIgnored();
    }
  }, [userId]);

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton
            onClick={() => console.log(setType("watched"))}
            value="Watched tags"
          >
            Watched tags
          </ToggleButton>
          <ToggleButton
            value="Ignored tags"
            onClick={() => console.log(setType("ignored"))}
          >
            Ignored tags
          </ToggleButton>
        </ToggleButtonGroup>

        <div className="max-w-[536px] w-full ">
          <ul className="flex flex-wrap gap-2 max-w-[300px] w-full ">
            {type === "watched"
              ? watched.map((item, index) => (
                  <li
                    className="p-2 m-2 ml-0 mr-0 bg-[#0e1b2b] rounded-[10px] flex gap-2"
                    key={index}
                  >
                    {item}
                    <div onClick={() => onDeleteInterest(item)}>X</div>
                  </li>
                ))
              : ignored.map((item, index) => (
                  <li
                    className="p-2 m-2 ml-0 mr-0 bg-[#0e1b2b] rounded-[10px]"
                    key={index}
                  >
                    {item}
                  </li>
                ))}
          </ul>
          <div className="flex items-center gap-5 ">
            <Box
              component="form"
              sx={{ flexGrow: 1 }}
              noValidate
              autoComplete="off"
            >
              <SearchTags tags={tags} setFilteredTags={setFilteredTags} />
            </Box>
            <Stack spacing={2} direction="row">
              <Button className="w-[46px] h-[46px]" variant="contained">
                Add
              </Button>
            </Stack>
          </div>
        </div>
        <ul className="max-w-[452px] absolute mt-[40px] max-h-40 w-full m overflow-y-auto bg-[#243642] rounded shadow-md z-50">
          {filteredTags.map((tag) => (
            <li
              key={tag}
              onClick={() => setCustomTag(tag)}
              className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
            >
              {tag}
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
}
