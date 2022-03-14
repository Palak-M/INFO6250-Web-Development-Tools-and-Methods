"use strict";
(function iife() {

const items =[
    {
        name:'pen',
        quantity: 0,
    },
    {
      name:'pencil',
      quantity: 2,
    },
];

  // We use these elements a few places, so grab them once
  // This is safe because we never replace these elements
  const listEl = document.querySelector('#store-inventory-app .items');
  const inputEl = document.querySelector('#store-inventory-app input');
  const buttonEl = document.querySelector('#store-inventory-app button');

  // These setup functions are just to make this easier to read
  disableButtonIfNoInput();
  addAbilityToAddItems();
  addAbilityToDeleteItems();
  addAbilitytoIncreaseQuantity();
  addAbilitytoDecreaseQuantity();

  render(items); 

  function render( items ) {
    const html = items.map( (item, index) => {
      return `
        <li class='inventory'>
        <div class='name-delete'>
          
          <span class='name' data-index='${index}'>${item.name}</span>
         </div>
        
         <div class = 'quantity-info'>
         <button class='subtract' data-index='${index}'> - </button>
         <span class='quantity' data-index='${index}'>${item.quantity}</span>
         <button class='add' data-index='${index}'> + </button>
         
         </div>
         <div class='delbtn'>
         <button class ='delete' data-index='${index}'>X </button>
         </div>
        </li>
      `;

    }).join('');

  
    listEl.innerHTML = html;

    document.querySelectorAll('#store-inventory-app .items .subtract').forEach(
      (subtbtn) => {subtbtn.disabled = items[subtbtn.dataset.index].quantity <= 0;
      });


    buttonEl.disabled = !inputEl.value;
  }


 
  function disableButtonIfNoInput() {
    // Disable button if no text in input field
    inputEl.addEventListener('input', () => {
      buttonEl.disabled = !inputEl.value;
    });
  }

  function addAbilityToAddItems() {
    buttonEl.addEventListener('click', (e) => {
      // Add new item to state
      const newTodo = {
        name: inputEl.value,
        quantity: 0,
      };
      items.push(newTodo);
      // clear the input
      inputEl.value = '';
      // update the HTML
      render(items);
    });
  }

  function addAbilityToDeleteItems() {
    listEl.addEventListener('click', (e) => {
      // This could be done in the other listEl click handler
      // Here it is separate so the logic is less complex

      if(!e.target.classList.contains('delete')) {
        return;
      }

      const index = e.target.dataset.index; // read data-index from the element
      items.splice(index, 1); // remove the indicated element from list
      render(items);
    });
  }

  function addAbilitytoIncreaseQuantity(){
    listEl.addEventListener('click', (e) =>{
      if(!e.target.classList.contains('add')){
        return;
      }
      const index = e.target.dataset.index;
      items[index].quantity++;
      render(items);
    });
  }

  function addAbilitytoDecreaseQuantity(){
    listEl.addEventListener('click',(e) => {
      if(!e.target.classList.contains('subtract')){
        return;
      }
      const index = e.target.dataset.index;
      items[index].quantity--;
      render(items);

    });
  }


})();