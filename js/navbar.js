//Navigation bar
hamburger = document.querySelector(".hamburger");
hamburger.onclick = function(){
        navBar = document.querySelector(".nav-bar");
        navBar.classList.toggle("active");
}

// product filters
function filterProduct(value){
  let buttons = document.querySelectorAll("#btn3");
  buttons.forEach((button) => {
  if(value.toUpperCase() == button.innerHTML.toUpperCase()){
    button.classList.add("active");
    console.log(value);
  }
  else{
    button.classList.remove("active");
  }
  });
  $(document).ready(() => {
    $('#products').html('');
    $.get("http://localhost:3000/Products", function(data, status){
      $.each(data, function(key, product) {
            if(value.toLowerCase() == product.category){
              $('#products').append(`
              <div class="items">
                <div class="fiximg"><img src="${product.image}"></div>
                <h6>${product.title}</h6>
                <div  class="btn-price">
                <h5>$${product.price}</h5>
                <button class="buy-btn">Buy Now</button>
                </div>
            </div>
            `);
            }
            if(value == "all"){
              $('#products').append(`
              <div class="items">
                <div class="fiximg"><img src="${product.image}"></div>
                <h6>${product.title}</h6>
                <div  class="btn-price">
                <h5>$${product.price}</h5>
                <button class="buy-btn">Buy Now</button>
                </div>
            </div>
            `);
            }
            
      });
    });
});    
}

window.onload = () => {
  filterProduct("all");
};

// product search
var search = document.getElementById('searchbtn');
search.addEventListener('click',function(){
  var inputdata = document.getElementById('search').value;
  var textsize = inputdata.length;
  console.log(textsize);
  // var str = inputdata[0];
  // console.log(str.toUpperCase());
  $(document).ready(()=>{
  $('#products').html('');
    $.get('http://localhost:3000/Products',function(data,status){
      count = 0;
      $.each(data,function(key,produsts){
          if(inputdata[0].toUpperCase() == produsts.title[0].toUpperCase()){
            $('#products').append(`
                <div class="items">
                  <div class="fiximg"><img src="${produsts.image}"></div>
                  <h6>${produsts.title}</h6>
                <div  class="btn-price">
                  <h5>$${produsts.price}</h5>
                  <button class="buy-btn">Buy Now</button>
                  </div>
              </div>
            `);
            count++;
          }
      })
    })
  })
})

// Function to save user data in the JSON file
async function saveUser(username, password, email) {
  // Replace this URL with the URL of your JSON file
  const jsonFileUrl = "http://localhost:8000/json/Myweb.postman_collection.json";

  // Use fetch() to retrieve the data from the JSON file
  const response = await fetch(jsonFileUrl);
  const data = await response.json();

  // Add the new user to the Accounts array
  data.Accounts.push({
    username,
    password,
    email,
    role: "user",
  });

  // Use fetch() to update the JSON file with the new data
  await fetch(jsonFileUrl, {
    method: "POST", ///////<-------THIIIS
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}


// Function to retrieve user data from the JSON file
function getUsers() {
  // Replace this URL with the URL of your JSON file
  const jsonFileUrl = "http://localhost:8000/json/Myweb.postman_collection.json";

  // Use fetch() to retrieve the data from the JSON file
  return fetch(jsonFileUrl)
    .then((response) => response.json())
    .then((data) => data.Accounts);
}

// Function to check if a user with the same username exists
function userExists(username) {
  const users = getUsers();
  return users.some(user => user.username === username);
}

// Login form
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  
  const users = await getUsers();
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
      alert('Login successful!');
      if (user.role === "admin") {
        window.location.href = "/admin.html";
      } else if (user.role === "user") {
        window.location.href = "/user.html";
      }
  } else {
      alert('Invalid username or password.');
  }
});


// Register form
const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  if (userExists(username)) {
      alert('Username already exists. Please choose a different one.');
  } else {
      saveUser(username, password,email);
      alert('Registration successful!');
      // Clear registration form fields
      document.getElementById('register-username').value = '';
      document.getElementById('register-email').value = '';
      document.getElementById('register-password').value = '';
  }
});

