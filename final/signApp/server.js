const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 4000;
const session = require("./session");
const cors = require("cors");

app.use(cookieParser());
app.use(express.json());
app.use(cors())
app.use(express.static("./build"));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

const counter = () => {
    let count = 1;
    return () => {
        count += 1;
        return count;
    };
};
let storedData = {}
nextID = counter();

app.get("/session", (req, res) => {
    let sid = (req.query.sid)
    if (!sid) {
        res.status(401).json({ error: "login-required" });
        return;
    }
    if (!session.isValidSession(sid)) {
        res.status(403).json({ error: "session-invalid" });
        return;
    }
    res.status(200).json(session.users[sid]);
});

app.post("/session", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    const { username, email, phone } = req.body;
    const validUser = session.checkUserName(username);
    if (!validUser) {
        res.status(400).json({ error: "bad-login" });
        return;
    }
    const sid = session.addUser({ username, email, phone });
    if (!storedData[sid]) {
        storedData[sid] = {
            lessonIdx: 0,
            lesson: 0,
            done0: 0,
            done1: 0

        }
    }
    res.status(200).json(session.users[sid]);
});

app.delete("/session", (req, res) => {
    let sid = (req.query.sid)
    if (!sid || !session.users[sid]) {
        res.status(401).json({
            error: "login-required",
        });
        return;
    }
    if (!session.users[sid]) {
        res.clearCookie("uid");
        res.status(403).json({
            error: "login-invalid",
        });
        return;
    }
    res.clearCookie("sid");
    res.status(200).json({
        message: "Logout success!",
    });
});

app.get('/getData', (req, res) => {
    //console.log(storedData)
    let sid = (req.query.sid)
    if (!sid) {
        res.status(401).json({ error: "login-required" });
        return;
    }
    if (!session.isValidSession(sid)) {
        res.status(403).json({ error: "session-invalid" });
        return;
    }
    res.status(200).json(storedData[sid]);
})

app.post('/changeData', (req, res) => {
    let sid = (req.query.sid)
    //console.log(sid, req.body)
    if (!sid) {
        res.status(401).json({ error: "login-required" });
        return;
    }
    if (!session.isValidSession(sid)) {
        res.status(403).json({ error: "session-invalid" });
        return;
    }
    storedData[sid] = (req.body);
    //console.log(storedData)
    res.status(200).json(storedData[sid]);
})

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));