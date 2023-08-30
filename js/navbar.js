//Navigation bar
hamburger = document.querySelector(".hamburger");
hamburger.onclick = function(){
        navBar = document.querySelector(".nav-bar");
        navBar.classList.toggle("active");
}


// function send(){
//     var getname = document.getElementById('mailname').value;
//     var getmessage = document.getElementById('message').value;
  
//     localStorage.setItem('Name',getname);
//     localStorage.setItem('Message',getmessage);
//     alert("Thank you!");
//   }


  let search = "Opna Women's Short Sleeve Moisture";//
  var button = document.getElementById('btn');
  button.addEventListener("click", function(){
    search = document.getElementById("search").value;
    console.log(search);
  });
  document.getElementById('products').append ( `<p>${search}</p>`);
  $(document).ready(() => {
    $('#products').html('');
    $.get("http://localhost:3000/Products", function(data, status){
      $.each(data, function(key, product) {
            if(search == product.title){
              // $("#products").append(`
              // <img src="${product.image}">
              // <h1>${product.title}</h1>`
              // );
            }
            if(search != product.title){
              
            }
            else{
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