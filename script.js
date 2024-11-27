// Sample Artworks Data
const artworks = [
  { id: 1, title: "Starry Night", price: 500, image: "assets/artwork1.jpg", category: "classic" },
  { id: 2, title: "The Scream", price: 400, image: "assets/artwork2.jpg", category: "modern" },
  { id: 3, title: "Mona Lisa", price: 600, image: "assets/artwork3.jpg", category: "classic" },
  { id: 4, title: "The Persistence of Memory", price: 450, image: "assets/artwork4.jpg", category: "surreal" },
  { id: 5, title: "Girl with a Pearl Earring", price: 550, image: "assets/artwork5.jpg", category: "classic" },
  { id: 6, title: "The Night Watch", price: 700, image: "assets/artwork6.jpg", category: "historic" },
];

// Initialize Cart with Quantity Support
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update Cart Count in Navigation
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// Render Artworks in Gallery
function renderGallery() {
  const artGrid = document.getElementById("art-grid");
  artGrid.innerHTML = '<div class="loading">Loading Artworks...</div>';
  setTimeout(() => {
    artGrid.innerHTML = "";
    artworks.forEach((art) => {
      artGrid.innerHTML += `
        <div class="art-item" data-category="${art.category}">
          <img src="${art.image}" alt="${art.title}">
          <h3>${art.title}</h3>
          <p>$${art.price}</p>
          <button class="add-to-cart" onclick="addToCart(${art.id})">Add to Cart</button>
        </div>
      `;
    });
  }, 500);
}
// Add Artwork to Cart
function addToCart(id) {
  const art = artworks.find((item) => item.id === id);
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...art, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart(); // Ensure the cart is updated dynamically
  alert(`${art.title} has been added to your cart.`);
}

// Render Cart Items
function renderCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotalDiv = document.getElementById("cart-total");
  if (!cartItemsDiv || !cartTotalDiv) return; // Ensure cart section exists

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = `<p>Your cart is currently empty. Start shopping to add items.</p>`;
    cartTotalDiv.innerHTML = "";
    return;
  }

  let total = 0;
  cartItemsDiv.innerHTML = ""; // Clear previous contents
  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-details">
          <h4>${item.title}</h4>
          <p>$${item.price} x ${item.quantity}</p>
        </div>
        <div class="cart-actions">
          <button onclick="updateQuantity(${index}, -1)">-</button>
          <button onclick="updateQuantity(${index}, 1)">+</button>
          <button onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>
    `;
  });
  cartTotalDiv.innerHTML = `<p>Total: <strong>$${total}</strong></p>`;
}

// Update Cart Item Quantity
function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) cart.splice(index, 1); // Remove if quantity is zero
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// Clear Cart
document.getElementById("clear-cart-btn")?.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear the cart?")) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  }
});

// Render Cart on Page Load
window.addEventListener("DOMContentLoaded", () => {
  renderCart(); // Ensure cart is rendered on load
  updateCartCount();
});

// Render Cart Items
function renderCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotalDiv = document.getElementById("cart-total");
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = `<p>Your cart is empty.</p>`;
    cartTotalDiv.innerHTML = "";
    return;
  }

  let total = 0;
  cartItemsDiv.innerHTML = "";
  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-details">
          <h4>${item.title}</h4>
          <p>$${item.price} x ${item.quantity}</p>
        </div>
        <div class="cart-actions">
          <button onclick="updateQuantity(${index}, -1)">-</button>
          <button onclick="updateQuantity(${index}, 1)">+</button>
          <button onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>
    `;
  });
  cartTotalDiv.innerHTML = `Total: $${total}`;
}

// Update Item Quantity
function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// Remove Item from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// Handle Checkout with Confirmation
function handleCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  if (!confirm("Proceed to checkout?")) return;

  let emailBody = "Thank you for your purchase!\n\nHere are your order details:\n\n";
  let total = 0;

  cart.forEach((item) => {
    emailBody += `- ${item.title}: $${item.price} x ${item.quantity}\n`;
    total += item.price * item.quantity;
  });

  emailBody += `\nTotal Amount: $${total}\n\nPlease provide your delivery details.`;

  // Construct mailto link
  const mailtoLink = `mailto:contact@sleekartgallery.com?subject=Order%20Details&body=${encodeURIComponent(
    emailBody
  )}`;

  // Redirect to mailto
  window.location.href = mailtoLink;

  // Clear cart after checkout
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// Filter Artworks by Category
document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", function () {
    document.querySelector(".filter-btn.active").classList.remove("active");
    this.classList.add("active");

    const category = this.dataset.category;
    document.querySelectorAll(".art-item").forEach((item) => {
      item.style.display = category === "all" || item.dataset.category === category ? "block" : "none";
    });
  });
});

// Render Cart on Page Load if on Cart Section
window.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  updateCartCount();
  if (window.location.hash === "#cart") renderCart();
});

// Checkout Button Event Listener
const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", handleCheckout);
}
