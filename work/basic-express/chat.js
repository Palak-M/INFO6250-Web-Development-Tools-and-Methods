const users = {
    "Amit": "Amit",
    "Bao": "Bao",
};

const messages = [
  {
    sender: "Amit",
    timestamp: new Date("2022-02-02  15:30:00"),
    text: "You up?",
  },
  {
    sender: "Bao",
    timestamp: new Date("2022-02-02  15:50:00"),
    text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
  }
];

function addMessage({ sender, timestamp, text }) {
  messages.push({sender,timestamp, text})
}

const chat = {
  users,
  messages,
  addMessage,
};

module.exports = chat;

