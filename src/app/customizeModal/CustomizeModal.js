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
import isEqual from "lodash.isequal";

export default function CustomizeModal({
  isModalOpen,
  setIsModalOpen,
  alignment,
  handleChange,
  tags,
  customTags,
  setCustomTags,
  ignored,
  setIgnored,
  watched,
  setWatched,
}) {
  const [customTag, setCustomTag] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [type, setType] = useState("watched");
  const { user } = useUser();
  const { userId } = useAuth();

  const fetchWatched = async () => {
    const watchedData = await getInterests(userId, "watched");
    const sorted = watchedData.map((item) => item.technology);
    setWatched(sorted);
  };

  const fetchIgnored = async () => {
    const ignoredData = await getInterests(userId, "ignored");
    const sorted = ignoredData.map((item) => item.technology);
    setIgnored(sorted);
  };

  useEffect(() => {
    if (!userId) return;
    fetchWatched();
    fetchIgnored();
  }, [userId]);

  useEffect(() => {
    if (!isModalOpen) {
      setCustomTags([]);
    }
  }, [isModalOpen]);

  useEffect(() => {
    const update = async () => {
      if (!customTag) return;

      if (type === "watched") {
        await AddToInterests(customTag, user?.id, "watched");
        if (ignored.includes(customTag)) {
          await onDeleteInterest("ignored", customTag);
        }
        await fetchWatched();
      } else {
        await AddToInterests(customTag, user?.id, "ignored");
        if (watched.includes(customTag)) {
          await onDeleteInterest("watched", customTag);
        }
        await fetchIgnored();
      }
    };
    update();
  }, [customTag]);

  const onDeleteInterest = async (interestType, tech) => {
    await deleteInterests(userId, interestType, tech);
    if (interestType === "watched") {
      await fetchWatched();
    } else {
      await fetchIgnored();
    }
  };

  const list = type === "watched" ? watched : ignored;

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
          <ToggleButton onClick={() => setType("watched")} value="Watched tags">
            Watched tags
          </ToggleButton>
          <ToggleButton value="Ignored tags" onClick={() => setType("ignored")}>
            Ignored tags
          </ToggleButton>
        </ToggleButtonGroup>
        <div className="max-w-[536px] w-full mt-2">
          <ul className="flex flex-wrap gap-2 max-w-[536px] w-full mb-2">
            {list.map((item, index) => (
              <li
                className="p-2 ml-0 mr-0 bg-[#0e1b2b] rounded-[10px] flex gap-2"
                key={index}
              >
                {item}
                <div
                  className="cursor-pointer"
                  onClick={() => onDeleteInterest(type, item)}
                >
                  X
                </div>
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
              <SearchTags tags={tags} setCustomTags={setCustomTags} />
            </Box>
            <Stack spacing={2} direction="row">
              <Button className="w-[46px] h-[46px]" variant="contained">
                Add
              </Button>
            </Stack>
          </div>
        </div>
        {console.log("watched", watched)}
        {console.log("ignored", ignored)}
        {/* .filter((item) => type === "watched" ? !watched.includes(item) :
        !ignored.includes(item) ) */}
        <ul className="max-w-[452px] absolute mt-[40px] max-h-40 w-full m overflow-y-auto bg-[#243642] rounded shadow-md z-50">
          {customTags.map((tag) => (
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
