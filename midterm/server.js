const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;
const uuidv4 = require('uuid').v4;
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('./public'));

const guessWord = require('./guess-game-web');
const sessionDetails = require('./session');
const { loginPageInvalidUserName } = require('./guess-game-web');


app.get('/', (req,res) => {
    const sid = req.cookies.sid;
    if(!sid || !sessionDetails.isValid(sid)){
        res.send(guessWord.loginPage());
        return;
    }
    res.send(guessWord.gamePage(sid,sessionDetails));
});


app.post('/login', (req, res) => {
    const username = req.body.username.trim();
    const numberOrLetter = /^[0-9a-zA-Z]+$/i;
      const valid =username.match(numberOrLetter);
      if (username === "dog" || !username || username != valid) {
        res.status(403).send(
          loginPageInvalidUserName()
        );
        return;
      }
    const sid = uuidv4();
    res.cookie('sid', sid);
    sessionDetails.addUser(sid, username)
    res.redirect('/');
  });


app.post('/guess', (req, res) => {
    const sid = req.cookies.sid;
    const word = req.body.word.trim();
    sessionDetails.wordguess(sid, word);
    res.redirect('/');
});

app.get('/restart', (req, res) =>{
    const sid = req.cookies.sid;
    sessionDetails.restartGame(sid);
    res.redirect('/');
});

app.post('/logout',(req, res) =>{
    const sid = req.cookies.sid;
    // delete sessionDetailssid;
    // res.cookie('sid', null);
    res.clearCookie('sid');
    res.redirect('/');
});

app.listen(PORT,() => console.log(`Listening on ${PORT}`));