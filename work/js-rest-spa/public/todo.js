"use strict";
(function iife() {
  // We store these as an object because we will access by id
  let stateTodos = {};

  //const listEl = document.querySelector('.todos');
  const inputElement = document.querySelector(".todos .to-add");
  const inputBtn = document.querySelector(".todos .add-btn");
  // These messages are incomplete and just to demonstrate the technique
  // you will have to expand to cover your scenarios!
  const MESSAGES = {
    networkError: "Trouble connecting to the network.  Please try again",
    default: "Invalid Username!! Please enter a valid username",
  };

  checkForSession();
  addAbilityToLogin();
  addAbilityToLogout();
  // addAbilityToRefresh();
  // addAbilityToToggleComplete();
  // addAbilityToAddTodo();
  // addAbilityToRemoveTodo();

  /////////////////////////////////
  function setLoggedIn(isLoggedIn) {
    // Notice how more complicated this is because we're not basing this off of state data
    // Not just here, but in the places we have to change our login status
    const loginEl = document.querySelector("main");
    if (isLoggedIn) {
      loginEl.classList.remove("not-logged-in");
      loginEl.classList.add("logged-in");
    } else {
      loginEl.classList.add("not-logged-in");
      loginEl.classList.remove("logged-in");
    }
  
    render();
    renderStatus("");

    
    
  }

  function renderOnLogin(todos) {
    stateTodos = todos;
    setLoggedIn(true);
    

   }

  function checkForSession() {
    fetchSession()
      .then(populateTodos)
      .catch(() => setLoggedIn(false));
  }

  function addAbilityToLogin() {
    const buttonEl = document.querySelector(".login button");
    const usernameEl = document.querySelector(".login__username");
    buttonEl.addEventListener("click", (e) => {
      const username = usernameEl.value;
      fetchLogin(username)
        .then(renderOnLogin)
        .catch((error) => renderStatus(error));
    });
  }

  
  function addAbilityToLogout() {
    const buttonEl = document.querySelector(".logout");
    buttonEl.addEventListener("click", (e) => {
      stateTodos = {};
      fetchLogout()
        .then(() => setLoggedIn(false))
        .catch((error) => renderStatus(error));
    });
  }

  function populateTodos() {
    fetchTodos()
      .then((rawTodos) => {
        stateTodos = rawTodos;
        setLoggedIn(true);
       
        render();
        renderStatus("");
      })
      .catch((error) => {
        renderStatus(error);
      });
  }

  /* Adding event handler in items list on + button and calling PUT api for increasing the quantity by 1 */
  function addAbilityToAddTodo() {
   
    
    const id = Object.keys(stateTodos)

    const quantity = stateTodos[id].quantity + 1;
    let body = {
      id: id,
      quantity: quantity}

    fetch(`/api/todos/edit`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch(() => Promise.reject({error: 'network-error'}))
    .then(res =>{
      return res.json();
    })      
    .then(rawTodos => {
          
            stateTodos = rawTodos;
        setLoggedIn(true);
        render();
        const id = Object.keys(stateTodos)
      if(stateTodos[id].quantity >= 1){

      
      document.getElementById("decrease-button").disabled = false;}
           // render(stateTodos);
            renderStatus('');
          })
          .catch(err => {
            console.log("error");
            renderStatus(MESSAGES[err.error] || err.error);
          });
        
    
  }

  
  
  function addAbilityToRemoveTodo() {
  const id = Object.keys(stateTodos)
  const quantity = stateTodos[id].quantity -1;
    let body = {
      id: id,
      quantity: quantity}
 

  fetch(`/api/todos/edit`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).catch(() => Promise.reject({error: 'network-error'}))
  .then(res =>{
    return res.json();
  })      
  .then(rawTodos => {
          stateTodos = rawTodos;
      setLoggedIn(true);
      render();
    
          renderStatus('');
        })
        .catch(err => {
          console.log("error");
          setLoggedIn(true);
      render();
      
          renderStatus(MESSAGES[err.error] || err.error);
        });
      
  
}

  

  function addAbilityToToggleComplete() {
    const listEl = document.querySelector(".todos");
    listEl.addEventListener("click", (e) => {
  
      if (!e.target.classList.contains("todo__toggle")) {
        return;
      }

      const id = e.target.dataset.id;
    
      fetchUpdateTodo(id, { done: !stateTodos[id].done })
        .then((todo) => {
          stateTodos[id] = todo;
          render();
          renderStatus("");
        })
        .catch((err) => {
          renderStatus(err);
        });
    });
  }

  function addAbilityToRefresh() {
    const buttonEl = document.querySelector(".refresh");
    buttonEl.addEventListener("click", () => {
      populateTodos();
    });
  }

  
  function fetchUpdateTodo(id, todoUpdates) {
    return fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify(todoUpdates),
    })
      .catch(() => Promise.reject({ error: "networkError" }))
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response
          .json()
          .catch((error) => Promise.reject({ error }))
          .then((err) => Promise.reject(err));
      });
  }

  function fetchTodos() {
    return fetch("/api/todos")
      .catch(() => Promise.reject({ error: "networkError" }))
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response
          .json()
          .catch((error) => Promise.reject({ error }))
          .then((err) => Promise.reject(err));
      });
  }

  function fetchSession() {
    return fetch("/api/session", {
      method: "GET",
    })
      .catch(() => Promise.reject({ error: "networkError" }))
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response
          .json()
          .catch((error) => Promise.reject({ error }))
          .then((err) => Promise.reject(err));
      });
  }

  function fetchLogout() {
    return fetch("/api/session", {
      method: "DELETE",
    })
      .catch(() => Promise.reject({ error: "networkError" }))
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response
          .json()
          .catch((error) => Promise.reject({ error }))
          .then((err) => Promise.reject(err));
      });
  }

  function fetchLogin(username) {
    return fetch("/api/session", {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify({ username }),
    })
      .catch(() => Promise.reject({ error: "networkError" }))
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response
          .json()
          .catch((error) => Promise.reject({ error }))
          .then((err) => Promise.reject(err));
      });
  }

  var increaseButton = document.getElementById("increase-button");
  increaseButton.addEventListener("click", addAbilityToAddTodo);

  var decreaseButton = document.getElementById("decrease-button");
  decreaseButton.addEventListener("click", addAbilityToRemoveTodo);
  
  

  function render({ add } = {}) {
  
    const loginEl = document.querySelector("main");
    if (loginEl.classList=="logged-in"){
      const id = Object.keys(stateTodos)
      if(stateTodos[id].quantity == 0){
      document.getElementById("decrease-button").disabled = true;}
    }
    
    const html = Object.values(stateTodos)
      .map((todo) => {
        const isDoneClass = todo.done ? "todo__text--complete" : "";
        const isAddedClass = add === todo.id ? "todo__text--added" : "";
        return `
      
        <label class="todo"
        >
         
          <span
            data-id="${todo.id}"
            class="todo__toggle todo__text ${isDoneClass} ${isAddedClass} "
          >
            ${todo.quantity}
          </span>
        </label>
        
     
      `;
      })
      .join("");
    const todosEl = document.querySelector(".todos");
    todosEl.innerHTML = html;
  }

  function renderStatus(message) {
    const statusEl = document.querySelector(".status");
    if (!message) {
      statusEl.innerText = "";
      return;
    }
    const key = message?.error ? message.error : "default";
    statusEl.innerText = MESSAGES[key] || MESSAGES.default;
  }
})();
