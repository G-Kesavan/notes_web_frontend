import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Search = ({ searchItem }) => {
  const [value, setValue] = useState("");
  const onchange = (e) => {
    const searchText = e;
    setValue(searchText);
    searchItem(e);
  };
  return (
    <div className="flex bg-blue-100 items-center justify-center px-2 rounded-lg">
      <input
        id="search"
        value={value}
        type="search"
        className=" h-[5vh] md:w-full w-20.5 px-2 outline-none"
        placeholder="Search Item"
        onChange={(e) => onchange(e.target.value)}
      />
      <FaMagnifyingGlass />
    </div>
  );
};

export default Search;
