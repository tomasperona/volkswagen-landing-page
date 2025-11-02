// Productos de la tienda 
const productos = [
    {
        id: 1,
        nombre: "Golf GTI 2024",
        precio: 32500,
        imagen: "https://cdn.motor1.com/images/mgl/Qem2ZO/s1/volkswagen-golf-gti-2024.jpg"
    },
    {
        id: 2,
        nombre: "Golf R 2024",
        precio: 38000,
        imagen: "https://images.prismic.io/carwow/Z4qh7JbqstJ99lZi_2024VWGolfRfrontquarterdriving.jpg"
    },
    {
        id: 3,
        nombre: "Golf G60 1989",
        precio: 140000,
        imagen: "https://hips.hearstapps.com/hmg-prod/images/vw-g60-limited-1-66f685b2b46b4.png?resize=980:*"
    },
    {
        id: 4,
        nombre: "Up 2019",
        precio: 15000,
        imagen: "https://www.megautos.com/wp-content/uploads/2020/12/volkswagen-up-2021-xtreme-delantera.jpg"
    }
];

//Funcion para crear el carrito del localstorage, sino crea uno nuevo
function obtenerCarrito() {
    const guardado = localStorage.getItem('carrito');
    return guardado ? JSON.parse(guardado) : [];
}

// Guarda el carrito en el storage
function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

let carrito = obtenerCarrito();

document.addEventListener('DOMContentLoaded', function() {
    const btnCart = document.querySelector(".container_icon");
    const containerCartProducts = document.querySelector(".container-cart-products");
    const countProducts = document.querySelector(".count_products");

    // Mostrar/ocultar carrito 
    if (btnCart && containerCartProducts) {
        btnCart.addEventListener("click", function(event) {
            event.stopPropagation();
            containerCartProducts.classList.toggle("active");
        });

        // Usé document.body porque solo usando document. no me funcionaba bien en el index.
        document.body.addEventListener("click", function(event) {
            // Si el clic no es dentro del carrito ni en el icono, cierra el carrito
            if (
                !containerCartProducts.contains(event.target) &&
                !btnCart.contains(event.target)
            ) {
                containerCartProducts.classList.remove("active");
            }
        });
    }

    // Actualiza el contador del carrito
    function actualizarContador() {
        if (countProducts) {
            countProducts.textContent = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
        }
    }

    // Renderiza los productos del carrito en el dropdown
    function renderCarrito() {
        if (!containerCartProducts) return;
        containerCartProducts.innerHTML = "";

        if (carrito.length === 0) {
            // No mostrar nada si está vacío
            return;
        }
        //crea un div por cada producto
        carrito.forEach(producto => {
            const div = document.createElement("div");
            div.className = "cart-product";
            div.innerHTML = `
                <div class="info-cart-product">
                    <p class="titulo-producto-carrito">${producto.nombre}</p>
                    <span class="precio-producto-carrito">$${(producto.precio * producto.cantidad).toLocaleString()}</span>
                </div>

                <div class="cart-controls-wrapper">
                    <div class="cart-controls">
                        <button class="qty_minus" data-id="${producto.id}" title="Restar">−</button>
                        <input class="qty_input" data-id="${producto.id}" type="number" min="1" value="${producto.cantidad}">
                        <button class="qty_plus" data-id="${producto.id}" title="Sumar">+</button>
                    </div>

                    <button class="btn-remove" data-id="${producto.id}" title="Quitar del carrito" aria-label="Quitar producto">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="icon-close" style="width:20px;height:20px;">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M6 18L18 6" />
                        </svg>
                    </button>
                </div>
            `;
            containerCartProducts.appendChild(div);
        });

        // calcula el Total
        const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
        const divTotal = document.createElement("div");
        divTotal.className = "cart-total";
        divTotal.innerHTML = `<h3>Total:</h3><span class="total-pagar">$${total.toLocaleString()}</span>`;
        containerCartProducts.appendChild(divTotal);
    }

    // Añadir producto al carrito
    function agregarAlCarrito(id) {
        const producto = productos.find(p => p.id === id);
        if (!producto) return;

        const productoEnCarrito = carrito.find(p => p.id === id);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += 1;
        } else {
            carrito.push({
                ...producto,
                cantidad: 1
            });
        }

        guardarCarrito(carrito);
        actualizarContador();
        renderCarrito();
        mostrarToast("Producto agregado");
    }

    // Quitar producto del carrito
    function quitarDelCarrito(id) {
        const index = carrito.findIndex(p => p.id === id);
        if (index !== -1) {
            carrito.splice(index, 1);
            guardarCarrito(carrito);
            actualizarContador();
            renderCarrito();
        }
    }

    // Cambia cantidad (nuevo valor >=1). Si 0 o NaN -> elimina.
    function cambiarCantidad(id, nuevaCantidad) {
        const producto = carrito.find(p => p.id === id);
        if (!producto) return;
        const cantidad = parseInt(nuevaCantidad) || 0;
        if (cantidad <= 0) {
            quitarDelCarrito(id);
        } else {
            producto.cantidad = cantidad;
            guardarCarrito(carrito);
            actualizarContador();
            renderCarrito();
        }
    }

    // Delegación de eventos dentro del dropdown (plus, minus, input, remove)
    if (containerCartProducts) {
        containerCartProducts.addEventListener('click', function(e) {
            const plus = e.target.closest('.qty_plus');
            const minus = e.target.closest('.qty_minus');
            const remove = e.target.closest('.btn-remove');

            if (plus) {
                const id = parseInt(plus.getAttribute('data-id'));
                const prod = carrito.find(p => p.id === id);
                if (prod) {
                    prod.cantidad += 1;
                    guardarCarrito(carrito);
                    actualizarContador();
                    renderCarrito();
                }
                e.stopPropagation();
                return;
            }

            if (minus) {
                const id = parseInt(minus.getAttribute('data-id'));
                const prod = carrito.find(p => p.id === id);
                if (prod) {
                    prod.cantidad = prod.cantidad - 1;
                    if (prod.cantidad <= 0) {
                        quitarDelCarrito(id);
                    } else {
                        guardarCarrito(carrito);
                        actualizarContador();
                        renderCarrito();
                    }
                }
                e.stopPropagation();
                return;
            }

            if (remove) {
                const id = parseInt(remove.getAttribute('data-id'));
                quitarDelCarrito(id);
                e.stopPropagation();
                return;
            }
        });

        // input change (typing new quantity)
        containerCartProducts.addEventListener('input', function(e) {
            const input = e.target;
            if (input && input.classList.contains('qty_input')) {
                const id = parseInt(input.getAttribute('data-id'));
                const val = parseInt(input.value) || 0;
                // no re-render on every keypress to keep UX snappy; wait short debounce
                cambiarCantidad(id, val);
            }
        });
    }

    // Si estamos en la tienda, conecta los botones "Añadir al carrito"
    const items = document.querySelectorAll(".item");
    if (items.length > 0) {
        items.forEach((item, idx) => {
            const btn = item.querySelector("button");
            if (btn) {
                btn.addEventListener("click", function() {
                    agregarAlCarrito(productos[idx].id);
                });
            }
        });
    }

    //sweet alert
    function mostrarToast(title = "") {
        if (typeof Swal !== "undefined") {
            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-end",
                showConfirmButton: true,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
            });
            Toast.fire({ icon: "success", title });
        }
    }

    // Inicializa el contador y el carrito al cargar
    actualizarContador();
    renderCarrito();
});