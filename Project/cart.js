const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsContainer = document.getElementById('cart-items');
const productTotalElement = document.getElementById('product-total');
const discountElement = document.getElementById('discount');
const totalElement = document.getElementById('total');

function calculateTotals() {
    let productTotal = 0;
    cart.forEach(item => {
        productTotal += item.price * item.quantity;
    });

    const discount = productTotal * 0.06;
    const total = productTotal - discount;

    productTotalElement.textContent = `RM ${productTotal.toFixed(2)}`;
    discountElement.textContent = `RM ${discount.toFixed(2)}`;
    totalElement.textContent = `RM ${total.toFixed(2)}`;
}

function renderCartItems() {
    cartItemsContainer.innerHTML = "";

    if (cart.length > 0) {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <p><strong>${item.name}</strong></p>
                    <p>Category: ${item.category}</p>
                    <p>Brand: ${item.brand}</p>
                    <p>Size: ${item.size}</p>
                    <p>Quantity: <span class="quantity">${item.quantity}</span></p>
                </div>
                <div class="item-price">RM${(item.price * item.quantity).toFixed(2)}</div>
                <div class="actions">
                    <button class="edit">Edit</button>
                    <button class="remove">Remove</button>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);
        });

        cartItemsContainer.addEventListener('click', event => {
            const target = event.target;
            const cartItem = target.closest('.cart-item');

            if (target.classList.contains('remove')) {
                if (confirm("Are you sure you want to remove this item?")) {
                    const itemIndex = [...cartItemsContainer.children].indexOf(cartItem);
                    cart.splice(itemIndex, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCartItems();
                    calculateTotals();
                }
            }

            if (target.classList.contains('edit')) {
                const quantitySpan = cartItem.querySelector('.quantity');
                const currentQuantity = parseInt(quantitySpan.textContent);
                const newQuantity = prompt('Enter new quantity:', currentQuantity);
                if (newQuantity !== null && !isNaN(newQuantity) && newQuantity > 0) {
                    const itemIndex = [...cartItemsContainer.children].indexOf(cartItem);
                    cart[itemIndex].quantity = parseInt(newQuantity);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCartItems();
                    calculateTotals();
                }
            }
        });
    } else {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    }
}
document.getElementById('confirm-order-btn').addEventListener('click', () => {
    alert('Thank you for your order!');
    localStorage.removeItem('cart');
    cart.length = 0;
    renderCartItems();
    calculateTotals();
});

renderCartItems();
calculateTotals();
