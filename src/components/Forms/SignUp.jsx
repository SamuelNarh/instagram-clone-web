import React, { useState } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import "./Forms.css";
import instagram_logo from "../images/instagram.jpeg";
import AlertModel from "../AlertModel/AlertModel";

const SignUp = (props) => {
  const [username, SetUsername] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [SignUpSuccess, SetSignUpSuccess] = useState(null);

  const usernameHandler = (event) => {
    SetUsername(event.target.value);
  };

  const emailHandler = (event) => {
    SetEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    SetPassword(event.target.value);
  };

  const CloseSuccessHandler = () => {
    SetSignUpSuccess(false);
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
    fetch(`http://127.0.0.1:8000/user/`, requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        console.log(data);
        SetUsername(data.username);
        SetSignUpSuccess(true);
        return;
      })
      .catch((err) => {
        console.log(err);
      });

    SetUsername("");
    SetEmail("");
    SetPassword("");
  };

  return (
    <>
      {SignUpSuccess && (
        <AlertModel
          message={`Welcome ${username} .I am happy to have you here!!!`}
          title={`Succeful Sign Up`}
          CloseErrorHandler={CloseSuccessHandler}
        />
      )}
      <div
        className="backdrop"
        onClick={(props.close)}
      />
      <Card className="formcard">
        <img
          src={instagram_logo}
          className="header_image"
          alt="instagram_logo"
        />
        <form className="form" onSubmit={SignUpHandler}>
          <label>
            <h3>SignUp</h3>
          </label>
          <input
            type="text"
            placeholder="Enter your Username"
            value={username}
            onChange={usernameHandler}
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
