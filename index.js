// Create an object class for the product to store the properties for id, name and price of the product.
const TOTAL_CART_ITEMS = document.getElementById("total-cart-items");
const DISPLAY_CART_ITEMS = document.getElementById("display-cart-items");
const TOTAL_PRICE = document.getElementById("total-price");

// Product class
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
// *******

// Create an object class for the shopping cart item to store the properties for product and its quantity.

// A sub class of the product
class ProductInfo extends Product {
  constructor(id, name, price, quantity) {
    super(id, name, price);
    this.quantity = quantity;
  }
  calculateProductTotal() {
    return this.price * this.quantity;
  }
}
// ********

// Create another object class for the shopping cart which contains an array of ShoppingCartItem instances.
class ShoppingCartItems {
  constructor(cartItems) {
    this.cartItems = cartItems;
  }

  // get total items in cart
  getNumberOfItemsInCart() {
    TOTAL_CART_ITEMS.innerText = this.cartItems.length;
  }
  // get the total amount of everything in cart
  calculateTotalOfItemsInCart() {
    let total = 0;
    this.cartItems.forEach((item) => {
      total += item.quantity * item.price;
    });

    TOTAL_PRICE.innerText = total;
  }

  //   a method for increasing product quantity
  increaseQuantity(productId) {
    this.cartItems.forEach((item) => {
      if (item.id === productId) {
        item.quantity += 1;
      }

      this.displayCartItems();
      this.calculateTotalOfItemsInCart();
    });
  }
  // A method for decreasing quantity
  decreaseQuantity(productId) {
    this.cartItems.forEach((item) => {
      if (item.id === productId && item.quantity > 1) {
        item.quantity -= 1;
      }

      this.displayCartItems();
      this.calculateTotalOfItemsInCart();
    });
  }
  //   A method for removing cart item
  removeCartItem(productId) {
    let updatedCartItem = this.cartItems.filter(
      (item) => item.id !== productId
    );
    this.cartItems = updatedCartItem;
    this.displayCartItems();
    this.getNumberOfItemsInCart();
    this.calculateTotalOfItemsInCart();
  }
  //   A method to display all the cartItems
  displayCartItems() {
    let products = this.cartItems.map((item) => {
      return `<div class="product-card flex gap-10">
          <h2>${item.name}</h2>
          <h3>${item.price}</h3>
          <div>
            <button id=${
              item.id
            }  class="decrease-btn  bg-red-500 rounded-md p-2 text-white">
              decrease
            </button>
            <p>${item.quantity}</p>
            <button id=${
              item.id
            } class="increase-btn bg-green-500 rounded-md p-2 text-white">
              increase
            </button>

             
          </div>
          <p>${item.calculateProductTotal()}</p>

           <button id=${
             item.id
           } class="delete-btn bg-purple-500 rounded-md p-2 text-white">
              delete
            </button>
        </div>`;
    });
    DISPLAY_CART_ITEMS.innerHTML = products.join(" ");

    // get all the buttons for decreasing
    const decreaseBTN = document.querySelectorAll(".decrease-btn");
    decreaseBTN.forEach((element) => {
      element.addEventListener("click", (e) => {
        this.decreaseQuantity(parseInt(e.target.getAttribute("id")));
      });
    });
    // get all the buttons for increasing
    const increaseBTN = document.querySelectorAll(".increase-btn");
    increaseBTN.forEach((element) => {
      element.addEventListener("click", (e) => {
        this.increaseQuantity(parseInt(e.target.getAttribute("id")));
      });
    });

    // get all the buttons for increasing
    const deleteBTN = document.querySelectorAll(".delete-btn");
    deleteBTN.forEach((element) => {
      element.addEventListener("click", (e) => {
        this.removeCartItem(parseInt(e.target.getAttribute("id")));
      });
    });
  }
}

// our cart items
let cartItems = [
  new ProductInfo(1, "Iphone 6", 10000, 1),
  new ProductInfo(2, "Samsung", 5000, 1),
  new ProductInfo(3, "Infinix", 2000, 1),
];

// create an instance of the shopping cart
const shoppingCart = new ShoppingCartItems(cartItems);

// display all the cart items
shoppingCart.displayCartItems();
shoppingCart.calculateTotalOfItemsInCart();
shoppingCart.getNumberOfItemsInCart();
