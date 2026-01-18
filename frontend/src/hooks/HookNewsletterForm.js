// frontend/src/hooks/HookNewsletterForm.js
import { useState, useEffect, useCallback } from "react";
import { addFollower } from "../components/functions/addFollower";
import {
  loadCityData,
  getCitySuggestions,
} from "../components/functions/localCityAutocomplete";

// helpers for masks
const applyDateMask = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 8); // ddmmyyyy
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
};

const applyPhoneMask = (value) => {
  // Trim to check the first char
  const trimmed = value.trim();

  // Does the user want an international format with + ?
  const hasPlus = trimmed.startsWith("+");

  // Remove everything that is not a digit
  const digits = value.replace(/\D/g, "");

  // Limit to 15 digits (E.164 max length)
  const limited = digits.slice(0, 15);

  // If user started with +, keep it: +<digits>
  return hasPlus ? `+${limited}` : limited;
};


const applyCpfMask = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6)
    return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9)
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
};

export const HookNewsletterForm = () => {
  console.log("[HookNewsletterForm] hook initialized");

  const [showForm, setShowForm] = useState(false);
  const [showImages, setShowImages] = useState(false);

  // --- form fields ---
  const [preferredContact, setPreferredContact] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [cityState, setCityState] = useState("");
  const [favoriteDrink, setFavoriteDrink] = useState("");
  const [favoriteArtist, setFavoriteArtist] = useState("");

  // --- local city autocomplete state ---
  const [allCities, setAllCities] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  // --- load CSV once on mount ---
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setIsLoadingCities(true);
        const cities = await loadCityData();
        if (!cancelled) {
          setAllCities(cities);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(
            "[HookNewsletterForm] failed to load city CSV:",
            err
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoadingCities(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

// --- update suggestions when cityState changes ---
useEffect(() => {
  const query = cityState.trim();

  // too short or no data loaded -> no suggestions
  if (query.length < 2 || allCities.length === 0) {
    setCitySuggestions([]);
    return;
  }

  const suggestions = getCitySuggestions(query, allCities, 10);

  // if the current text is already a full, exact match
  // to the only suggestion -> hide the dropdown
  if (
    suggestions.length === 1 &&
    suggestions[0].toLowerCase() === query.toLowerCase()
  ) {
    setCitySuggestions([]);
  } else {
    setCitySuggestions(suggestions);
  }
}, [cityState, allCities]);


  // --- change handlers ---
  const onPreferredContactChange = (e) => {
    setPreferredContact(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPhoneChange = (e) => {
    const masked = applyPhoneMask(e.target.value);
    setPhone(masked);
  };

  const onCpfChange = (e) => {
    const masked = applyCpfMask(e.target.value);
    setCpf(masked);
  };

  const onFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const onBirthDateChange = (e) => {
    const masked = applyDateMask(e.target.value);
    setBirthDate(masked);
  };

  const onCityStateChange = (e) => {
    setCityState(e.target.value);
  };

  const onFavoriteDrinkChange = (e) => {
    setFavoriteDrink(e.target.value);
  };

  const onFavoriteArtistChange = (e) => {
    setFavoriteArtist(e.target.value);
  };

  // --- submit handler ---
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("[HookNewsletterForm] onSubmit called");

      const followerData = {
        preferredContact,
        email,
        phone,
        cpf,
        fullName,
        birthDate,
        cityState,
        favoriteDrink,
        favoriteArtist,
      };

      console.log("[HookNewsletterForm] followerData to submit:", followerData);

      window.__lastFollowerData = followerData;

      try {
        const result = await addFollower(followerData);
        console.log("[HookNewsletterForm] addFollower result:", result);
      } catch (err) {
        console.error("[HookNewsletterForm] error in onSubmit:", err);
      }
    },
    [
      preferredContact,
      email,
      phone,
      cpf,
      fullName,
      birthDate,
      cityState,
      favoriteDrink,
      favoriteArtist,
    ]
  );

  return {
    showForm,
    setShowForm,
    showImages,
    setShowImages,

    preferredContact,
    email,
    phone,
    cpf,
    fullName,
    birthDate,
    cityState,
    favoriteDrink,
    favoriteArtist,

    onPreferredContactChange,
    onEmailChange,
    onPhoneChange,
    onCpfChange,
    onFullNameChange,
    onBirthDateChange,
    onCityStateChange,
    onFavoriteDrinkChange,
    onFavoriteArtistChange,

    // autocomplete bits exposed to the form
    citySuggestions,
    isLoadingCities,

    onSubmit,
  };
};

export default HookNewsletterForm;
