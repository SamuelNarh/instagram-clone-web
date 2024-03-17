import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./components/Post/Post";
import Header from "./components/Header/Header";
import LoginIn from "./components/Forms/LogIn";
import SignUp from "./components/Forms/SignUp";

const BASE_URL = "http://127.0.0.1:8000";

function App() {
  const [posts, SetPost] = useState([]);
  const [signin, SetSignIn] = useState(null);
  const [signup, SetSignUp] = useState(false);
  const [username, SetUsername] = useState("");
  const [LogIn, SetLogIn] = useState(false);

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
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to connect to the server");
      });
  }, []);

  const ToggleSigIn = () => {
    SetSignIn(true);
  };
  const ToggleSigUp = () => {
    SetSignUp(true);
  };

  const SignIn = () => {
    SetSignIn(false);
  };

  const UsernameHandler = (username) => {
    SetUsername(() => {
      return `Welcome ${username}`;
    });
  };

  const Auth = () => {
    SetLogIn(true);
  };

   const LogOut = () => {
     SetLogIn(false);
   };

const CloseLoginHandler=()=>{
  SetSignIn(null)

}

  return (
    <>
      {signin && (
        <LoginIn SignIn={SignIn} username={UsernameHandler} auth={Auth} close={CloseLoginHandler}/>
      )}
      {signup && <SignUp />}
      <Header
        toggleSignIn={ToggleSigIn}
        toggleSignUp={ToggleSigUp}
        Login={LogIn}
        logout={LogOut}
      />
      <h3>{username}</h3>
      <div className="app_posts">
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>
    </>
  );
}

export default App;
