import React, { useState } from "react";
import styles from "./register.module.css";
import { Link } from 'react-router-dom'
import authServices from '../../Services/authServices'
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState();
  const [msg, setMsg] = useState('')
  let navigate = useNavigate();
  
  const submitBtnHandler = async () => {
    try {
      if(name.includes('dog')){
        setMsg('Invalid Username')
        return;
      }
      
      if(!email || !password || !phone || !name){
        setMsg('All Fields Required')
        return
      }
      
      let data = await authServices.register({ name, password, phone, email })
      localStorage.setItem("lesson", "1");
      localStorage.setItem("sid", data.uid);
      setMsg('')
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
      setMsg("Invalid Username")
    }
  }
    return (
    <div className={styles.login_wrapper}>
      <div className={[styles.wrapper, "custom_scrollBar"].join(" ")}>
        <div>
          <h1>Please Register</h1>
          <h5 style={{ marginBottom: "10px" }}>Please register to continue.</h5>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          <Link to='/login'>
            <div className={styles.btn}> Login</div>
          </Link>
          <Link to='/register' >
            <div className={styles.btn}> Sign Up</div>
          </Link>
        </div>

        <div className={styles.creds} >
          <label>
            <p>Username</p>
            <input type="text" onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            <p>Email</p>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label>
            <p>Phone</p>
            <input type="text" onChange={(e) => setPhone(e.target.value)} />
          </label>
          <div style={{textAlign:'center', color:'red', marginBottom:'10px', fontWeight:'600'}}>{msg}</div>
          <div>
            <div className={styles.btn} onClick={submitBtnHandler}>Submit</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
