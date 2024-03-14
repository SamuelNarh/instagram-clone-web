import React, { useState, useEffect } from "react";
import "./Post.css";
const BASE_URL = "http://127.0.0.1:8000/";

const Post = (props) => {
  const [imageUrl, SetImageUrl] = useState("");
  const [comments, SetComment] = useState([]);
  useEffect(() => {
    console.log(props.post.image_url_type);
    if (props.post.image_url_type === "absolute") {
      SetImageUrl(BASE_URL + props.post.image_url);
    } else {
      SetImageUrl(props.post.image_url);
    }
  }, []);

  useEffect(() => {
    SetComment(props.post.comments);
  }, []);

  return (
    <div className="post">
      <img className="post_image" src={imageUrl} />
      <h4 className="post_text">{props.post.caption}</h4>
      <div className="post_comments">
        {comments.map((comment) => (
          <p key={comment.id}>
            <strong>{comment.username}: </strong>
            {comment.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Post;
