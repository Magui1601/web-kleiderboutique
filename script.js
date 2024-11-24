let cart = JSON.parse(localStorage.getItem('cart')) || []; // Recupera el carrito o inicializa vacío

// Abre o cierra el carrito
function toggleCart() {
    const miniCart = document.getElementById('miniCart');
    miniCart.classList.toggle('active');
}
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Añade un producto al carrito
function addToCart(product) {
    const { name, price, image, quantity, color, size } = product;

    // Genera un identificador único para productos similares
    const productId = `${name}-${color}-${size}`;

    // Verifica si el producto ya existe en el carrito
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += quantity; // Incrementa la cantidad
    } else {
        cart.push({ id: productId, name, price, image, quantity, color, size });
    }

    saveCart(); // Guarda en localStorage
    updateCart(); // Actualiza la interfaz
    alert(`${quantity} ${name} (${color}, ${size}) añadido al carrito.`);
}

// Guarda el carrito en localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Actualiza la vista del carrito
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const emptyCart = document.getElementById('emptyCart');

    cartItems.innerHTML = ''; // Limpia el contenido del carrito
    let subtotal = 0;

    if (cart.length === 0) {
        emptyCart.style.display = 'block'; // Muestra el mensaje de carrito vacío
    } else {
        emptyCart.style.display = 'none'; // Oculta el mensaje de carrito vacío

        // Renderiza cada producto
        cart.forEach(product => {
            subtotal += product.price * product.quantity;

            const cartItem = document.createElement('div');
            cartItem.classList.add('mini-cart-item');

            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <p>${product.name}</p>
                    <p>Color: ${product.color}, Talla: ${product.size}</p>
                    <p>${product.quantity} × ${product.price.toFixed(2)} Bs</p>
                </div>
            `;

            cartItems.appendChild(cartItem);
        });
    }

    cartSubtotal.textContent = `${subtotal.toFixed(2)} Bs`; // Actualiza el subtotal
}

// Limpia todo el carrito
function clearCart() {
    cart = []; // Vacía el carrito
    saveCart(); // Limpia localStorage
    updateCart(); // Refresca la vista
    alert("El carrito ha sido vaciado.");
}

// Navega a la página de carrito
function goToCart() {
    window.location.href = "carrito.html"; // Actualiza esta ruta según tu sitio
}

// Carga el carrito al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});



// Obtener elementos
const searchBtn = document.getElementById('search-btn');
const searchPopupOverlay = document.getElementById('search-popup-overlay');
const closePopupBtn = document.getElementById('close-popup');

// Abrir el popup
searchBtn.addEventListener('click', () => {
    searchPopupOverlay.style.display = 'flex'; // Muestra el modal
});

// Cerrar el popup al hacer clic en el botón de cerrar
closePopupBtn.addEventListener('click', () => {
    searchPopupOverlay.style.display = 'none'; // Oculta el modal
});

// Cerrar el popup al hacer clic fuera del contenido
searchPopupOverlay.addEventListener('click', (e) => {
    if (e.target === searchPopupOverlay) {
        searchPopupOverlay.style.display = 'none'; // Oculta el modal
    }
});

