let cart = [];

function addToCart(name, price) {
  cart.push({name, price});
  updateCart();
  showTemporaryNotification(`${name} a été ajouté au panier ! ✅`);
}

function showTemporaryNotification(message) {
  const notif = document.createElement('div');
  notif.textContent = message;
  notif.style.position = 'fixed';
  notif.style.top = '20px';
  notif.style.right = '20px';
  notif.style.backgroundColor = '#2575fc';
  notif.style.color = 'white';
  notif.style.padding = '12px 20px';
  notif.style.borderRadius = '25px';
  notif.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
  notif.style.zIndex = '200';
  notif.style.opacity = '0';
  notif.style.transition = 'opacity 0.5s';
  document.body.appendChild(notif);
  setTimeout(() => { notif.style.opacity = '1'; }, 100);
  setTimeout(() => { notif.style.opacity = '0'; setTimeout(()=>notif.remove(),500); }, 2500);
}
function updateCart() {
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
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
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;

  alert(`Merci pour votre achat, ${name} ! ✅\nVotre commande sera envoyée à:\n${address}\nUn email de confirmation sera envoyé à ${email}`);
  
  cart = [];
  updateCart();
  closeCheckout();
});


function filterProducts(category, btn) {
  const products = document.querySelectorAll('.product');
  products.forEach(product => {
    if(category === 'all' || product.dataset.category === category) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });

  
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}
