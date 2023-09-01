//Navigation bar
hamburger = document.querySelector(".hamburger");
hamburger.onclick = function(){
        navBar = document.querySelector(".nav-bar");
        navBar.classList.toggle("active");
}


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

