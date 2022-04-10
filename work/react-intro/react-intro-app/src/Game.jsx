import { useState } from 'react';
import './style.css';
import Message from './Message';

const Game = () =>{
    const[text, setText] = useState('');
    const update = (e) => setText(e.target.value);
    const[guessWord, setGuessWord] = useState('');
    return(
        <div className="game">
            <div className="title-name">
                <h1>Guess Game</h1>
            </div>
           
            <div className="control">
                <input onChange={update} value = {text}/>
                <button onClick={() => {setGuessWord(text); setText('');} } disabled = {text.length === 0}>Guess</button>
                <button onClick={() => {setGuessWord('');}}>Restart</button>
            </div>
            <Message guessWord = {guessWord}/>
        </div>
    );
};

export default Game;