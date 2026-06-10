import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search for a country..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="input input-success w-full md:w-96 shadow-sm bg-slate-900 text-white border-2 rounded p-2"
    />
  );
};

export default SearchBar;