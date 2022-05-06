import React, { useState } from "react";
import styles from "./login.module.css";
import { Link } from 'react-router-dom'
import authServices from '../../Services/authServices'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [msg, setMsg] = useState('')
  let navigate = useNavigate();

  const submitBtnHandler = async () => {
    try {
      if (email.includes('dog')) {
        setMsg('Invalid Username')
        return;
      }
      if (!email || !password) {
        setMsg('All Fields Required')
        return
      }
      
      let data = await authServices.register({ password, name: email })
      let val = await authServices.getData({ sid: data.uid })
      console.log(val)
      localStorage.setItem('done0', val.done0)
      localStorage.setItem('done1', val.done1)
      localStorage.setItem('lesson', val.lesson)
      localStorage.setItem('lessonIdx', val.lessonIdx)
      localStorage.setItem('val', JSON.stringify(val));

      setMsg('')
      localStorage.setItem('sid', data.uid)
      navigate('/dashboard')
    } catch (err) {
      setMsg('Invalid Username')
      console.log(err)
    }
  }

  return (
    <div className={styles.login_wrapper}>
      <div className={styles.wrapper}>
        <div>
          <h1>Please Log In</h1>
          <h5 style={{ marginBottom: "10px" }}>Please login to continue.</h5>
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
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
          </label>
          <div style={{ textAlign: 'center', color: 'red', marginBottom: '10px', fontWeight: '600' }}>{msg}</div>
          <div>
            <div className={styles.btn} onClick={submitBtnHandler}>Submit</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
