import React, { useState } from "react";
import "./Forms.css";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import ErrorModel from "../ErrorModel/ErrorModel";

const LoginInForm = (props) => {
  const [Username, SetUsername] = useState("");
  const [Password, SetPassword] = useState("");
  const [error, SetError] = useState(false);

  const UsernameHandler = (event) => {
    SetUsername(event.target.value);
  };
  const PasswordHandler = (event) => {
    SetPassword(event.target.value);
  };

  // const AccesUsername =(username)=>{
  // }

  const LoginHandler = (event) => {
    event.preventDefault();
    // if (Username.trim().length < 5) {
    //   SetError(true);
    //   return;
    // }
    if (Password.length < 1) {
      SetError(true);
      return;
    }

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
        throw res;
      })
      .then((data) => {
        console.log(data);
        props.SignIn();
        props.auth(data.access_token);
        props.username(data.username);
      })
      .catch((err) => {
        console.log(err);
      });
    SetPassword("");
    SetUsername("");
  };

  const closeError = () => {
    SetError(false);
  };

  return (
    <>
      {error && <ErrorModel closeError={closeError} />}
      <div className="backdrop">
        <Card className="formcard">
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
      </div>
    </>
  );
};

export default LoginInForm;
