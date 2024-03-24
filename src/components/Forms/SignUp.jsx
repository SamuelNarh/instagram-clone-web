import React, { useState } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import "./Forms.css";
import logo from "../images/logo.png";
import AlertModel from "../AlertModel/AlertModel";

const SignUp = (props) => {
  const [username, SetUsername] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [emailExist, SetEmailExist] = useState(null);

  const usernameHandler = (event) => {
    SetUsername(event.target.value);
  };

  const emailHandler = (event) => {
    SetEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    SetPassword(event.target.value);
  };

  const emailExistHandler = () => {
    SetEmailExist(true);
  };

  const CloseEmailError = () => {
    SetEmailExist(false);
  };

  const SignUpHandler = (event) => {
    event.preventDefault();

    // What to send? sends this data form to the server:
    const json_string = JSON.stringify({
      username: username,
      email: email,
      password: password,
    });

    //Data sent to the fetch call and method
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json_string,
    };
    fetch(`https://instagram-samuelnarh.koyeb.app/user/`, requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        props.Username(data.username);
        props.OpenSuccessHandler();
        props.closeSignUp();
      })
      .catch((err) => {
        emailExistHandler();
      });

    SetUsername("");
    SetEmail("");
    SetPassword("");
  };

  return (
    <>
      {emailExist && (
        <AlertModel
          title="Email Exist"
          message={`Oopss!!! Email already exist in my database \n Use any dummy email`}
          CloseErrorHandler={CloseEmailError}
        ></AlertModel>
      )}
      <div className="backdrop" onClick={props.close} />
      <Card className="formcard">
        <img src={logo} className="header_image" alt="logo" />
        <form className="form" onSubmit={SignUpHandler}>
          <label>
            <h3>SignUp</h3>
          </label>
          <input
            type="text"
            placeholder="Enter your Username"
            value={username}
            onChange={usernameHandler}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            onChange={emailHandler}
            value={email}
          />
          <input
            type="password"
            placeholder="Enter your Password"
            onChange={passwordHandler}
            value={password}
            required
          />
          <Button className="lgbutton" type="submit">
            SignUp
          </Button>
        </form>
      </Card>
    </>
  );
};

export default SignUp;
