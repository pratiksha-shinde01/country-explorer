import React, { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import FilterSelect from "../components/FilterSelect";
import CountryCard from "../components/CountryCard";
import axios from "axios";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("searchTerm") || ""
  );

  const [region, setRegion] = useState(
    localStorage.getItem("region") || ""
  );

  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,cca3")
      .then((res) => {
        setCountries(res.data);
      })
      .catch(() => {
        setError("Failed to fetch countries.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("region", region);
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm, region]);

  const filteredCountries = useMemo(() => {
    let result = [...countries];

    result = result.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    if (region) {
      result = result.filter(
        (country) => country.region === region
      );
    }

    if (sortOrder === "asc") {
      result.sort(
        (a, b) => a.population - b.population
      );
    }

    if (sortOrder === "desc") {
      result.sort(
        (a, b) => b.population - a.population
      );
    }

    return result;
  }, [countries, searchTerm, region, sortOrder]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">

      <div className="flex flex-col lg:flex-row gap-4 justify-between mb-8">

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="flex flex-col sm:flex-row gap-4">

          <FilterSelect
            region={region}
            setRegion={setRegion}
          />

          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value)
            }
            className="select bg-slate-900 select-success w-full md:w-60"
          >
            <option value="">
              Sort Population
            </option>

            <option value="asc">
              Low → High
            </option>

            <option value="desc">
              High → Low
            </option>

          </select>

        </div>

      </div>

      {filteredCountries.length === 0 ? (
        <div className="text-center text-2xl mt-16">
          🌍 No Countries Found
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCountries.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;