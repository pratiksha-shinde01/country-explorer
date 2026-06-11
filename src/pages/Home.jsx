import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import SearchBar from "../components/SearchBar";
import FilterSelect from "../components/FilterSelect";
import CountryCard from "../components/CountryCard";

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
    const fetchCountries = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          "https://raw.githubusercontent.com/mledoze/countries/master/countries.json"
        );

        const formattedData = response.data.map((country) => ({
          ...country,

          // Flag image generate from country code
          flags: {
            png: country.cca2
              ? `https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`
              : null,
          },

          // Fake population because dataset doesn't contain population
          population:
            Math.floor(Math.random() * 100000000) + 100000,
        }));

        setCountries(formattedData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch countries.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
    localStorage.setItem("region", region);
  }, [searchTerm, region]);

  const filteredCountries = useMemo(() => {
    let result = [...countries];

    result = result.filter((country) =>
      country.name?.common
        ?.toLowerCase()
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
        <h2 className="text-xl text-white">
          Loading Countries...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
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
            className="border p-2 rounded bg-slate-800 text-white"
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