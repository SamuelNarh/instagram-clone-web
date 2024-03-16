import React from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import './Forms.css'

const SignUp = () => {
  return (
    <div className="backdrop">
      <Card className="formcard">
        <form className="form">
          <label>
            <h3>SignUp</h3>
          </label>
          <input type="text" placeholder="Enter your Username" />
          <input type="email" placeholder="Enter your email" />
          <input type="password" placeholder="Enter your Password" />
          <Button className="lgbutton">SignUp</Button>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
