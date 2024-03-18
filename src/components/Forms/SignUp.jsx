import React, { useState } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import "./Forms.css";
import instagram_logo from "../images/instagram.jpeg";
import ErrorModel from "../ErrorModel/ErrorModel";

const SignUp = (props) => {
  const [Error,SetError]=useState(null)

  const closeError = () => {
    SetError(false);
  };


  return (
    <>
      {Error && <ErrorModel closeError={closeError} />}
     ( <div>
        <div className="backdrop" onClick={props.close} />
        <Card className="formcard">
          <img
            src={instagram_logo}
            className="header_image"
            alt="instagram_logo"
          />
          <form className="form">
            <label>
              <h3>SignUp</h3>
            </label>
            <input type="text" placeholder="Enter your Username" />
            <input type="email" placeholder="Enter your email" />
            <input type="password" placeholder="Enter your Password" />
            <Button className="lgbutton">SignUp</Button>
          </form>
        </Card>
      </div>)
    </>
  );
};

export default SignUp;
