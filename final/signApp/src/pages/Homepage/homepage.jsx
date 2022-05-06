import React from "react";
import { Link, useLocation } from "react-router-dom";
import authServices from "../../Services/authServices";
import style from "./homepage.module.css";

const Homepage = () => {
  let pathname =  useLocation().pathname;
  let [user, setUser] = React.useState();
  let sid = localStorage.getItem('sid');
  React.useEffect(async () => {
    if (!sid) {
      setUser(undefined);
      return
    }
    try {
      const data = await authServices.getUser({ sid });
      setUser(data.sender)
    } catch (err) {
      setUser(undefined)
      console.log(err)
    }
  }, [pathname])
  return (
    <>
      <div className={style.homepageWrapper}>
        <div className={style.info}>
          <div className={style.heading}>
            Make your children learn ASL with SignApp
          </div>
          <div className={style.text}>
            SignApp is an e-learning ASL tool for your kids. You can earn badges and prizes after completing
            lessons and quizzes.
          </div>
          <Link to={(user) ? "/dashboard" : "/login"}>
            <div className={style.btn}>Let's Start</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Homepage;
