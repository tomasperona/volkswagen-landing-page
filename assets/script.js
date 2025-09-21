alert("Bienvenido a la tienda online de Volkswagen");

class Auto {
    constructor(nombre, precio, stock) {
        this.nombre = nombre
        this.precio = precio
        this.stock = stock
    }
}

let autos = [
    new Auto("Golf GTI", 80000, 5),
    new Auto("Golf R", 50000, 3),
    new Auto("Golf G60", 150000, 2)
];

for (let i = 0; i < autos.length; i++) {
    alert(
        "Tenemos disponible el " +
        autos[i].nombre +
        " | Precio: $" + autos[i].precio +
        " | Stock " + autos[i].stock
    )
}

let carrito = [];
let opcion;

do {
    opcion = prompt(
        "Opciones | 1. Ver catalogo, 2. Agregar auto al carrito, 3. Ver Carrito, 4. Finalizar Compra, 5. Salir. "
    );
    switch (opcion) {
        case "1":
            for (let i = 0; i < autos.length; i++) {
                alert(
                    "Tenemos disponible el " +
                    autos[i].nombre +
                    " | Precio: $" + autos[i].precio +
                    " | Stock " + autos[i].stock
                );
            }
            break;

        case "2":
            let eleccion = prompt(
                "¿Qué auto quieres agregar al carrito?\nGolf GTI\nGolf R\nGolf G60\n"
            );
            let autoElegido = autos.find(
                a => a.nombre.toLowerCase() === eleccion.trim().toLowerCase()
            );
            if (!autoElegido) {
                alert("Ese auto no existe. Intenta de nuevo.");
            } else if (autoElegido.stock <= 0) {
                alert("No hay stock disponible para " + autoElegido.nombre);
            } else {
                carrito.push(autoElegido.nombre);
                autoElegido.stock--;
                alert("Agregaste el " + autoElegido.nombre + " al carrito");
            }
            break;

        case "3":
            if (carrito.length === 0) {
                alert("El carrito está vacío.");
            } else {
                alert("En el carrito se encuentran los autos:\n" + carrito.join("\n"));
            }
            break;

        case "4":
            if (carrito.length === 0) {
                alert("El carrito está vacío.");
                break;
            }
            alert("Tienes actualmente en el carrito:\n" + carrito.join("\n"));
            let total = 0;
            for (let i = 0; i < carrito.length; i++) {
                let auto = autos.find(a => a.nombre === carrito[i]);
                if (auto) total += auto.precio;
            }
            let metodo = prompt("¿Qué método de pago quieres? | 1. Efectivo, 2. Tarjeta");
            if (metodo === "1") {
                alert("Tienes un 10% de descuento, el total es de $ " + (total * 0.9));
            } else {
                let cuotas = prompt("¿En cuántas cuotas quieres pagar? | 1. 1 cuota, 2. 3 cuotas, 3. 6 cuotas, 4. 12 cuotas");
                if (cuotas === "1") {
                    alert("El total es de $ " + total);
                } else if (cuotas === "2") {
                    alert("El total es de $ " + (total * 1.05) + " en 3 cuotas de $ " + ((total * 1.05) / 3));
                } else if (cuotas === "3") {
                    alert("El total es de $ " + (total * 1.1) + " en 6 cuotas de $ " + ((total * 1.1) / 6));
                } else {
                    alert("El total es de $ " + (total * 1.2) + " en 12 cuotas de $ " + ((total * 1.2) / 12));
                }
            }
            break;

        case "5":
            alert("Gracias por tu visita, vuelve pronto!");
            break;

        default:
            alert("Opción no válida, intenta de nuevo.");
            break;
    }
} while (opcion !== "5");