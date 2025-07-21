import React from "react";
import "../styles/NewsletterForm.css";
import { addFollower } from "./functions/addFollower";

const NewsletterForm = ({ setShowForm, name, setName, email, setEmail, age, setAge, country, setCountry }) => {

  const followerData = {
        name:'Henrique',
        age:30,
        country:'Brazil',
        email:'henrique.f.stephan@gmail.com'
    }
  console.log(followerData)

  return (
    <div className="overlay">
      <div className="form-container">
        <h2>Cadastre-se aqui com seu método favorito para ser comunicado pela mix:</h2>
        <div className="input-group">
          <input type="text" required/>
          <label>Rede Social Favorita</label>
        </div>
        <div className="input-group">
          <input type="mail" required/>
          <label>Email</label>
        </div>
        <div className="input-group">
          <input type="tel" required/>
          <label>Telefone</label>
        </div>
        <div className="input-group">
          <input type="text" required/>
          <label>CPF</label>
        </div>
        <div className="input-group">
          <input type="text" required/>
          <label>Nome completo</label>
        </div>
        <div className="input-group">
          <input type="text" required/>
          <label>Aniversário</label>
        </div>
        <div className="input-group">
          <input type="text" required/>
          <label>Cidade - Estado</label>
        </div>
        <div className="input-group">
          <input type="text" required/>
          <label>Drink favorito</label>
        </div>
        <div className="input-group">
          <input type="text" required/>
          <label>Artista favorito na Mixordia</label>
        </div>
          <div className="btnWrapper">
            <button type="submit" className="main-button" onClick={() => addFollower(followerData)}>Enviar</button>
            <button type="button" onClick={() => setShowForm(false)} className="main-button">
              Cancelar
            </button>
          </div>
      </div>
    </div>
  );
};

export default NewsletterForm;
