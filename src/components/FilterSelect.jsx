import React from "react";

const FilterSelect = ({ region, setRegion }) => {
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <select
      className="select bg-gray-900 select-success w-full md:w-60 shadow-sm"
      value={region}
      onChange={(e) => setRegion(e.target.value)}
    >
      <option value="">Filter by Region</option>
      {regions.map((reg) => (
        <option key={reg} value={reg}>
          {reg}
        </option>
      ))}
    </select>
  );
};

export default FilterSelect;