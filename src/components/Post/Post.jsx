import React, { useState, useEffect } from "react";
import "./Post.css";
import Button from "../UI/Button/Button";

const BASE_URL = "http://127.0.0.1:8000/";

const Post = (props) => {
  const [imageUrl, SetImageUrl] = useState("");
  const [comments, SetComment] = useState([]);
  const [profile, SetProfile] = useState("");
  useEffect(() => {
    SetProfile(BASE_URL + props.post.image_url);
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
      <div className="post_header">
        <div className="post_header_item">
          <img className="profile" src={profile} alt="profile_pics" />
          <strong>
            <em>{props.post.user.username}</em>
          </strong>
        </div>
        <div>
          <Button className="delete">Delete</Button>
        </div>
      </div>
      <img className="post_image" src={imageUrl} alt="post_image" />
      <h4 className="post_text">{props.post.caption}</h4>
      <div className="post_comments">
        {comments.map((comment) => (
          <div key={comment.id}>
            <strong>{comment.username}: </strong>
            {comment.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
