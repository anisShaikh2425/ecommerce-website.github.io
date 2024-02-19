let label= document.getElementById("label");
let shoppingCart= document.getElementById("shoppingCart");
// console.log(shopItemsData)
let basket =  JSON.parse(localStorage.getItem("data")) || []

let calculation = (id)=>{
    let cartIcon= document.getElementById("cartAmount");
    cartIcon.innerHTML= basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
}


calculation();

let generateCartItems=()=>{
    if(basket.length !==0){
       return (shoppingCart.innerHTML= basket.map((x)=>{
         console.log(x);
         let {id, item}=x;
         let search =shopItemsData.find((y)=>y.id=== id) || []
        return `
        <div class="cart-item">
        <img width=100 src=${search.img} alt="" />
       <div class="details">
       <div class="title-price-x">
        <h4 class="title-price">
        <p>${search.name}</p>
        <p class="cart-item-price"> $ ${search.price}</p>
        </h4>
        <i  onclick="removeItem(${id})" class="bi-x-lg"></i>
       </div>
        <div class="buttons">
        <i onclick="decrement(${id})" class="bi bi-dash"></i>
        <div class="cart-quantity" id=${id} class="quantity">${item}</div>
        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>

  </div>
       <h3>${item * search.price}</h3>
        </div>
        </div>
        `
       }).join(""));
    }
    else{
        shoppingCart.innerHTML= ``;
        label.innerHTML= `
        <h2>Cart is Empty</h2>
      <a href="index.html">  
      <button class="homeBtn">back to home </button>
      </a>
        `;
    }
}

generateCartItems()

let increment = (id) => {
  let search = basket.find((x) => x.id === id);
  console.log(search)
  if (search === undefined) {
      basket.push({
          id: id,
          item: 1
      });
  } else {
     search.item += 1
  }

  console.log(basket)
  //to read [object Object] we used json.stringyfy(basket)

  update(id);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket))
}
let decrement = (id) => {
  let search = basket.find((x) => x.id === id);
  if(search === undefined) return;
  if (search.item === 0) return;
  else {
      search.item -= 1
  }
  update(id);
  // using update as we were doind d opp 
  basket = basket.filter((x)=> x.item !==0);
  generateCartItems();
  // once it becomes zero then filter line will run and it wil rerender genecartitems func
// it helps us  to re render our cards with updated data
  localStorage.setItem("data", JSON.stringify(basket))

}
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation(id);
  totalAmount();
}

let removeItem=(id)=>{
  // targeting particular id to delete so dat we know get to kknwo which id to del 
  console.log(id);
  basket = basket.filter((x)=>x.id !==id)
  generateCartItems();
  totalAmount();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket))

}


let totalAmount= ()=>{
  if(basket.length !==0){
    let amount = basket.map((x)=>{
      let {id,item}=x;
      let search= shopItemsData.find((y)=> y.id ===id) || []
      return item * search.price
      
    }).reduce((x,y)=>x+y,0);
  // console.log(amount);
label.innerHTML= `
<h2>Total bill : ${amount}</h2>
<button  class="checkout">Checkout</button>
<button onclick="clearCart()" class="removeAll">Clear cart</button>
`

  }else return;
};

totalAmount()


// clear cart code
let clearCart=()=> {
  // means whatever data we have on basket remove all things
  basket=[];
  // re render  cards  again now after removing all things
  generateCartItems();
  // now update local  storgae
  localStorage.setItem("data", JSON.stringify(basket))
  calculation();
}



// cartbox
// learning from this project
// if stat will run only if localStorage is not empty
// else will run when locSt is empty 

//2 to remove coommona use .join
// 3 jitne items  h utna hello ayega 3 ids slelected to 3 times hello
/* 4 cart.html me niche data.js h to aaram se we can use data.js images
  and all data on 3 rd line console.log(shopItemsData) to see it is wokring
  in our cart.js file as well
  */


  /* five: id is coming from basket in cart.js , y is coming from 
  data.js  of shopItemsData
  */
// 6 quantity {id,item} ${item} represents the  num of [quantity] of d item dat u selected 

/* 7 we pasted inc , dec, update so for btns
we copied a piece of code and reused it according to situation  i learnt from
project dis new thing */