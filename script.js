let cart = [];


function addToCart(name, price) {
  cart.push({name, price});
  updateCart();
  alert(`${name} a été ajouté au panier ! ✅`);
}


function updateCart() {
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.price}€`;
    cartItems.appendChild(li);
    total += item.price;
  });
  document.getElementById('totalPrice').textContent = `Total: ${total}€`;
}

function showCart() {
  const cartDiv = document.getElementById('cart');
  cartDiv.style.display = cartDiv.style.display === 'block' ? 'none' : 'block';
}


function clearCart() {
  if (confirm('Voulez-vous vraiment vider le panier ?')) {
    cart = [];
    updateCart();
  }
}

// Checkout
function showCheckout() {
  if(cart.length === 0) {
    alert('Votre panier est vide !');
    return;
  }
  document.getElementById('checkoutModal').style.display = 'block';
}

function closeCheckout() {
  document.getElementById('checkoutModal').style.display = 'none';
}

document.getElementById('checkoutForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Merci pour votre achat ! ✅');
  cart = [];
  updateCart();
  closeCheckout();
});
