
// === PRODUCTS ===

const products = [
  { name:"Red Rose Bouquet", price:29, image:"images/products/red-rose-bouquet.png" },
  { name:"Pink Carnation Bouquet", price:25, image:"images/products/pink-carnation-bouquet.png" },
  { name:"White Daisy Bouquet", price:27, image:"images/products/white-daisy-bouquet.png" },
  { name:"Sunflower Bouquet", price:30, image:"images/products/sunflower-bouquet.png" },
  { name:"Mixed Seasonal Bouquet", price:35, image:"images/products/mixed-seasonal-bouquet.png" },
  { name:"Pink Tulip Bouquet", price:55, image:"images/products/pink-tulip-bouquet.png" },
  { name:"White Lily Bouquet", price:60, image:"images/products/white-lily-bouquet.png" },
  { name:"Gerbera Daisy Mix", price:50, image:"images/products/gerbera-daisy-bouquet.png" },
  { name:"Lavender Bouquet", price:65, image:"images/products/lavender-bouquet.png" },
  { name:"Iris & Greenery Bouquet", price:70, image:"images/products/iris-and-greenery-bouquet.png" },
  { name:"Peony Bouquet", price:75, image:"images/products/peony-bouquet.png" },
  { name:"Orchid Bouquet", price:90, image:"images/products/orchid-bouquet.png" },
  { name:"White Wedding Bouquet", price:120, image:"images/products/white-wedding-bouquet.png" },
  { name:"Cherry Blossom Style Bouquet", price:130, image:"images/products/cherry-blossom-style-bouquet.png" },
];

const container = document.getElementById("products");

if (container) {
  products.forEach(p => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p class="price">$${p.price}</p>
        <div class="btn-container">
          <button class="btn add-cart">Add to cart</button>
          <button class="btn">Buy Now</button>
        </div>
      </div>
    `;
  });
}

// === FEATURED ===

function createProductCard(product) {
  const div = document.createElement("div");
  div.classList.add("product-card");

  div.innerHTML = `
    <img src="${product.image}" />
    <h3>${product.name}</h3>
    <p class="price">$${product.price}</p>
    <div class="btn-container">
      <button class="btn add-cart">Add to cart</button>
      <button class="btn">Buy Now</button>
    </div>
  `;

  return div;
}

const featuredContainer = document.getElementById("featured-products");

if (featuredContainer) {
  const featuredProducts = products.slice(0, 3);
  featuredProducts.forEach(product => {
    featuredContainer.appendChild(createProductCard(product));
  });
}

// === ACCOUNT ===

const userIcon = document.getElementById("userIcon");
const dropdown = document.getElementById("dropdownMenu");

if (userIcon && dropdown) {
  userIcon.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", () => {
    dropdown.style.display = "none";
  });
}

// === LOGIN/REGISTER ===

const accContainer = document.querySelector('.acc-container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

if (registerBtn && loginBtn) {
  registerBtn.addEventListener('click', ()=> {
    accContainer.classList.add('active');
  });

  loginBtn.addEventListener('click', ()=> {
    accContainer.classList.remove('active');
  });
}

// === CART DRAWER ===

const cartIcon = document.getElementById('cartIcon');
const cart = document.querySelector('.cart');
const cartClose = document.querySelector("#cart-close");
const cartContent = document.querySelector(".cart-content");

if (cartIcon && cart && cartClose) {
  cartIcon.addEventListener("click", (e) => {
    e.preventDefault();
    cart.classList.add("active2");
  });

  cartClose.addEventListener("click", () => {
    cart.classList.remove("active2");
  });
}

// === ADD TO CART ===

// Use EVENT DELEGATION
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("add-cart")) {
    const productCard = e.target.closest(".product-card");
    addToCart(productCard);
  }
});

// === ADD FUNCTION ===

function addToCart(productCard) {
  const title = productCard.querySelector("h3").textContent;

  // Prevent duplicate
  const existing = [...document.querySelectorAll(".cart-product-title")]
    .find(el => el.textContent === title);

  if (existing) {
    alert("Item already in cart");
    return;
  }

  const img = productCard.querySelector("img").src;
  const price = productCard.querySelector(".price").textContent;

  const cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");

  cartBox.innerHTML = `
    <img src="${img}" class="cart-img">
    <div class="cart-detail">
      <h2 class="cart-product-title">${title}</h2>
      <span class="cart-price">${price}</span>
      <div class="cart-quantity">
        <button class="decrement">-</button>
        <span class="number">1</span>
        <button class="increment">+</button>
      </div>
    </div>
    <i class="fa fa-trash cart-remove"></i>
  `;

  cartContent.appendChild(cartBox);
  updateTotal();
  updateCartCount();
}

// === CART ACTIONS ===

cartContent.addEventListener("click", function(e) {
  const target = e.target;

  // REMOVE
  if (target.classList.contains("cart-remove")) {
    target.parentElement.remove();
    updateTotal();
    updateCartCount();
  }

  // INCREMENT
  if (target.classList.contains("increment")) {
    const num = target.parentElement.querySelector(".number");
    num.textContent = parseInt(num.textContent) + 1;
    updateTotal();
    updateCartCount();
  }

  // DECREMENT
  if (target.classList.contains("decrement")) {
    const num = target.parentElement.querySelector(".number");
    let value = parseInt(num.textContent);

    if (value > 1) {
      num.textContent = value - 1;
    }
    updateTotal();
    updateCartCount();
  }
});

// === TOTAL ===

function updateTotal() {
  const cartBoxes = document.querySelectorAll(".cart-box");
  let total = 0;

  cartBoxes.forEach(box => {
    const price = parseFloat(
      box.querySelector(".cart-price").textContent.replace("$", "")
    );
    const quantity = parseInt(
      box.querySelector(".number").textContent
    );

    total += price * quantity;
  });

  const totalElement = document.querySelector(".total-price");
  if (totalElement) {
    totalElement.textContent = "$" + total.toFixed(2);
  }
}






function updateCartCount() {
  const cartBoxes = document.querySelectorAll(".cart-box");
  let count = 0;

  cartBoxes.forEach(box => {
    const qty = parseInt(box.querySelector(".number").textContent);
    count += qty;
  });

  const countElement = document.querySelector(".item-count");

  if (countElement) {
    countElement.textContent = count;

    // Optional: hide if zero
    if (count === 0) {
      countElement.style.visibility = "hidden";
    } else {
      countElement.style.visibility = "visible";
    }
  }
}