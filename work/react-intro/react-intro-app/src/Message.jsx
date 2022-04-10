import compare from './compare';
import './style.css';

const Message = ({guessWord}) => {
    const secretWord = "RECAT";
    const wordLength = 5;
    const getMessage = () => {
        if(guessWord.length === 0){
            return "Please enter your guess!";
        }
        if(guessWord.toLowerCase() === secretWord.toLowerCase()){
            return guessWord.concat(" is the secret word!");
        }
        if(guessWord.length !== wordLength){
            return guessWord.concat(" was not a valid word!");
        }

        const commonLetters = compare(guessWord, secretWord);
        return guessWord.concat(" had ", commonLetters, " letters in common");

    };
    return (
        <div className='msg'>
            <p>{getMessage()}</p>
        </div>
    );
};

export default Message;