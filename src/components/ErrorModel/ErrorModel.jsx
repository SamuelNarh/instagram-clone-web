import React from "react";
import "./ErrorModel.css";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

const ErrorModel = (props) => {
  return (
    <>
      <div className="backdrop" onClick={props.closeError} />
      <Card className="modal">
        <header className="header">
          <h3>Wrong Information</h3>
        </header>
        <div className="content">
          <p>You need to provide correct credentials to login</p>
        </div>
        <footer className="actions">
          <Button onClick={props.closeError}>Okay</Button>
        </footer>
      </Card>
    </>
  );
};

export default ErrorModel;
