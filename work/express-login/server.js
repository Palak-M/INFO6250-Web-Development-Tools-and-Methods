const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;
const uuidv4 = require('uuid').v4;

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('./public'));

const sessions = {};
const storeData = {};

app.get('/',(req,res) =>{
    const sid = req.cookies.sid;
    if(sid && sessions[sid]){
        const username = sessions[sid].username;
        const data = storeData[username];
        res.send(`
            <link rel="stylesheet" type="text/css" href="/expresslogin.css"/>
            <div class = "login">
            <i class = "user-login">You are logged in as <b>${username}</b></i><br>
            <span class = "datastorage">Stored word is ${data}</span>
            </div>
            <form action="/datasaved" method="POST" class="data-saved">
            Enter information: <input name="information">
            <button type="Submit">Update information</button>
            </form>

            <form action="/logout" method="POST" class="logout">
            <button type="Submit">Logout</button>
            </form>
            `);   
            return;     
    }
    res.send(`
        <link rel="stylesheet" type="text/css" href="/expresslogin.css"/>
        
        <div class = "loginBox">
        <img src="icons8-login-100.png" class="logo">
        <h1>Login Form</h1>
        <form action = "/login" method = "POST" class="name">
        Username: <input name = "username">
        <p><button type = "submit"> Login</button></p>
        </form>
    
        </div>
        `);
});


app.post("/login", (req, res) => {
    const username = req.body.username.trim();
    const numberOrLetter = /^[0-9a-zA-Z]+$/i;
    const valid =username.match(numberOrLetter);
    if (username === "dog" || !username || username != valid) {
      res.status(403).send(
        `<link rel="stylesheet" type="text/css" href="/expresslogin.css"/>
        <div class = "login">
                 
                  <p>Invalid username! Please enter a valid username.</p>
                  <a href='/'>Return to Login Page</a>
                  </div>`
      );
      return;
    }
    const sid = uuidv4();
    sessions[sid] = {username};
    res.cookie('sid', sid);
    res.redirect('/');
});


app.post('/logout',(req, res) =>{
    const sid = req.cookies.sid;
    delete sessions.sid;
    res.cookie('sid', null);
    res.redirect('/');
});

app.post('/datasaved',(req, res) =>{
    const data = req.body.information.trim();
    const sid = req.cookies.sid;
    if(!sid || !sessions[sid]){
        res.status(401).send(
            'Information saved'
            );
        return;
    }

    const username = sessions[sid].username;
    storeData[username] = data;
    res.redirect('/');
});


app.listen(PORT,() => console.log(`Listening on ${PORT}`));