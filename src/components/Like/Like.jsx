import React from "react";



const Like = (props) => {
  return (
    <div>
      <span className="like_text">
        {props.like.total === 0 ? (
          <p>No likes yet</p>
        ) : props.like.total === 1 ? (
          <p>{props.like.total} like</p>
        ) : (
          <p> {props.like.total} likes</p>
        )}
      </span>
    </div>
  );
};

export default Like;
