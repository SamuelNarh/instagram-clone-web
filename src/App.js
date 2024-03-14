import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./components/Post/Post";

const BASE_URL = "http://127.0.0.1:8000";

function App() {
  const [posts, SetPost] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/post/all`)
      .then((res) => {
        // console.log(res);
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        SetPost(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to connect to the server");
      });
  }, []);
  return (
    <>
      <div className="app_posts">
        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>
    </>
  );
}

export default App;
