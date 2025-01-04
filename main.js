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

const registerBtn = document.getElementById('registerBtn');
const registerModal = document.getElementById('registerModal');
const closeModal = document.getElementById('closeModal');

registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
    registerModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

registerModal.addEventListener('click', (e) => {
    if (e.target === registerModal) {
        registerModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

function showNotification(message, type = 'success') {
    // Видаляємо попереднє повідомлення, якщо воно є
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

const createAccountBtn = document.querySelector('.sign-up button[type="submit"]');
if (createAccountBtn) {
    createAccountBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Отримуємо значення полів
        const nameInput = document.querySelector('.sign-up input[type="text"]');
        const emailInput = document.querySelector('.sign-up input[type="email"]');
        const passwordInputs = document.querySelectorAll('.sign-up input[type="password"]');
        const termsCheckbox = document.querySelector('.terms input[type="checkbox"]');
        
        // Перевіряємо заповнення полів
        if (!nameInput.value || !emailInput.value || !passwordInputs[0].value || !passwordInputs[1].value) {
            showNotification('Будь ласка, заповніть всі поля', 'error');
            return;
        }
        
        // Перевіряємо паролі
        if (passwordInputs[0].value !== passwordInputs[1].value) {
            showNotification('Паролі не співпадають', 'error');
            return;
        }
        
        // Перевіряємо прийняття умов
        if (!termsCheckbox.checked) {
            showNotification('Будь ласка, прийміть умови користування', 'error');
            return;
        }
        
        // Показуємо повідомлення про успішну реєстрацію
        showNotification('Дякуємо за реєстрацію!');
        
        // Очищаємо форму
        nameInput.value = '';
        emailInput.value = '';
        passwordInputs[0].value = '';
        passwordInputs[1].value = '';
        termsCheckbox.checked = false;
        
        // Закриваємо модальне вікно
        setTimeout(() => {
            registerModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }, 2000);
    });
}


// Оновлюємо кнопку кошика при завантаженні сторінки
document.addEventListener('DOMContentLoaded', updateCartButton);