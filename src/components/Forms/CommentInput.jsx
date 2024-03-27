import React, { useState } from "react";
import "./Forms.css";
import comment_img from "../images/comment.png";

const CommentInput = (props) => {
  const [Inputcomment, SetInputcomment] = useState("");
  const CommentHandler = (event) => {
    event.preventDefault();
    if (Inputcomment.trim().length < 1) {
      return;
    }

    const comment = JSON.stringify({
      text: Inputcomment,
      username: props.username,
      post_id: props.post_id,
    });
    const requestOptions = {
      method: "POST",
      //for authorization at the backend, we need token_type and access_token to verify user.
      headers: new Headers({
        Authorization: props.Token_Type + " " + props.Access_Token,
        "Content-Type": "application/json",
      }),
      body: comment,
    };

    fetch(`https://instagram-samuelnarh.koyeb.app/comment/`, requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        fetchAllComments();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        SetInputcomment("");
      });

    const fetchAllComments = () => {
      fetch(
        `https://instagram-samuelnarh.koyeb.app/comment/all/${props.post_id}`
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw res;
        })
        .then((data) => {
          props.comments(data);
        });
    };
  };
  const InputHandler = (event) => {
    SetInputcomment(event.target.value);
  };
  return (
    <>
      <form>
        <input
          className="comment"
          placeholder="Leave a comment ..."
          onChange={InputHandler}
          value={Inputcomment}
          required
        />
        <img
          className="comment_img"
          src={comment_img}
          onClick={CommentHandler}
          required
        ></img>
      </form>
    </>
  );
};

export default CommentInput;
