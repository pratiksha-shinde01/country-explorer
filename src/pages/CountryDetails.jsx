import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

const CountryDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://restcountries.com/v3.1/name/${name}?fullText=true&fields=name,flags,region,capital,population,subregion,languages,currencies,area`
        );

        setCountry(res.data[0]);
      } catch (err) {
        setError("Failed to fetch country details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [name]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <h2 className="text-red-500 text-2xl">
          {error}
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="mb-8 px-5 py-2 cursor-pointer bg-cyan-600 hover:bg-cyan-700 rounded-lg transition"
        >
          ← Back
        </button>

        <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl">

          <img
            src={country.flags?.svg}
            alt={country.name?.common}
            className="w-full h-80 object-cover"
          />

          <div className="p-8">

            <h1 className="text-4xl font-bold mb-6">
              {country.name?.official}
            </h1>

            <div className="grid md:grid-cols-2 gap-6 text-lg">

              <div>
                <p>
                  <strong>Country:</strong>{" "}
                  {country.name?.common}
                </p>

                <p>
                  <strong>Capital:</strong>{" "}
                  {country.capital?.[0] || "N/A"}
                </p>

                <p>
                  <strong>Region:</strong>{" "}
                  {country.region}
                </p>

                <p>
                  <strong>Sub Region:</strong>{" "}
                  {country.subregion || "N/A"}
                </p>
              </div>

              <div>
                <p>
                  <strong>Population:</strong>{" "}
                  {country.population?.toLocaleString()}
                </p>

                <p>
                  <strong>Area:</strong>{" "}
                  {country.area?.toLocaleString()} km²
                </p>
              </div>

            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-3">
                Languages
              </h2>

              <div className="flex flex-wrap gap-2">
                {country.languages
                  ? Object.values(country.languages).map((lang) => (
                      <span
                        key={lang}
                        className="px-3 py-1 bg-cyan-700 rounded-full"
                      >
                        {lang}
                      </span>
                    ))
                  : "N/A"}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-3">
                Currencies
              </h2>

              <div className="flex flex-wrap gap-2">
                {country.currencies
                  ? Object.values(country.currencies).map((currency) => (
                      <span
                        key={currency.name}
                        className="px-3 py-1 bg-emerald-700 rounded-full"
                      >
                        {currency.name}
                      </span>
                    ))
                  : "N/A"}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CountryDetails;