import React, { useState, useEffect } from "react";
import "./Post.css";
import Button from "../UI/Button/Button";
import Comment from "../Comment/Comment";
import AlertModel from "../AlertModel/AlertModel";
import CommentInput from "../Forms/CommentInput";

const BASE_URL = "http://127.0.0.1:8000/";

const Post = (props) => {
  const [imageUrl, SetImageUrl] = useState("");
  const [comments, SetComment] = useState([]);

  useEffect(() => {
    if (props.post.image_url_type === "absolute") {
      SetImageUrl(BASE_URL + props.post.image_url);
    } else {
      SetImageUrl(props.post.image_url);
    }
  }, []);

  useEffect(() => {
    SetComment(props.post.comments);
  }, []);

  const CommentUpdateHandler = (event) => {
    SetComment(event);
  };

  // Handle Deletion of Post
  const DeleteHandler = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "GET",
      //for authorization at the backend, we need token_type and access_token to verify user.
      headers: new Headers({
        Authorization: props.Token_Type + " " + props.Access_Token,
      }),
    };

    fetch(`http://127.0.0.1:8000/post/delete/${props.post.id}`, requestOptions)
      .then((res) => {
        if (res.ok) {
          window.location.reload();
        }
        props.OpenErrorHandler();
        throw res;
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {props.error && (
        <AlertModel
          title="Not Authorized !!!"
          message="Please you didn't create this post"
          CloseErrorHandler={props.CloseErrorHandler}
        />
      )}

      {
        <div className="post">
          <div className="post_header">
            <div className="post_header_item">
              <img className="profile" src="{profile}" alt="profile_pics" />
              <strong>
                <em>{props.post.user.username}</em>
              </strong>
            </div>
            <div>
              <Button className="delete" onClick={DeleteHandler}>
                Delete
              </Button>
            </div>
          </div>
          <img className="post_image" src={imageUrl} alt="post_image" />
          <h4 className="post_text">{props.post.caption}</h4>
          <div className="post_comments">
            {comments.map((comment) => {
              return <Comment key={comment.id} comment={comment} />;
            })}
          </div>
          {props.Access_Token && (
            <CommentInput
              Access_Token={props.Access_Token}
              Token_Type={props.Token_Type}
              username={props.username}
              post_id={props.post.id}
              comments={CommentUpdateHandler}
            />
          )}
        </div>
      }
    </>
  );
};

export default Post;
