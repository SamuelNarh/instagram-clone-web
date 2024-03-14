import React,{useState} from "react";
import './Header.css'
import Button from "../UI/Button/Button";

const Header = () => {

    const [openSignIn,SetOpenSignIn] = useState(false)
    const [openSignUp, SetOpenSignUp] = useState(false);

    const SignIn=()=>{
        SetOpenSignIn(true)
    }
    const SignUp=()=>{
        SetOpenSignUp(true)
    }

  return (
    <div className="header">
      <div className="header-app">
        <img className="header_image" src="" alt="instagram logo" />
      </div>
      <div>
        <Button className='login' onClick={SignIn}>Login</Button>
        <Button onClick={SignUp}>SignUp</Button>
      </div>
    </div>
  );
};

export default Header;
