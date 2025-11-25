let cart = [];


function addToCart(button) {
  const product = button.parentElement;
  const name = product.dataset.name;
  const price = parseFloat(product.dataset.price);

  cart.push({ name, price });
  alert(`${name} ajouté au panier!`);
}


const cartToggle = document.getElementById('cartToggle');
const checkoutModal = document.getElementById('checkoutModal');

cartToggle.addEventListener('click', () => {
  if(cart.length === 0) {
    alert("Votre panier est vide !");
    return;
  }
  showCart();
});

function showCart() {
  checkoutModal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="closeCheckout()">&times;</span>
      <h2>Votre Panier</h2>
      <ul id="cartItems"></ul>
      <p id="totalPrice"></p>
      <button onclick="clearCart()">Vider le panier</button>
      <button onclick="proceedCheckout()">Compléter l'achat</button>
    </div>
  `;
updateCartDisplay();
  checkoutModal.style.display = 'block';
}


function updateCartDisplay() {
  const cartItems = document.getElementById('cartItems');
  const totalPrice = document.getElementById('totalPrice');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.price}€`;
    cartItems.appendChild(li);
    total += item.price;
  });

  totalPrice.textContent = `Total: ${total}€`;
}


function clearCart() {
  cart = [];
  closeCheckout();
  alert("Votre panier a été vidé !");
}
function proceedCheckout() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  checkoutModal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="closeCheckout()">&times;</span>
      <h2>Formulaire de Paiement</h2>
      <form id="checkoutForm">
        <label>Nom:</label>
        <input type="text" id="name" required>
        <label>Email:</label>
        <input type="email" id="email" required>
        <label>Adresse complète (Algérie):</label>
        <input type="text" id="address" placeholder="Rue, Numéro, Ville, Wilaya" required>
        <label>Méthode de paiement:</label>
        <select id="payment" required>
          <option value="Carte">Carte</option>
          <option value="Paypal">Paypal</option>
          <option value="Cash">Cash à la livraison</option>
        </select>
        <p><strong>Total:</strong> ${total}€</p>
        <button type="submit">Acheter</button>
        <button type="button" onclick="showCart()">Revenir au panier</button>
      </form>
    </div>
  `;

  document.getElementById('checkoutForm').addEventListener('submit', function(e){
    e.preventDefault();
    finalPurchase();
  });
}

function finalPurchase() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  const payment = document.getElementById('payment').value;
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  checkoutModal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="closeCheckout()">&times;</span>
      <h2>Commande Confirmée</h2>
      <p><strong>Nom:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Adresse:</strong> ${address}</p>
      <p><strong>Méthode de paiement:</strong> ${payment}</p>
      <p><strong>Total:</strong> ${total}€</p>
      <button onclick="thankYou()">Confirmer l'achat</button>
    </div>
  `;
}

function thankYou() {
  alert("Merci pour votre achat ! 🛒");
  cart = [];
  closeCheckout();
}

function closeCheckout() {
  checkoutModal.style.display = 'none';
}

