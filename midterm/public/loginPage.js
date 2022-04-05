let loginbtn = document.querySelector(".loginbtn");
      let input = document.querySelector("input");
      let msg = document.querySelector(".loggedin p");
      input.addEventListener("input", (e) => {
        let val = e.target.value;
        if (!val) {
            loginbtn.disabled = true; 
            loginbtn.style.cursor = 'not-allowed'
        }else{
            loginbtn.style.cursor = 'pointer'
           loginbtn.disabled = false; 
        }
      });
      