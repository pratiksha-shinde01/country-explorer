import React from "react";
import { Link, useLocation } from "react-router-dom";

const CountryCard = ({ country }) => {
  const location = useLocation();

  const handleClick = () => {
    sessionStorage.setItem(
      "homeScroll",
      String(window.scrollY || 0)
    );
    sessionStorage.setItem(
      "homePath",
      location.pathname
    );
  };

  return (
    <div className="
      bg-slate-800
      rounded-2xl
      overflow-hidden
      shadow-lg
      hover:shadow-cyan-500/30
      hover:scale-105
      transition-all
      duration-300
    ">

      <img
        src={country.flags.svg}
        alt={country.name.common}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">

        <h2 className="font-bold text-xl mb-3">
          {country.name.common}
        </h2>

        <p>
          <span className="font-semibold">
            Population:
          </span>{" "}
          {country.population.toLocaleString()}
        </p>

        <p>
          <span className="font-semibold">
            Region:
          </span>{" "}
          {country.region}
        </p>

        <p>
          <span className="font-semibold">
            Capital:
          </span>{" "}
          {country.capital?.[0] || "N/A"}
        </p>

        <Link
          to={`/country/${country.name.common}`}
        >
          <button
            onClick={handleClick}
            className="btn bg-white py-2 px-4 text-gray-900 cursor-pointer btn-success mt-4 w-full"
          >
            View Details
          </button>
        </Link>

      </div>

    </div>
  );
};

export default CountryCard;