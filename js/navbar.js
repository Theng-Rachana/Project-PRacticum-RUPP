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

// Function to save user data in the JSON server
function saveUser(username, password, email) {
  // Use AJAX to update the JSON server with the new data
  $.ajax({
    type: "POST",
    url: 'http://localhost:3000/Accounts',
    contentType: "application/json",
    data: JSON.stringify({
      username,
      password,
      email,
      role: "user",
    }),
  });
}

// Function to retrieve user data from the JSON server
function getUsers() {
  // Use AJAX to retrieve the data from the JSON server
  return $.get('http://localhost:3000/Accounts');
}

// Function to check if a user with the same username exists
function userExists(username) {
  return getUsers().then(function(users) {
    return users.some(user => user.username === username);
  });
}

// Login form
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  
  getUsers().then(function(users) {
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      alert('Login successful!');
      if (user.role === "admin") {
        window.location.href = "/admin.html";

      }
    } else {
      alert('Invalid username or password.');
    }
  });
});
// Register form
const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  userExists(username).then(function(exists) {
    if (exists) {
      alert('Username already exists. Please choose a different one.');
    } else {
      saveUser(username, password, email);
      alert('Registration successful!');
      
      // Clear registration form fields
      document.getElementById('register-username').value = '';
      document.getElementById('register-email').value = '';
      document.getElementById('register-password').value = '';
    }
  });
});