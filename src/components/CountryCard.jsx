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

  const flagUrl =
    country?.flags?.svg ||
    country?.flags?.png ||
    null;

  return (
    <div
      className="
        bg-slate-800
        rounded-2xl
        overflow-hidden
        shadow-lg
        hover:shadow-cyan-500/30
        hover:scale-105
        transition-all
        duration-300
      "
    >
      {flagUrl ? (
        <img
          src={flagUrl}
          alt={country?.name?.common}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="h-48 w-full flex items-center justify-center bg-slate-700 text-white text-lg">
          🚩 No Flag Available
        </div>
      )}

      <div className="p-5">
        <h2 className="font-bold text-xl mb-3 text-white">
          {country?.name?.common || "Unknown Country"}
        </h2>

        <p className="text-gray-300">
          <span className="font-semibold">
            Population:
          </span>{" "}
          {country?.population?.toLocaleString() ||
            "N/A"}
        </p>

        <p className="text-gray-300">
          <span className="font-semibold">
            Region:
          </span>{" "}
          {country?.region || "N/A"}
        </p>

        <p className="text-gray-300">
          <span className="font-semibold">
            Capital:
          </span>{" "}
          {Array.isArray(country?.capital)
            ? country.capital[0]
            : country?.capital || "N/A"}
        </p>

        <Link
          to={`/country/${encodeURIComponent(
            country?.name?.common || ""
          )}`}
        >
          <button
            onClick={handleClick}
            className="
              mt-4
              w-full
              bg-cyan-600
              hover:bg-cyan-700
              text-white
              py-2
              px-4
              rounded-lg
              cursor-pointer
              transition
            "
          >
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CountryCard;