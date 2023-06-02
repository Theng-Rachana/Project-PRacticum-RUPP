hamburger = document.querySelector(".hamburger");
hamburger.onclick = function(){
        navBar = document.querySelector(".nav-bar");
        navBar.classList.toggle("active");
}

let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

let filter = document.querySelector('.filter');
openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Red T-shirt',
        price:1234,
        quantity: 0,
        image : 'product-1.jpg',
        nature: {
            color:['red',''],
            size:['S','M','L'],
            type:'shirt'
        }
    },
    {
        id: 2,
        name: 'black Nike',
        price:1234,
        quantity: 1,
        image : 'product-2.jpg',
        nature: {
            color:['black',''],
            size:['S','M','L'],
            type:'shoe'
        }
    },
    {
        id: 3,
        name: 'Gray jean',
        price:1234,
        quantity: 0,
        image : 'product-3.jpg',
        nature: {
            color:['gray',''],
            size:['S','M','L'],
            type:'pant'
        }
    },
    {
        id: 4,
        name: 'Blue T-shirt',
        price:1234,
        quantity: 0,
        image : 'product-4.jpg',
        nature: {
            color:['blue',''],
            size:['S','M','L'],
            type:'shirt'
        }
    },
    {
        id: 5,
        name: 'Gray Nike',
        price:1234,
        quantity: 0,
        image : 'product-5.jpg',
        nature: {
            color:['white','black',''],
            size:['S','M','L'],
            type:'shoe'
        }
    },
    {
        id: 6,
        name: 'Black T-shirt',
        price:1234,
        quantity: 0,
        image : 'product-6.jpg',
        nature: {
            color:['white','black',''],
            size:['S','M','L'],
            type:'shirt'
        }
    },
    {
        id: 7,
        name: 'Shocks',
        price:1234,
        quantity: 0,
        image : 'product-7.jpg',
        nature: {
            color:['white','black',''],
            size:['S','M','L'],
            type:'accessories'
        }
    },
    {
        id: 8,
        name: 'Fussil',
        price:1234,
        quantity: 0,
        image : 'product-8.jpg',
        nature: {
            color:['white','black',''],
            size:['S','M','L'],
            type:'accessories'
        }
    },
    {
        id: 9,
        name: 'Roadster',
        price:1234,
        quantity: 0,
        image : 'product-9.jpg',
        nature: {
            color:['white','black',''],
            size:['S','M','L'],
            type:'accessories'
        }
    },
    {
        id: 10,
        name: 'Black Nike',
        price:1234,
        quantity: 0,
        image : 'product-10.jpg',
        nature: {
            color:['white','black',''],
            size:['S','M','L'],
            type:'shoe'
        }
    },
    {
        id: 11,
        name: 'Gray jordan',
        price:1234,
        quantity: 0,
        image : 'product-11.jpg',
        nature: {
            color:['white','black',''],
            size:['S','M','L'],
            type:'shoe'
        }
    },
    {
        id: 12,
        name: 'Black Nike jean',
        price:1234,
        quantity: 0,
        image : 'product-12.jpg',
        nature: {
            color:['white','black',''],
            size:['S','M','L'],
            type:'pant'
        }
    }
];
let productfilter = products;
filter.addEventListener('submit', function(event){
    event.preventDefault();
    let valueFilter = event.target.elements;
    productfilter = products.filter(item => {
    
        //category 
        if(valueFilter.category.value != ''){
            if(item.nature.type != valueFilter.category.value){
                return false;
            }
        } 
        // color
        if(valueFilter.color.target != ''){
            if(!item.nature.color.includes(valueFilter.color.value)){
                return false;
            }
        }

        // name
        if(valueFilter.name.value != ''){
            if(!item.name.includes(valueFilter.name.value)){
                return false;
            }
        }
        return true;
        
    })
    showproduct(productfilter);
})
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString() + '$'}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString() + '$'}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

function addAccount(){
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    localStorage.setItem('username',username);
    localStorage.setItem('email',email);
    localStorage.setItem('password',password);
  
    alert("Sign up Account Successful");
  }
  
  function checkLoginAccount(){
    var logname = document.getElementById('username').value;
    var logemail = document.getElementById('email').value;
    var logpass = document.getElementById('password').value;
  
    var getname = localStorage.getItem('username');
    var getemail = localStorage.getItem('email');
    var getpass = localStorage.getItem('password');
    if(logname == getname){
      if(logemail == getemail){
        if(logpass == getpass){
          alert("Login Account Successful");
        }
        else{
          alert("Login Unsuccessful. wrong password!");
        }
      }
      else{
        alert("Login Unsuccessful. Check your email again!");
      }
    }
    else{
      alert("Login Unsuccessful. Check your information again!");
    }
  }

function send(){
    var getname = document.getElementById('mailname').value;
    var getmessage = document.getElementById('message').value;
  
    localStorage.setItem('Name',getname);
    localStorage.setItem('Message',getmessage);
    alert("Thank you!");
  }