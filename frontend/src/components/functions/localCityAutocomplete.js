// frontend/src/components/functions/localCityAutocomplete.js

let cachedCities = null;

/**
 * Load the CSV of world cities from the public folder.
 * Returns an array like: [{ city, country, label }, ...]
 */
export const loadCityData = async () => {
  if (cachedCities) {
    return cachedCities;
  }

  const response = await fetch("/files/data/world-cities.csv");
  const text = await response.text();

  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length === 0) {
    cachedCities = [];
    return cachedCities;
  }

  const [headerLine, ...rows] = lines;
  const headers = headerLine
    .split(",")
    .map((h) => h.trim().toLowerCase());

  // Try to find city + country columns with common names
  const cityIdx = headers.findIndex((h) =>
    ["city", "name", "cidade"].includes(h)
  );
  const countryIdx = headers.findIndex((h) =>
    ["country", "pais", "país"].includes(h)
  );

  if (cityIdx === -1) {
    console.warn(
      "[localCityAutocomplete] Could not find a city column in CSV header:",
      headers
    );
    cachedCities = [];
    return cachedCities;
  }

  const cities = rows
    .map((row) => {
      const cols = row.split(",");
      const city = (cols[cityIdx] || "").trim();
      const country = countryIdx >= 0 ? (cols[countryIdx] || "").trim() : "";
      if (!city) return null;

      const label = country ? `${city} - ${country}` : city;
      return { city, country, label };
    })
    .filter(Boolean);

  cachedCities = cities;
  console.log(
    `[localCityAutocomplete] Loaded ${cities.length} cities from CSV.`
  );
  return cachedCities;
};

/**
 * Returns an array of labels like "Munich - DE" matching the query.
 */
export const getCitySuggestions = (query, allCities, maxResults = 10) => {
  const q = query.trim().toLowerCase();
  if (!q || !allCities || allCities.length === 0) return [];

  const startsWith = [];
  const contains = [];

  for (const item of allCities) {
    const label = item.label;
    const lower = label.toLowerCase();

    if (lower.startsWith(q)) {
      startsWith.push(label);
    } else if (lower.includes(q)) {
      contains.push(label);
    }

    if (startsWith.length >= maxResults) break;
  }

  const combined = [...startsWith];

  for (const label of contains) {
    if (combined.length >= maxResults) break;
    if (!combined.includes(label)) {
      combined.push(label);
    }
  }

  return combined;
};
