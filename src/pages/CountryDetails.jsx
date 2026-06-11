import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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

        const response = await axios.get(
          "https://raw.githubusercontent.com/mledoze/countries/master/countries.json"
        );

        const foundCountry = response.data.find(
          (c) =>
            c.name?.common?.toLowerCase() ===
            decodeURIComponent(name).toLowerCase()
        );

        if (!foundCountry) {
          setError("Country not found.");
        } else {
          setCountry(foundCountry);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch country details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [name]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <h2 className="text-2xl">Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
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
          className="mb-8 px-5 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition cursor-pointer"
        >
          ← Back
        </button>

        <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl">

          <img
            src={country.flags?.svg || country.flags?.png}
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
                  {Array.isArray(country.capital)
                    ? country.capital[0]
                    : country.capital || "N/A"}
                </p>

                <p>
                  <strong>Region:</strong>{" "}
                  {country.region || "N/A"}
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