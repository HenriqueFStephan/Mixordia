import React from "react";
import "../styles/NewsletterForm.css";
import MainInput from "./MainInput";

const NewsletterForm = ({ onClose }) => {
  return (
    <div className="overlay">
      <div className="form-container">
        <h2>Subscribe to Our Newsletter</h2>
          <MainInput label={"Full Name"}/>
          <MainInput label={"Email"} />
          <MainInput label={"Age"} />
          <MainInput label={"Country"} />
          <div className="btnWrapper">
            <button type="submit" className="main-button" style={{width:"20lvw"}}>Subscribe</button>
            <button type="button" onClick={onClose} className="main-button" style={{width:"20lvw", backgroundColor:"gray"}}>
              Cancel
            </button>
          </div>
      </div>
    </div>
  );
};

export default NewsletterForm;
