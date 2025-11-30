// frontend/src/components/NewsletterForm.jsx
import React from "react";
import "../styles/NewsletterForm.css";
import MainInput from "./MainInput";

const NewsletterForm = ({
  setShowForm,
  onSubmit,

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

  // change handlers (provided by the hook)
  onPreferredContactChange,
  onEmailChange,
  onPhoneChange,
  onCpfChange,
  onFullNameChange,
  onBirthDateChange,
  onCityStateChange,
  onFavoriteDrinkChange,
  onFavoriteArtistChange,
}) => {
  return (
    <div className="overlay">
      <div className="form-container">
        <h2>
          Cadastre-se aqui com seu método favorito para ser comunicado pela mix:
        </h2>

        <form onSubmit={onSubmit}>
          <MainInput
            label="Método preferido de contato"
            as="select"
            value={preferredContact}
            onChange={onPreferredContactChange}
            options={[
              "E-mail",
              "Telefone",
              "WhatsApp",
              "Instagram DM",
              "SMS",
            ]}
          />

          <MainInput
            label="Email"
            type="email"
            value={email}
            onChange={onEmailChange}
          />

          <MainInput
            label="Telefone"
            type="text" // máscara feita no hook
            value={phone}
            onChange={onPhoneChange}
          />

          <MainInput
            label="CPF"
            type="text" // máscara feita no hook
            value={cpf}
            onChange={onCpfChange}
          />

          <MainInput
            label="Nome completo"
            type="text"
            value={fullName}
            onChange={onFullNameChange}
          />

          <MainInput
            label="Data de Nascimento"
            type="text" // DD/MM/YYYY, máscara feita no hook
            value={birthDate}
            onChange={onBirthDateChange}
          />

          <MainInput
            label="Cidade - Estado"
            type="text"
            value={cityState}
            onChange={onCityStateChange}
          />

          <MainInput
            label="Drink favorito"
            as="select"
            value={favoriteDrink}
            onChange={onFavoriteDrinkChange}
            options={[
              "Gin Tônica",
              "Cerveja",
              "Vinho",
              "Drink autoral da casa",
              "Não bebo álcool",
            ]}
          />

          <MainInput
            label="Artista favorito na Mixordia"
            as="select"
            value={favoriteArtist}
            onChange={onFavoriteArtistChange}
            options={["DJ A", "DJ B", "Banda X", "Banda Y", "Outro"]}
          />

          <div className="btnWrapper">
            <button type="submit" className="main-button">
              Enviar
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="main-button"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsletterForm;
