import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/custom.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth';


const Login = (props) => {
  const {login} = useAuth();
  const navigate = useNavigate();
  const handleLogin = async(event) => {
    event.preventDefault();
    const username = props.username.trim();
    const password = props.password.trim();
    if (username.length === 0 || password.length === 0) {
      props.errorMessage('Username and Password is required');
    } else {
        props.isLoading(true);
        const onSuccess = ()=>{
            props.errorMessage('');
            props.successMessage();
            navigate('/');
        }
        const onFailure = ()=>{
          props.errorMessage('Something Went Wrong');
        }
        await login(username,password,onSuccess,onFailure);
        props.isLoading(false);
    }
  }

  return (
    <div>
         <button className="btn btn-info mb-2" onClick={ handleLogin }>Log In</button>
    </div>
  )
}

export default Login