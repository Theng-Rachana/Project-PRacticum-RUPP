// Update the shopping cart
function updateCart(input) {
    var product = input.parentNode;
    var productName = product.querySelector("span").innerText;
    var quantity = parseInt(input.value);
  
    // If the quantity is 0, remove the item from the cart
    if (quantity === 0) {
      removeCartItem(productName);
    } else {
      updateCartItem(productName, quantity);
    }
  
    calculateTotal();
  }
  
  // Update the quantity of an existing cart item
  function updateCartItem(productName, quantity) {
    var cartItems = document.querySelectorAll(".cart-item");
    for (var i = 0; i < cartItems.length; i++) {
      var item = cartItems[i];
      if (item.innerText.includes(productName)) {
        var itemQuantity = item.querySelector(".item-quantity");
        itemQuantity.innerText = quantity;
        return;
      }
    }
  
    // If the item is not already in the cart, add it
    var cart = document.getElementById("cart-items");
    var item = document.createElement("div");
    item.classList.add("cart-item");
    item.innerHTML = productName + " - Quantity: <span class='item-quantity'>" + quantity + "</span>";
    cart.appendChild(item);
  }
  
  // Remove an item from the cart
  function removeCartItem(productName) {
    var cartItems = document.querySelectorAll(".cart-item");
    for (var i = 0; i < cartItems.length; i++) {
      var item = cartItems[i];
      if (item.innerText.includes(productName)) {
        item.remove();
        return;
      }
    }
  }
  
  // Calculate the total price
  function calculateTotal() {
    var cartItems = document.querySelectorAll(".cart-item");
    var total = 0;
  
    for (var i = 0; i < cartItems.length; i++) {
      var item = cartItems[i];
      var quantity = parseInt(item.querySelector(".item-quantity").innerText);
      // Calculate the price based on the quantity (you can customize this logic)
      var price = 10;
      var itemTotal = quantity * price;
      total += itemTotal;
    }
  
    // Update the total in the cart
    var cartTotal = document.getElementById("cart-total");
    cartTotal.innerText = total;
  }
  