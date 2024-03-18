import React, { useState } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import "./Forms.css";
import instagram_logo from "../images/instagram.jpeg";
import ErrorModel from "../ErrorModel/ErrorModel";

const SignUp = (props) => {
  const [Error, SetError] = useState(null);
  const [username, SetUsername] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  const usernameHandler = (event) => {
    SetUsername(event.target.value);
  };

  const emailHandler = (event) => {
    SetEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    SetPassword(event.target.value);
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
        props.username(data.username);
        props.close()
      })
      .catch((err) => {
        console.log(err);
      });

    SetUsername("");
    SetEmail("");
    SetPassword("");
  };

  const closeError = () => {
    SetError(false);
  };

  return (
    <>
      {Error && <ErrorModel closeError={closeError} />}
      <div className="backdrop" onClick={props.close} />
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
