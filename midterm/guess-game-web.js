const guessWordweb = {
    gamePage: function(sid, sessionDetails, words){
        return `
        <!doctype html>
        <html>
        <head>
        <link rel = "stylesheet" href = "/guess-word.css">
        <title>Word Guess Game</title>
        </head>
        
        <body>
            <div id="guess-word-game">
                <div class="homepage">
                    <h2>Word Guessing Game</h2>
                    <h3>Welcome <i>${sessionDetails.getUserData(sid).username}</i></h3>
                </div>

            <div class="gamepage">
                <div class="words-set">
                    <h3>Secret Word List</h3>
                    <div class="list-of-words"> ${guessWordweb.getList(sessionDetails.getWordList())}
                    </div>
                </div>
            
            <div class="valid-words">
                <h3>History and Letter Count of Accepted Guesses</h3>
                <div class="list-of-words"> ${guessWordweb.getList(sessionDetails.getUserData(sid).wordGuesses.map(
                    (matchedWordCount) => `<p>${matchedWordCount.guessedWord} / ${matchedWordCount.numberOfCharactersMatch}</p>`
                ))}
                </div>

                <div class="chances">
                <b> Valid guesses: ${sessionDetails.getChances(sid)}</b>
                </div>
            </div>

            <div class="input-panel">
                <h3>Guess a word</h3>
                <div class="input-word"> ${guessWordweb.guessWord()} </div>
                <div class="new-function">
                    <div class="restart">${guessWordweb.restart()}</div>

                <div class="logout">
                    <form action="/logout" method="POST">
                    <button class="logoutbtn" type="submit">LOGOUT</button>
                    </form>
                </div>
                </div>
            
            <div class="message-area">${sessionDetails.getMessage(sid)}</div>
            </div>
            </div>
            </div>
            
            <script>
            
            let words = ${JSON.stringify(sessionDetails.getWordList())}  
          </script>
          <script src="/game.js">
          </script>
        </body>
        </html>
        `;
    },
    loginPage: function(){
        return `
        <!doctype html>
        <html>
        <head>
            <link rel="stylesheet" href="/guess-word.css">
            <title>Login Game</title>
        </head>
        <body>
        <div class='wrapper'>
        <div class="login-panel">
      <div id="login-form" class="login-details">
        <form action="/login" method="POST">
          <div class="homepage">
            <h2>Word Guessing Game</h2>
          </div>

          <div class="input-area" id="user-details">
            <input name="username" placeholder="Enter your username" />
            <div class="loggedin">
              <button disabled class="loginbtn" type="submit">LOGIN</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
    <script src = "/loginPage.js">
      
    </script>
  </body>
        </html>`;
    },
    loginPageInvalidUserName: function(){
        return `
        <!doctype html>
        <html>
        <head>
            <link rel="stylesheet" href="/guess-word.css">
            <title>Login Game</title>
        </head>
        <body>
        <div class='wrapper'>
        <div class="login-panel">
      <div id="login-form" class="login-details">
        <form action="/login" method="POST">
          <div class="homepage">
            <h2>Word Guessing Game</h2>
          </div>

          <div class="input-area" id="user-details">
            <input name="username" placeholder="Enter your username" />
            <div class="loggedin">
              <button disabled class="loginbtn" type="submit">LOGIN</button>
              <div>
                <p>Invalid username! Please enter a valid username.</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
    <script src = "/loginPage.js">
      
    </script>
  </body>
        </html>`;
    },
    getList: function(list){
        return ` 
        <ul class="words">` + list.map(word =>
        `<li>
            <div class="word">
                <span class="word">${word}</span>
            </div>
        </li>        
        `).join('') + `</ul>`;
    },
    guessWord: function(){
        return `
            <form action= "/guess" method="POST">
                <input name="word" class='inputword' placeholder="Enter your guessed word">
                <button class="submitbtn" disabled type="submit">SUBMIT</button>
                <p style='display:none;'>Invalid word! Please Enter word from secret word List.</p>
            </form>`;
    },
    restart: function(){
        return `
        <form action="/restart" method="GET">
        <button class="resbtn" type="submit">RESTART</button>
        </form>`;
    },
};

module.exports = guessWordweb;