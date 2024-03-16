import React from "react";
import "./ErrorModel.css";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

const ErrorModel = (props) => {

    const CloseError=() =>{
        props.closeError()
    }

  return (
    <Card className="Error">
      <header>Invalid Credentials</header>
      <footer>Please Enter a valid Name and Password</footer>
      <Button className='Errorbtn' onClick={CloseError} >Okay</Button>
    </Card>
  );
};

export default ErrorModel;
