import React, { useState } from "react";
import "./Forms.css";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import AlertModel from "../AlertModel/AlertModel";
import logo from "../images/logo.png";

const LoginInForm = (props) => {
  const [Username, SetUsername] = useState("");
  const [Password, SetPassword] = useState("");
  const [WrongInfo, SetWrongInfo] = useState(null);

  const WrongInfoHandle = () => {
    SetWrongInfo(true);
  };

  const CloseError = () => {
    SetWrongInfo(false);
  };

  const UsernameHandler = (event) => {
    SetUsername(event.target.value);
  };
  const PasswordHandler = (event) => {
    SetPassword(event.target.value);
  };

  const LoginHandler = (event) => {
    event.preventDefault();

    // Sends this data
    let dataform = new FormData();
    dataform.append("username", Username);
    dataform.append("password", Password);

    // Communicates to the data recieved method
    const requestOptions = {
      method: "POST",
      body: dataform,
    };

    fetch(`http://127.0.0.1:8000/login`, requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        WrongInfoHandle();
        throw res;
      })
      .then((data) => {
        props.SignIn();
        props.auth(data.access_token);
        props.username(data.username);
        props.Token_Type(data.token_type);
        props.user_id(data.user_id);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        SetPassword("");
        SetUsername("");
      });
  };

  return (
    <>
      {WrongInfo && (
        <AlertModel
          title={" User not Found!!!"}
          message={" Sorrry!!! I can't find you in my Database."}
          CloseErrorHandler={CloseError}
        />
      )}
      <div className="backdrop" onClick={props.close} />
      <Card className="formcard">
        <img src={logo} className="header_image" alt="logo" />
        <form className="form" onSubmit={LoginHandler}>
          <label>
            <h3>SignIn</h3>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            onChange={UsernameHandler}
            value={Username}
          />
          <input
            type="password"
            placeholder="Enter Password"
            onChange={PasswordHandler}
            value={Password}
          />
          <Button type="submit" className="lgbutton">
            LogIn
          </Button>
        </form>
      </Card>
    </>
  );
};

export default LoginInForm;
