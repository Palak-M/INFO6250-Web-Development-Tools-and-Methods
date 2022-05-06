import React from "react";
import styles from "./DashboardCard.module.css";
import { Link, useNavigate } from "react-router-dom";
import authServices from "../../Services/authServices";

function DashboardCard({ data ,idx}) {
  let navigate = useNavigate();
  let done = localStorage.getItem("done"+idx);

  return (
    <div className={styles.card} style={{ backgroundColor: data.bk }}>
      <div className={styles.front}>
        <h3>{data.name}</h3>
        <img alt="a" src={data.img} className={styles.bk_img} />
      </div>
      <div className={styles.back}>
        {done==1 && <div style={{textAlign:"center"}}>You have mastered this course!!</div>}
        <div className={styles.subHead} onClick={() => {
          let val = localStorage.getItem('val');
          val = JSON.parse(val);
          
          if (localStorage.getItem("lessonIdx") != `${idx}`) {
            localStorage.setItem('lesson', '0')
            val.lesson = 0;
          }
          localStorage.setItem("lessonIdx", idx)
          val.lessonIdx = idx;
          
          let sid = localStorage.getItem('sid');
          localStorage.setItem('val',JSON.stringify(val))
          authServices.changeData({sid, val})

          navigate('/lessons')
        }}>
          Take a Lesson
        </div>

        <div className={styles.subHead}>
          <Link to="/quiz">Take a Quiz</Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
