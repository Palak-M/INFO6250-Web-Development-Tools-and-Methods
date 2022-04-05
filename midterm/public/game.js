 
            let input = document.querySelector(".inputword");
            let btn = document.querySelector(".submitbtn");
            let msg = document.querySelector("form p");
            console.log(msg)
            input.addEventListener("input", (e)=>{
                e.preventDefault();
                let check = words.includes(e.target.value);
                console.log(check)
                if(check){
                  btn.disabled = false;
                  msg.style.display  = 'none'
                  btn.style.cursor = 'pointer'
                }else{
                    msg.style.display = 'block'
                    btn.disabled = true;
                    btn.style.cursor = 'not-allowed'
                }
            })