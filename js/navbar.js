//Navigation bar
hamburger = document.querySelector(".hamburger");
hamburger.onclick = function(){
        navBar = document.querySelector(".nav-bar");
        navBar.classList.toggle("active");
}

//account
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

// function send(){
//     var getname = document.getElementById('mailname').value;
//     var getmessage = document.getElementById('message').value;
  
//     localStorage.setItem('Name',getname);
//     localStorage.setItem('Message',getmessage);
//     alert("Thank you!");
//   }


  $(document).ready(() => {
    $('#products').html('');
    $.get("http://localhost:3000/Products", function(data, status){
        $.each(data, function(key, product) {
            $('#products').append(`
                <card>
                    <img src="${product.Image}">
                </card>
            `);
        });
    });
});