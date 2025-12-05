import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed !== "" && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-col gap-2">
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 bg-blue-300 text-blue-900 px-2 py-1 rounded"
            >
              #{tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="text-red-600 hover:text-red-800"
              >
                <MdClose size={16} />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 ">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add tags"
          className="flex-grow p-1 border rounded-sm outline-none w-2.5 bg-white overflow-hidden"
        />
        <button
          onClick={addNewTag}
          className="bg-green-500 p-2 rounded-sm text-white hover:bg-green-600 transition"
        >
          <MdAdd size={20} />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
