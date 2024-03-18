import React from "react";

const Comment = (props) => (
  <div key={props.comment.id}>
    <strong>{props.comment.username}: </strong>
    {props.comment.text}
  </div>
);

export default Comment;
