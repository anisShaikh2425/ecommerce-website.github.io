
let shop = document.getElementById("shop");

let basket =  JSON.parse(localStorage.getItem("data")) || []

// id shhud  b first thing inside obj and shud b unique 
// [{}] an obj inside a array
// IMP: What we have to sell is definned inside obj
// [{}] means we have 1 item to sell
// [{},{},{},{}]means we have 4 items to sell


let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let { id, name, price, desc, img } = x;
        let search= basket.find((x)=>x.id === id) || []
        return ` <div id=product-id-${id} class="item">
            <img width=100 src="${img}" alt="shirt">
	
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
            </div>
            <div class="price-quantity">
                <p>$ ${price}</p>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash"></i>
                    <div id=${id} class="quantity">${search.item == undefined ? 0 : search.item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>

            </div>
                </div>
                </div>
                 `
    }).join(""));
};

generateShop();

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
    localStorage.setItem("data", JSON.stringify(basket))

}
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation(id)
}

let calculation = (id)=>{
    let cartIcon= document.getElementById("cartAmount");
    cartIcon.innerHTML= basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
}


calculation();


// what i learn from this video
//1  to sell write data in array of obj
// 2 use map to display 1000 of products rather than  writing manually
// 3to avoid x. use desructuring

/* 4 at quantity i wrote 0 and gave
 it ${id} cz use me target karuna ke jabhi
  me koi prodct ko + ya - karunga to wo
  specific id target hogi jaiskei id:no 1 || id:no 2etc
 */

//   5 if id is not def at increment func refernce error means we havent declared id para  in incrementfunc like dis increment(id)

/*6  how to identify dat we chose a specific card
for dat we need to pass id inside increment(${id})
so here den we know dat we are selecting a specific id
*/

//7  to selecte specific id use  log(selectedItem.id)
// 8used a basket array to store which items we selected specifically wenever we click on plus it will add dat item to basket arr
// 9 created search function jisse agar koi chiz  basket me hai to uski value increase karenge by num 1 ,2,3 etc aur agar wo item basket me nhi to add karenge
//  if id exists inrcases den value increase hogi like 1,2,3 aur agar wo id nhi h to fir hum add karenge wo id with item:1 aisa

//10 update learnt inc and dec by basket.find find used multiple times in same ecom project
// 11 . update() and den calc() jab update func trigeer  hoga tab calc func bhi sath me run hoga


//12 used reduce function to add all the items of all specific id 
/* usne reduce func use kiya to  ek hi result number dene aur sab items values ko add kiya
    iss tarah usne map aur reduce ka use kiya ecommrece web me 
    innerHTML me hum pura func bhi banake use karsakte hainn

/*

/* 13 local storage to store data inside browser taake refresh  par data del na ho
  basket arr we pushed to save data inside localstorage
    wenever we click on plus or minus we are gonna trigger local storage

    localstorage.setItem is used to save data inside the localstorage
    getItem is used to get data inside from localstorage
    clear is used to del everything
    localStorage("key", object// getting stored inside localstorage)
    to read [object object] use JSON.Strigfy(basket) obj name

    but by only setting setItem and refersh still data page per se jayega but iss bar lcStorage me rehage 
    par abh to data wapas retrive kaise karenge so well use
    to get retrive item from localStorage  we used
    in order to get the thing from the local storage
                                                  keyname
    let basket = JSON.parse(localstorage.getItem("data")) || []
    agar koi data nhi ho to app will break isilie we used []  
    
    so if we have local Dta den it will retrive it json.parse() 
    but if we dont have it den itll be only n empty array[]
    
    and everytime d application loads calculation() func will run
    if(searcch === undefinded )return means do nothing
    */ 

    //14 filter is gonna remove which item has 0 and it will only keep items upper dan 0
    // fifteen: for index.html we had main.js and for cart.html wel use cart.js  
    
    /*
     sixteen : wen we create a new page nd cart me data  isnt avaible
      den we already have data stored inside localstorage so hume just wo data 
      pull karna wo cart.js file me  
      and yeh kaam already basket getItem(data)|| [] hamaralie karra h 
      paste dis and log too see data getting from localstorage
    /*

    // 17 paste calc code into cart.js
working code for basket
   basket.push({
    id:id,
    item:1
   });

   console.log(basket)
*/