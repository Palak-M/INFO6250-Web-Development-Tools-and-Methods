import React, { useState, useEffect } from "react";
import App from "../../components/Webcam.js/App";
import styles from './quiz.module.css'
import { Link, useNavigate } from "react-router-dom";
import arrow from '../Assets/arrow-right.png'
import l1 from '../Assets/l1.png'
import l2 from '../Assets/l2.png'
import l3 from '../Assets/l3.png'
import tick from '../Assets/Tick.png'

const Quiz = () => {
  let navigate = useNavigate()
  const [ans, setAns] = useState(false)
  let quiz = [
    { ques: "What is the sign for 'I Lo ve You'?", qImg: l1, ans: 3 },
    { ques: "What is the sign for 'I Love You'?", qImg: l1, ans: 3 },
    { ques: "What is the sign for 'Hello'", qImg: l2, ans: 1 },
    { ques: "What is the sign for 'No'", qImg: l3, ans: 5 }
  ];
  const [idx, setIdx] = useState(1);
  useEffect(() => {
    let index = localStorage.getItem("lesson");
    if (idx) {
      let tempIdx = Number(index);
      tempIdx = tempIdx > 3 ? 1 : tempIdx
      setIdx(1);
    }
  }, [])

  const setIdxAtLocal = (idx) => {
    const tempIdx = idx === 4 ? 1 : idx
    setIdx(tempIdx)
    localStorage.setItem("lesson", JSON.stringify(tempIdx))
  }

  return (
    <div>
      <div className={styles.progressWrapper}>
        <div className={styles.crossBtn}>
          <Link to='/dashboard'>
            <i className="fas fa-times"></i>
          </Link>
        </div>
        <div className={styles.bars}>
          <div className={[styles.bar, styles.blue].join(" ")} onClick={() => { setIdxAtLocal(1); setAns(false) }}></div>
          <div className={[styles.bar, idx > 1 ? styles.blue : styles.grey].join(" ")} onClick={() => { setIdxAtLocal(2); setAns(false) }}></div>
          <div className={[styles.bar, idx > 2 ? styles.blue : styles.grey].join(" ")} onClick={() => { setIdxAtLocal(3); setAns(false) }}></div>
        </div>
      </div>
      <div className={styles.lessonWrapper}>
        <div className={styles.heading}>
          <img src={quiz[idx].qImg} />
          <h1>{quiz[idx].ques}</h1>
        </div>
      </div>
      <App QIDX={quiz[idx].ans} ans={ans} setAns={setAns} />
      <div className={styles.btns}>
        <div className={styles.skipBtn} onClick={() => setIdxAtLocal(idx + 1)}>

          {ans ?
            <>
              <img src={tick} style={{ width:'60px', height:'60px', borderRadius:'50%', marginRight: "10px" }} />
              Good Job
            </>
            : null}
        </div>
        {idx < 3 ?
          <div className={styles.nextBtn} onClick={() => {
            setIdxAtLocal(idx + 1)
            setAns(false)
          }}>
            Next <img src={arrow} />
          </div>
          :
          <div className={styles.nextBtn} onClick={() => {
            setIdxAtLocal(idx + 1)
            navigate("/dashboard");
          }}>
            Finish <img src={arrow} />
          </div>
        }
      </div>
    </div>
  );
};

export default Quiz;
