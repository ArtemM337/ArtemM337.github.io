// Функція додавання товару до кошика
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
      existing.quantity++;
  } else {
      cart.push({
          name: product.name,
          price: product.price,
          quantity: 1
      });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Анімація кнопки кошика
  const cartButton = document.querySelector('.cart-button');
  cartButton.classList.add('has-items');
  setTimeout(() => {
      cartButton.classList.remove('has-items');
  }, 500);

  // Показуємо повідомлення про додавання товару
  showNotification('Товар додано до кошика!');
}

// Функція для показу повідомлення
function showNotification(message) {
  // Видаляємо попереднє повідомлення, якщо воно є
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
      existingNotification.remove();
  }

  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
      notification.remove();
  }, 2000);
}

// Оновлення числа товарів на кнопці кошика
function updateCartButton() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const cartButton = document.querySelector('.cart-button');
  if (totalItems > 0) {
      cartButton.setAttribute('data-items', totalItems);
  } else {
      cartButton.removeAttribute('data-items');
  }
}

// Оновлюємо кнопку кошика при завантаженні сторінки
document.addEventListener('DOMContentLoaded', updateCartButton);