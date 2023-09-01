// //Navigation bar
// hamburger = document.querySelector(".hamburger");
// hamburger.onclick = function(){
//         navBar = document.querySelector(".nav-bar");
//         navBar.classList.toggle("active");
// }


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
// document.getElementById("btn").addEventListener("click", () => {
//   let searchInput = document.getElementById("search-input").value;
//   filterProduct();
// });

window.onload = () => {
  filterProduct("all");
};

// Function to save user data in Local Storage
function saveUser(username, password,email) {
  const users = getUsers();
  users.push({ username, password ,email});
  localStorage.setItem('users', JSON.stringify(users));
}

// Function to retrieve user data from Local Storage
function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

// Function to check if a user with the same username exists
function userExists(username) {
  const users = getUsers();
  return users.some(user => user.username === username);
}

// Login form
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
      alert('Login successful!');
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
