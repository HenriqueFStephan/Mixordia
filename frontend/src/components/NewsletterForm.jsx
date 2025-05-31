import React from "react";
import "../styles/NewsletterForm.css";
import MainInput from "./MainInput";
import { addFollower } from "./functions/addFollower";

const NewsletterForm = ({ setShowForm, name, setName, email, setEmail, age, setAge, country, setCountry }) => {

  const followerData = {
        name:'Felix',
        age:30,
        country:'Brazil',
        email:'felixOPugnero@gmail.com'
    }
  console.log(followerData)

  return (
    <div className="overlay">
      <div className="form-container">
        <h2>Subscribe to Our Newsletter</h2>
          <MainInput label={"Full Name"} setValue={setName} />
          <MainInput label={"Email"} setValue={setEmail} />
          <MainInput label={"Age"} setValue={setAge} />
          <MainInput label={"Country"} setValue={setCountry} />
          <div className="btnWrapper">
            <button type="submit" className="main-button" style={{width:"20lvw"}} onClick={() => addFollower(followerData)}>Subscribe</button>
            <button type="button" onClick={() => setShowForm(false)} className="main-button" style={{width:"20lvw", backgroundColor:"gray"}}>
              Cancel
            </button>
          </div>
      </div>
    </div>
  );
};

export default NewsletterForm;
