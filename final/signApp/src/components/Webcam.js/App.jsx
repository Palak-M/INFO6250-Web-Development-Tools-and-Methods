/*I have referred this link for implementing webcam functionality: https://github.com/Nigama-oss/Sign-language/blob/main/Template%20code/src/App.js
I have already discussed with Professor about using this.*/

import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";

function App({QIDX, ans, setAns}) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [animationInstance, setAnimationInstance] = useState(null)
  const [intervalInstance, setInervalInstance] = useState(null)
  const runCoco = async () => {
    const net = await tf.loadGraphModel(
      "https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json"
    );

    let instance = setInterval(() => {
      detect(net);
    }, 16.7);
    setInervalInstance(instance)
  };

  const detect = async (net) => {
   if(!canvasRef.current)return
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const img = tf.browser.fromPixels(video);
      const resized = tf.image.resizeBilinear(img, [640, 480]);
      const casted = resized.cast("int32");
      const expanded = casted.expandDims(0);
      const obj = await net.executeAsync(expanded);

      const boxes = await obj[1].array();
      const classes = await obj[2].array();
      const scores = await obj[4].array();

      if(!canvasRef.current)return
      const ctx = canvasRef.current.getContext("2d");

      let instance = requestAnimationFrame(() => {
        let TempAns = drawRect(
          boxes[0],
          classes[0],
          scores[0],
          0.8,
          videoWidth,
          videoHeight,
          ctx,
          1,
          QIDX,

        );
        if (!ans && TempAns) {
          setAns(TempAns)
        }
      });

      setAnimationInstance(instance);

      tf.dispose(img);
      tf.dispose(resized);
      tf.dispose(casted);
      tf.dispose(expanded);
      tf.dispose(obj);
    }
  };

  useEffect(() => {
    if(intervalInstance)clearInterval(intervalInstance);
    if(animationInstance)cancelAnimationFrame(animationInstance);
    console.log(QIDX)
    runCoco();
    return ()=>{
      setAnimationInstance(animationInstance => {
        cancelAnimationFrame(animationInstance);
        return null;
      })
      setInervalInstance(intervalInstance=>{
        clearInterval(intervalInstance);
        return null;
      })
    }
  }, [QIDX]);
  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            height: 280,
            borderRadius: "20px",
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            borderRadius: "20px",
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            height: 280,
          }}
        />
      </header>
    </div>
  );
}

export default App;
