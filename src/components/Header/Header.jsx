import React from "react";
import "./Header.css";
import Button from "../UI/Button/Button";
import logo from "../images/logo.png";

const Header = (props) => {
  return (
    <div className="head">
      <div className="header-app">
        <img className="header_image" src={logo} alt="logo logo" />
        {props.Login ? (
          <Button className="logout" onClick={props.logout}>
            Log Out
          </Button>
        ) : (
          <div>
            <Button className="login" onClick={props.toggleSignIn}>
              Log In
            </Button>
            <Button className="signup" onClick={props.toggleSignUp}>
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
