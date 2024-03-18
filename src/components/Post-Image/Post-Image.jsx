import React, { useState } from "react";
import "./Post-Image.css";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import Post from "../Post/Post";

const Image_url = (props) => {
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

    const imagedata = new FormData();
    imagedata.append("image", Image);

    const requestOptions = {
      method: "POST",
      //for authorization at the backend, we need token_type and access_token to verify user.
      headers: new Headers({
        Authorization: props.Token_Type + " " + props.Access_Token,
      }),
      body: imagedata,
    };

    fetch(`http://127.0.0.1:8000/post/image`, requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        console.log(data);
        //create our post
        createPost(data.filename);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        SetImage(null);
        SetCaption("");
        //this sets the image form to null
        document.getElementById("fileInput").value = null;
      });
    // create a Post function
    const createPost = (filename) => {
      const postdata = JSON.stringify({
        image_url: filename,
        image_url_type: "absolute",
        caption: Caption,
        creator_id: props.user_id,
      });

      const requestOptions = {
        method: "POST",
        //for authorization at the backend, we need token_type and access_token to verify user.
        headers: new Headers({
          Authorization: props.Token_Type + " " + props.Access_Token,
          "Content-Type": "application/json",
        }),
        body: postdata,
      };
      fetch(`http://127.0.0.1:8000/post`, requestOptions)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw res;
        })
        .then((data) => {
          console.log(data);
          <Post key={data.id} post={data}></Post>;
          window.location.reload();
          window.scrollTo(0, 0);
        })
        .catch((err) => {
          console.log(err);
        });
    };
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
