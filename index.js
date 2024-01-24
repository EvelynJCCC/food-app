import menuArray from './data.js'


const modal = document.getElementById("modal");
const formEl = document.getElementById("card-details-form");


document.addEventListener('click', function(e) {
    if (e.target.dataset.addbtn) {
        handleAddButton(e.target.dataset.addbtn);
      
    }
    if (e.target.dataset.remove) {
        handleRemoveBtn(e.target.dataset.remove);
    }
    if (e.target.id === 'complete') {
        handleCompleteOrderBtn();
    }
       if (e.target.id === 'modal-close-btn') {
        
          modal.style.display = 'none';
          const allButtons = document.querySelectorAll('button');
          allButtons.forEach(button => {
          button.disabled = false;
          })
         
    }
});




function renderMenu(array) {
    return array.map(menuItemsProperties => {
        const {
            name,
            ingredients,
            id,
            price,
            image
            
             } = menuItemsProperties
            return `
    <div class="container">
        <div class="emoji">
            <img class="images" src=${image}></img>
        </div>
        <div class="items">
            <p class="text-element bold">${name}</p>
            <p class="text-element">${ingredients}</p>
            <p class="text-element smaller-browser-price">$${price}</p>
        </div>
        <div class="button-class">
            <button id="add" data-addbtn="${id}"> + </button>
        </div>
    </div>
    <hr>`
        }).join('')
}

     
    document.getElementById('food-container').innerHTML = renderMenu(menuArray)



let selectedItemsArr = JSON.parse(localStorage.getItem('selectedItems')) || [];
renderOrderedItems(selectedItemsArr);




function updateSelectedItemsAndRender(selectedItemsArr) {
    localStorage.setItem('selectedItems', JSON.stringify(selectedItemsArr));
    renderOrderedItems(selectedItemsArr);
}


function handleAddButton(buttonId) {
     const targetedObj = menuArray.filter(function(item){
        return item.id == buttonId
    })[0]
    
       if (targetedObj) {
        selectedItemsArr.push(targetedObj); // Push the entire object
  
    }
    
    document.getElementById('ordered-items-container').innerHTML = renderOrderedItems(selectedItemsArr);
    
    updateSelectedItemsAndRender(selectedItemsArr);

    

}

function renderOrderedItems(array) {
    const orderedItemsHTML = array.map(selectedItems => {
        const { name, id, price } = selectedItems;
        return `
            <div class="ordered-items">
               <div class="flex-container-removebtn-and-ordered-item">
                   <p class="bold" >${name}</p>
                   <button id="removeBtn" class="remove" data-remove="${id}">remove</button>
                <div class="price">
                  <p class="bold">$${price}</p>
                  </div>
              </div>
            </div>`;
    }).join('');

    const totalPrice = array.reduce((total, currentItem) => total + currentItem.price, 0);
       if (totalPrice == 0) {
             return document.getElementById('ordered-items-container').innerHTML = ""
             }
    return document.getElementById('ordered-items-container').innerHTML = `
    <h2> Your order </h2>
    <div>
         ${orderedItemsHTML}
 </div>
      <hr>
 <div class="total-price-container">
      <p class="bold total-price">Total Price: </p> 
      <p class="total-price-number bold"> $${totalPrice}</p>
</div>
<div class="complete-button-div">
      <button id="complete" class="complete-order"> Complete order </button> 
 </div>
    `;
 
    
}


function handleRemoveBtn(itemId) {
  
    const targetedObjIndex = selectedItemsArr.findIndex(item => item.id == itemId);

       if (targetedObjIndex !== -1) {
        const removedItem = selectedItemsArr.splice(targetedObjIndex, 1)[0];
        
         updateSelectedItemsAndRender(selectedItemsArr);
       
           const totalPrice = selectedItemsArr.reduce((total, currentItem) =>
            total + currentItem.price, 0);

         document.getElementById('ordered-items-container').innerHTML = renderOrderedItems(selectedItemsArr);
       
       
       }}
   
        
  
function handleCompleteOrderBtn() {
    const allButtons = document.querySelectorAll('button:not(.pay, .modal-close-btn');
    allButtons.forEach(button => {
        button.disabled = true;
        modal.style.display = 'inline'
    
    });


formEl.addEventListener('submit', function(event) {
    event.preventDefault()
    
    const formEl = document.getElementById('card-details-form')
    const loginFormData = new FormData(formEl)
    const name = loginFormData.get('name') 
     modal.style.display = 'none';
     const orderedItemsContainerHTML = document.getElementById("ordered-items-container").innerHTML = `<div class="thanks"><h2> Thanks, ${name}! Your order is on its way!</h2></div>`
     
     localStorage.removeItem('selectedItems');
      
     
 })
    
}
 


