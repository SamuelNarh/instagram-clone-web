import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/UI/Card/Card";

const BASE_URL = "http://127.0.0.1:8000";

function App() {
  const [posts, SetPost] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/post/all`)
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        SetPost(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Card>
        <img src=""/>
      </Card>
    </>
  );
}

export default App;
