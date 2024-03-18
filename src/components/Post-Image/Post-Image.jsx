import React, { useState } from "react";
import './Post-Image.css'
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

const Image_url = () => {
  const [Caption, SetCaption] = useState("");
  const [Image, SetImage] = useState(null);
  const captionHandler = (event) => {
    SetCaption(event.target.value);
  };

  const ImageFileHandler = (event) => {
    if (event.target.files[0]) {
      SetImage(event.target.files[0]);
    }
  };

  const PostHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Card className="post image-post">
      <form onSubmit={PostHandler} className="image-post">
        <textarea
          rows="7"
          placeholder="Enter your caption"
          type="text"
          onChange={captionHandler}
          value={Caption}
        />
        <input type="file" id="fileInput" onChange={ImageFileHandler} />
        <Button type="submit" className="lgbutton">
          Upload
        </Button>
      </form>
    </Card>
  );
};

export default Image_url;
