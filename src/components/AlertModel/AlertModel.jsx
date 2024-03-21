import React from "react";
import "./AlertModel.css";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

const AlertModel = (props) => {
  return (
    <>
      <div className="backdrop" onClick={props.CloseErrorHandler} />
      <Card className="modal">
        <header className="header">
          <h3>{props.title}</h3>
        </header>
        <div className="content">
          <p>{props.message}</p>
        </div>
        <footer className="actions">
          <Button className="login" onClick={props.CloseErrorHandler}>Okay</Button>
        </footer>
      </Card>
    </>
  );
};

export default AlertModel;
