// Obtener elementos del DOM
const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.querySelector(".close");

// Abrir el modal
openModal.onclick = function () {
    modal.style.display = "block";
};

// Cerrar el modal al hacer clic en la 'X'
closeModal.onclick = function () {
    modal.style.display = "none";
};

// Cerrar el modal al hacer clic fuera del contenido
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};