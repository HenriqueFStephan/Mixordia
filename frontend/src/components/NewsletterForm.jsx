// frontend/src/components/NewsletterForm.jsx
import React, { useState } from "react";
import "../styles/NewsletterForm.css";
import MainInput from "./MainInput";


const NewsletterForm = ({
  setShowForm,
  onSubmit,

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

  // ⬇ suggestions coming from the hook
  citySuggestions,
}) => {
  const handleSubmit = (e) => {
    console.log("[NewsletterForm] handleSubmit fired");
    onSubmit(e); // hook will handle addFollower
    setShowForm(false); // close overlay
  };

  // when user clicks a suggestion, we just update the field value
  const handleCitySuggestionClick = (label) => {
    onCityStateChange({ target: { value: label } });
  };

  const [preferredEditable, setPreferredEditable] = useState(false);

    const handlePreferredContactSelectChange = (e) => {
    // update parent state
    onPreferredContactChange(e);
    // after the user selects once, switch to input mode
    setPreferredEditable(true);
  };

  // inside NewsletterForm (or wherever this JSX lives)

const handleInstaChange = (e) => {
  // placeholder for now – later you swap this for onInstaChange from the hook
  console.log("[NewsletterForm] Instagram handle:", e.target.value);
};

const dynamicLabel =
  preferredContact === "E-Mail"
    ? "E-Mail para contato"
    : preferredContact === "WhatsApp" || preferredContact === "Telegram"
    ? "Telefone"
    : preferredContact === "Instagram DM"
    ? "@"
    : "Nome";

const dynamicOnChange =
  preferredContact === "E-Mail"
    ? onEmailChange
    : preferredContact === "WhatsApp" || preferredContact === "Telegram"
    ? onPhoneChange
    : preferredContact === "Instagram DM"
    ? handleInstaChange // later -> onInstaChange
    : onFullNameChange;

const dynamicValue = 
  preferredContact === "E-Mail"
    ? email
    : preferredContact === "WhatsApp" || preferredContact === "Telegram"
    ? phone
    : preferredContact === "Instagram DM"
    ? handleInstaChange // later -> onInstaChange
    : onFullNameChange;


  return (
    <div className="overlay">
      <div className="form-container">

        <form onSubmit={handleSubmit} className="form">
        <h2>
          Registre-se aqui para ficar por dentro dos nossos eventos:
        </h2>

          {preferredEditable ? (
            <MainInput
              label={dynamicLabel}
              type="text"
              onChange={dynamicOnChange}
              value={dynamicValue}
            />
          ) : (
            <MainInput
              label="Por onde você quer ser informado?"
              as="select"
              value={preferredContact}
              onChange={handlePreferredContactSelectChange}
              options={["E-Mail", "WhatsApp", "Instagram DM", "Telegram"]}
            />
          )}

        

          <MainInput
            label="Como devemos te chamar?"
            type="text"
            value={fullName}
            onChange={onFullNameChange}
          />
                    {/* CIDADE - ESTADO COM DROPDOWN CUSTOMIZADO */}
          <div className="city-autocomplete">
            <MainInput
              label="Cidade - País"
              type="text"
              value={cityState}
              onChange={onCityStateChange}
            />

            {citySuggestions && citySuggestions.length > 0 && (
              <ul className="city-suggestions">
                {citySuggestions.map((s) => (
                  <li
                    key={s}
                    onClick={() => handleCitySuggestionClick(s)}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <MainInput
            label="CPF para registro único"
            type="text"
            value={cpf}
            onChange={onCpfChange}
          />
          
          {preferredContact !== 'E-mail' &&
          <MainInput
            label="E-Mail para confirmação de registro"
            type="email"
            value={email}
            onChange={onEmailChange}
          />}
          
        <div>--------------------------------------------------------------------------------------------------</div>
        <h2>
          OPCIONAL - Nos conte um pouco mais de você:
        </h2>
        <h3> Isso nos ajuda a tornar o evento ainda melhor!!! </h3>
          <MainInput
            label="Data de Nascimento"
            type="text"
            value={birthDate}
            onChange={onBirthDateChange}
          />

          <MainInput
            label="Drink favorito"
            as="select"
            value={favoriteDrink}
            onChange={onFavoriteDrinkChange}
            options={[
              "Cerveja",
              "Chopp",
              "Vinho",
              "Gin Tônica",
              "Vodka Bull",
              "Whiskey",
              "Xeque-Mate",
              "Não bebo álcool",
            ]}
          />

          <MainInput
            label="Set favorito na Mixordia"
            as="select"
            value={favoriteArtist}
            onChange={onFavoriteArtistChange}
            options={["Giammarco Orsini", "The Ghost", "Matthias", "Adi", "Franceco Farfa", "DJ Tree", "Flo Massé"]}
          />

          <div className="btnWrapper">
            <button type="submit" className="main-button">
              ENVIAR
            </button>
            <button
              type="button"
              onClick={() => {
                console.log("[NewsletterForm] Cancelar clicked");
                setShowForm(false);
              }}
              className="main-button"
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsletterForm;
