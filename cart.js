// Отримуємо елементи DOM
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const checkoutButton = document.getElementById('checkout-btn');
const emptyCartMessage = document.getElementById('empty-cart-message');

let cartProducts = [];

// Завантаження кошика
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cartProducts = JSON.parse(savedCart);
        updateCartDisplay();
    }
    updateEmptyCartMessage();
}

// Оновлення відображення кошика
function updateCartDisplay() {
    cartItems.innerHTML = '';
    let totalPrice = 0;

    cartProducts.forEach((item, index) => {
        const row = document.createElement('tr');
        
        // Назва товару
        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);
        
        // Ціна
        const priceCell = document.createElement('td');
        priceCell.textContent = `₴${item.price.toFixed(2)}`;
        row.appendChild(priceCell);
        
        // Кількість
        const quantityCell = document.createElement('td');
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.classList.add('quantity-input');
        quantityInput.addEventListener('change', (e) => {
            const newQuantity = parseInt(e.target.value);
            if (newQuantity < 1) {
                quantityInput.value = 1;
                item.quantity = 1;
            } else {
                item.quantity = newQuantity;
            }
            saveCart();
            updateCartDisplay();
        });
        quantityCell.appendChild(quantityInput);
        row.appendChild(quantityCell);
        
        // Загальна сума
        const totalCell = document.createElement('td');
        const total = item.price * item.quantity;
        totalCell.textContent = `₴${total.toFixed(2)}`;
        row.appendChild(totalCell);
        
        // Кнопка видалення
        const removeCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Видалити';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', () => removeFromCart(index));
        removeCell.appendChild(removeButton);
        row.appendChild(removeCell);
        
        cartItems.appendChild(row);
        totalPrice += total;
    });
    
    totalPriceElement.textContent = `₴${totalPrice.toFixed(2)}`;
    updateEmptyCartMessage();
}

// Видалення товару з кошика
function removeFromCart(index) {
    cartProducts.splice(index, 1);
    saveCart();
    updateCartDisplay();
}

// Збереження кошика
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cartProducts));
}

// Оновлення повідомлення про порожній кошик
function updateEmptyCartMessage() {
    if (cartProducts.length === 0) {
        document.querySelector('.cart-table').style.display = 'none';
        document.querySelector('.cart-summary').style.display = 'none';
        emptyCartMessage.style.display = 'block';
    } else {
        document.querySelector('.cart-table').style.display = 'table';
        document.querySelector('.cart-summary').style.display = 'flex';
        emptyCartMessage.style.display = 'none';
    }
}

// Обробник кнопки оформлення замовлення
checkoutButton.addEventListener('click', () => {
    if (cartProducts.length > 0) {
        alert('Дякуємо за замовлення! Ми зв\'яжемося з вами найближчим часом.');
        cartProducts = [];
        saveCart();
        updateCartDisplay();
    }
});

// Завантажуємо кошик при завантаженні сторінки
loadCart();