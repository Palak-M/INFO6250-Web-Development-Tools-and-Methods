const uuid = require("uuid").v4;
const users = {
    1: {
        sender: "Palak",
        uid: 1,
    },
    2: { 
        sender: "Mattoo", 
        uid: 2 },
};

function isExistingUser(username) {
    let found = false;
    console.log(users);
    users.forEach((user) => {
        if (user.sender === username) {
            found = true;
        }
    });
    return found;
}

function userExists(username) {
    const record = Object.values(users).find(
        (user) => user.sender === username
    );
    return record && record.uid;
}

const addUser = function ({username, email, phone}) {
    const oldId = userExists(username);
    const id = oldId || uuid();
    users[id] = { sender: username, uid: id, email, phone };
    return id;
};

const isValidSession = function (sid) {
    return users[sid];
};

const removeUser = function (sid) {
    delete users[sid];
};

const checkUserName = function (username) {
    if (!username) {
        return false;
    }
    if (!isValidUsername(username)) {
        return false;
    }
    return true;
};

const isValidUsername = function (username) {
    if (
        !username ||
        username.toLowerCase().includes("dog") ||
        username.includes(" ")
    ) {
        return false;
    }
    return true;
};

module.exports = {
    users,
    isExistingUser,
    checkUserName,
    removeUser,
    isValidSession,
    addUser,
};