// frontend/src/hooks/HookNewsletterForm.js
import { useState, useCallback } from "react";
import { addFollower } from "../components/functions/addFollower";

// ----- Masks (logic) -----
const applyDateMask = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 8); // ddmmyyyy
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
};

const applyPhoneMask = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6)
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
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

// ----- Custom hook -----
export const HooksNewsletterForm = (onClose) => {
  const [preferredContact, setPreferredContact] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [cityState, setCityState] = useState("");
  const [favoriteDrink, setFavoriteDrink] = useState("");
  const [favoriteArtist, setFavoriteArtist] = useState("");
  const [showForm, setShowForm] = useState(false);

  const onPreferredContactChange = (e) => setPreferredContact(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);

  const onPhoneChange = (e) => {
    setPhone(applyPhoneMask(e.target.value));
  };

  const onCpfChange = (e) => {
    setCpf(applyCpfMask(e.target.value));
  };

  const onFullNameChange = (e) => setFullName(e.target.value);

  const onBirthDateChange = (e) => {
    setBirthDate(applyDateMask(e.target.value));
  };

  const onCityStateChange = (e) => setCityState(e.target.value);

  const onFavoriteDrinkChange = (e) => setFavoriteDrink(e.target.value);
  const onFavoriteArtistChange = (e) => setFavoriteArtist(e.target.value);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

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

      // Chama backend Python
      addFollower(followerData);

      if (onClose) onClose();
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
      onClose,
    ]
  );

  return {
    // values
    preferredContact,
    email,
    phone,
    cpf,
    fullName,
    birthDate,
    cityState,
    favoriteDrink,
    favoriteArtist,
    showForm,

    // handlers
    onPreferredContactChange,
    onEmailChange,
    onPhoneChange,
    onCpfChange,
    onFullNameChange,
    onBirthDateChange,
    onCityStateChange,
    onFavoriteDrinkChange,
    onFavoriteArtistChange,
    setShowForm,

    onSubmit,
  };
};

export default HooksNewsletterForm;
