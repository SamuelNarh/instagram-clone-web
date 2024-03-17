import React from "react";
import "./Header.css";
import Button from "../UI/Button/Button";
import instagram from '../images/instagram.jpeg';

const Header = (props) => {
  const SignIn = () => {
    props.toggleSignIn();
  };
  const SignUp = () => {
    props.toggleSignUp();
  };

  const LogOut =()=>{
    props.logout();
  }

  return (
    <div className="head">
      <div className="header-app">
        <img className="header_image" src={instagram} alt="instagram logo" />
        {props.Login ? (
          <Button onClick={LogOut}>Log Out</Button>
        ) : (
          <div>
            <Button onClick={SignIn}>Log In</Button>
            <Button onClick={SignUp}>Sign Up</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
