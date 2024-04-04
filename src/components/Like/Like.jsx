import React from "react";


const Like = (props) => {
  // props.LikeTotal(props.like.total);
  return (
    <div>
      <span className="like_text">
        {(props.count.total === 0 )? (
          <p>No likes yet</p>
        ) : (props.count.total === 1) ? (
          <p>{props.count.total} like</p>
        ) : (
          <p> {props.count.total} likes</p>
        )}
      </span>
    </div>
  );
};

export default Like;
