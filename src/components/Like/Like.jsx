import React from "react";


const Like = (props) => {
  return (
    <div>
      <span>
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
