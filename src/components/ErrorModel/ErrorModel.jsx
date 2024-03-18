import React from "react";
import "./ErrorModel.css";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

const ErrorModel = (props) => {
  return (
    <Card className="Error">
      <div>
        <div className="backdrop" />
        <Card className="modal">
          <header className="header">
            <h2>Wrong Information</h2>
          </header>
          <div className="content">
            <p>You need to provide correct credentials to login</p>
          </div>
          <footer className="actions">
            <Button onClick={CloseError}>Okay</Button>
          </footer>
        </Card>
      </div>
    </Card>
  );
};

export default ErrorModel;
