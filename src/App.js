import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./components/Post/Post";
import Header from "./components/Header/Header";
import LoginIn from "./components/Forms/LogIn";
import SignUp from "./components/Forms/SignUp";
import PostImage from "./components/Post-Image/Post-Image";

const BASE_URL = "http://127.0.0.1:8000";

function App() {
  const [posts, SetPost] = useState([]);
  const [signin, SetSignIn] = useState(null);
  const [signup, SetSignUp] = useState(false);
  const [LogIn, SetLogin] = useState(null);
  const [username, SetUsername] = useState("");
  const [Access_Token, SetAccess_Token] = useState(null);
  const [Token_Type, SetToken_Type] = useState(null);
  const [User_id, SetUser_id] = useState("");
  const [error, SetError] = useState(false);

  useEffect(() => {
    // Gets the LocalStorage stored Item and reset the State
    SetAccess_Token(localStorage.getItem("Auth_Token"));
    SetToken_Type(localStorage.getItem("Token_Type"));
    SetUser_id(localStorage.getItem("user_id"));
    SetUsername(localStorage.getItem("username"));
  }, []);

  useEffect(() => {
    // If granted access =>stores data into local storage
    if (Access_Token) {
      localStorage.setItem("Auth_Token", Access_Token);
    }
    if (Token_Type) {
      localStorage.setItem("Token_Type", Token_Type);
    }
    if (User_id) {
      localStorage.setItem("user_id", User_id);
    }
    if (username) {
      localStorage.setItem("username", username);
    }
  }, [Access_Token, Token_Type, User_id]);

  useEffect(() => {
    fetch(`${BASE_URL}/post/all`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        //sorting the reponse
        const result = data.sort((a, b) => {
          const t_a = a.timestamp.split(/[-T:]/);
          const t_b = b.timestamp.split(/[-T:]/);
          const d_a = new Date(
            Date.UTC(t_a[0], t_a[1] - 1, t_a[2], t_a[3], t_a[4], t_a[5])
          );
          const d_b = new Date(
            Date.UTC(t_b[0], t_b[1] - 1, t_b[2], t_b[3], t_b[4], t_b[5])
          );
          return d_b - d_a;
        });
        return result;
      })
      .then((data) => {
        SetPost(data);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to connect to the server");
      });
  }, []);

  const OpenErrorHandler = () => {
    SetError(true);
  };

  const CloseErrorHandler = () => {
    SetError(false);
  };

  const ToggleSigIn = () => {
    SetSignIn(true);
  };
  const ToggleSigUp = () => {
    SetSignUp(true);
  };

  const SignIn = () => {
    SetSignIn(false);
    SetLogin(true);
  };

  const UsernameHandler = (username) => {
    SetUsername(() => {
      return `Welcome ${username}`;
    });
  };

  const Access_TokenHandler = (access_token) => {
    SetAccess_Token(access_token);
  };
  const Token_TypeHandler = (Token_Type) => {
    SetToken_Type(Token_Type);
  };
  const User_idHandler = (user_id) => {
    SetUser_id(user_id);
  };

  const LogOutHandler = () => {
    localStorage.removeItem("Auth_Token");
    localStorage.removeItem("Token_Type");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    SetLogin(false);
    SetUsername("");
    SetAccess_Token("");
    SetToken_Type("");
    SetUser_id("");
  };

  const CloseFormHandler = () => {
    SetSignIn(null);
    SetSignUp(null);
  };

  return (
    <>
      {signin && (
        <LoginIn
          SignIn={SignIn}
          username={UsernameHandler}
          auth={Access_TokenHandler}
          close={CloseFormHandler}
          Token_Type={Token_TypeHandler}
          user_id={User_idHandler}
          error={error}
          OpenErrorHandler={OpenErrorHandler}
          CloseErrorHandler={CloseErrorHandler}
        />
      )}
      {signup && (
        <SignUp
          CloseErrorHandler={CloseErrorHandler}
          username={UsernameHandler}
          error={error}
          OpenErrorHandler={OpenErrorHandler}
          close={CloseFormHandler}
        />
      )}
      <Header
        toggleSignIn={ToggleSigIn}
        toggleSignUp={ToggleSigUp}
        Login={Access_Token}
        logout={LogOutHandler}
      />
      {username && (
        <div className="welcome-message">
          <h3>{username}</h3>
        </div>
      )}
      <div className="app_posts">
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>
      {Access_Token ? (
        <PostImage
          Access_Token={Access_Token}
          Token_Type={Token_Type}
          user_id={User_id}
        />
      ) : (
        <p>You need to login to Post</p>
      )}
    </>
  );
}

export default App;
