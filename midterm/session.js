const words = require('./words');
const compare = require('./compare');

const userSession = {};

const sessionDetails ={
    userSession,
    isValid,
    addUser,
    getUserData,
    addWord,
    getChances,
    wordguess,
    getWordList,
    getMatchedCharacter,
    getMessage,
    restartGame,
};

function isValid(sid){
    if(userSession[sid]){
        return true;
    }
    return false;
};

function addUser(sid, name){
    for(const storedID in userSession){
        if(userSession[storedID].username === name){
            userSession[sid] = userSession[storedID];
            delete userSession[storedID];
            return;
        }
    }
    userSession[sid] = {username:name};
    restartGame(sid);
};



function getUserData(sid){
    return userSession[sid];
};

function addWord(sid, word){
    userSession[sid].wordGuesses.push({
        guessedWord : word,
        numberOfCharactersMatch : compare(words[userSession[sid].wordID].toUpperCase(), word.toUpperCase()),
    });
};

function getChances(sid){
    return getUserData(sid).chances;
};

function wordguess(sid, guessedWord){
    if(!words.map(function (word){
        return word.toUpperCase()
    }).includes(guessedWord.toUpperCase())){
        userSession[sid].message = "Invalid Word: " + "<strong>" + guessedWord + "</strong>. Please use words from Secret Word List only !!";
        return false;
    }
    addWord(sid, guessedWord);
    if(userSession[sid].wordGuesses[userSession[sid].wordGuesses.length-1].numberOfCharactersMatch > 0){
        userSession[sid].chances++;
    }

    if(words[userSession[sid].wordID].toUpperCase() === guessedWord.toUpperCase()){
        userSession[sid].message="You have won the game with "+ "<strong>" + userSession[sid].chances+ "</strong> guesses!! Click on restart to start a new game!";
        return true;
    }
    userSession[sid].message = "Make a new Guess!";
    return false;
}

function restartGame(sid){
    const newWord=Math.floor(Math.random()*words.length);
    console.log("Secret word: " +words[newWord]);
    const name = userSession[sid].username;
    userSession[sid] = {username : name, chances: 0, wordGuesses:[], message:"", numberOfCharactersMatch:0, wordID: newWord};
};

function getWordList(sid){
    return words;
}

function getMatchedCharacter(sid){
    return userSession[sid].numberOfCharactersMatch;
}

function getMessage(sid){
    return userSession[sid].message;
}

module.exports = sessionDetails;