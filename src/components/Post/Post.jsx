import React, { useState, useEffect } from "react";
import "./Post.css";

const Post = (props) => {
  const [imageUrl, SetImageUrl] = useState("");
  useEffect(() => {
    console.log(props.post.image_url_type);
    if (props.post.image_url_type === "relative") {
      SetImageUrl(props.post.image_url);
    } else {
    //   SetImageUrl("http://127.0.0.1:8000/post/image");
    }
  }, []);
  return (
    <div className="post">
      <img className="post_image" src={imageUrl} />
    </div>
  );
};

export default Post;
