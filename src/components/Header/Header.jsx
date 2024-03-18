import React from "react";
import "./Header.css";
import Button from "../UI/Button/Button";
import instagram from "../images/instagram.jpeg";

const Header = (props) => {
  return (
    <div className="head">
      <div className="header-app">
        <img className="header_image" src={instagram} alt="instagram logo" />
        {props.Login ? (
          <Button onClick={props.logout}>Log Out</Button>
        ) : (
          <div>
            <Button onClick={props.toggleSignIn}>Log In</Button>
            <Button onClick={props.toggleSignUp}>Sign Up</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
