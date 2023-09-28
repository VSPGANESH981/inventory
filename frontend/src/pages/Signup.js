import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/custom.css'
import { INVENTORY_API } from '../constants/constants';

const Signup = (props) => {

    const handleSignUp = async(event) => {
        event.preventDefault();
        const username = props.username.trim();
        const password = props.password.trim();
        if (username.length === 0 || password.length === 0) {
          props.errorMessage('Username and Password is required');
        } else {
            props.isLoading(true);
            const res = await fetch(`${INVENTORY_API}/signup`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "username":username,"password":password}),
              });
              if(res.ok){
                props.errorMessage('');
                props.successMessage();
                props.setLogin(true);
            } else {
              props.errorMessage('Something Went Wrong');
            }
            props.isLoading(false);
        }
      }

  return (
    <button className="btn btn-success mb-2" onClick={ handleSignUp }>Sign Up</button>
  )
}

export default Signup