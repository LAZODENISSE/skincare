// Variables del carrito
const cartItems = {};
const cartElement = document.getElementById("cart");
const totalElement = cartElement.querySelector(".total");
const checkoutButton = cartElement.querySelector(".checkout-button");

// Añadir eventos de clic para "Agregar al Carrito"
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const productId = button.getAttribute("data-product-id");
        const productName = button.parentElement.querySelector("h4").innerText;
        const productPrice = parseFloat(button.parentElement.querySelector(".price").innerText.replace("$", ""));
        addToCart(productId, productName, productPrice);
    });
});

// Función para agregar producto al carrito
function addToCart(productId, productName, productPrice) {
    if (!cartItems[productId]) {
        cartItems[productId] = { name: productName, price: productPrice, quantity: 0 };
    }
    cartItems[productId].quantity += 1;
    renderCart();
}

// Función para renderizar el carrito
function renderCart() {
    cartElement.querySelectorAll(".cart-item").forEach(item => item.remove());
    let total = 0;

    for (const productId in cartItems) {
        const item = cartItems[productId];
        total += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <p>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="removeFromCart('${productId}')">Eliminar</button>
        `;
        cartElement.insertBefore(cartItem, totalElement);
    }
    totalElement.innerText = `Total: $${total.toFixed(2)}`;
}

// Función para eliminar producto del carrito
function removeFromCart(productId) {
    if (cartItems[productId].quantity > 1) {
        cartItems[productId].quantity -= 1;
    } else {
        delete cartItems[productId];
    }
    renderCart();
}

// Función para manejar el clic en el botón "Comprar"
checkoutButton.addEventListener("click", () => {
    if (Object.keys(cartItems).length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    alert("¡Gracias por tu compra!");
    for (const productId in cartItems) {
        delete cartItems[productId];
    }
    renderCart();
});
