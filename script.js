let cart = [];

/* =========================
   CART
========================= */

function addToCart(name, price) {

  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCart();

  // Small visual feedback
  const button = event?.target;

  if (button) {
    button.innerHTML = "✓";

    setTimeout(() => {
      button.innerHTML = "+";
    }, 700);
  }
}


/* =========================
   COMBO
========================= */

function addCombo() {

  const existing = cart.find(item => item.name === "Royal Combo");

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      name: "Royal Combo",
      price: 449,
      quantity: 1
    });
  }

  updateCart();

  openCart();
}


/* =========================
   UPDATE CART
========================= */

function updateCart() {

  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const mobileCartCount = document.getElementById("mobileCartCount");
  const cartTotal = document.getElementById("cartTotal");

  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;
  });

  cartCount.textContent = totalItems;
  mobileCartCount.textContent = totalItems;
  cartTotal.textContent = totalPrice.toLocaleString();


  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p class="empty-cart">
        Your cart is empty.
      </p>
    `;

    return;
  }


  cartItems.innerHTML = cart.map((item, index) => {

    return `
      <div class="cart-item">

        <div>
          <h4>${item.name}</h4>
          <small>
            Rs. ${item.price.toLocaleString()} × ${item.quantity}
          </small>
        </div>

        <div class="cart-controls">

          <button onclick="changeQuantity(${index}, -1)">
            −
          </button>

          <span>${item.quantity}</span>

          <button onclick="changeQuantity(${index}, 1)">
            +
          </button>

        </div>

      </div>
    `;

  }).join("");
}


/* =========================
   CHANGE QUANTITY
========================= */

function changeQuantity(index, amount) {

  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}


/* =========================
   OPEN CART
========================= */

function openCart() {

  document
    .getElementById("cartOverlay")
    .classList.add("show");

  document.body.style.overflow = "hidden";
}


/* =========================
   CLOSE CART
========================= */

function closeCart(event) {

  if (
    event &&
    event.target !== document.getElementById("cartOverlay")
  ) {
    return;
  }

  document
    .getElementById("cartOverlay")
    .classList.remove("show");

  document.body.style.overflow = "";
}


/* =========================
   WHATSAPP ORDER
========================= */

function orderOnWhatsApp() {

  if (cart.length === 0) {
    alert("Please add something to your order first.");
    return;
  }

  let message = "🍗 *NEW ORDER - ROYAL BIRYANI*%0A%0A";

  let total = 0;

  cart.forEach(item => {

    const itemTotal = item.price * item.quantity;

    total += itemTotal;

    message +=
      `• ${item.name} × ${item.quantity} = Rs. ${itemTotal}%0A`;

  });

  message += `%0A💰 *TOTAL: Rs. ${total}*%0A%0A`;
  message += "Please confirm my order. Thank you!";


  // CHANGE THIS NUMBER TO THE RESTAURANT'S WHATSAPP NUMBER
  const phoneNumber = "923166653527";

  const whatsappURL =
    `https://wa.me/${phoneNumber}?text=${message}`;

  window.open(whatsappURL, "_blank");
}


/* =========================
   MENU FILTER
========================= */

function filterMenu(category, button) {

  const cards =
    document.querySelectorAll(".food-card");

  const buttons =
    document.querySelectorAll(".category");


  buttons.forEach(btn => {
    btn.classList.remove("active");
  });

  button.classList.add("active");


  cards.forEach(card => {

    if (
      category === "all" ||
      card.dataset.category === category
    ) {

      card.style.display = "block";

      setTimeout(() => {
        card.style.opacity = "1";
      }, 20);

    } else {

      card.style.display = "none";

    }

  });
}


/* =========================
   NAVBAR SCROLL
========================= */

window.addEventListener("scroll", () => {

  const navbar =
    document.querySelector(".navbar");

  if (window.scrollY > 30) {

    navbar.style.background =
      "rgba(13,13,13,.96)";

  } else {

    navbar.style.background =
      "rgba(13,13,13,.88)";

  }

});


/* =========================
   INITIALIZE
========================= */

updateCart();
