alert("Bienvenido a la tienda online de Volkswagen")
class Auto {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

let autos = [
    new Auto("Golf GTI", 80000,5),
    new Auto("Golf R", 50000, 3),
    new Auto ("Golf G60", 150000, 2)

]

for (let i = 0; i < autos.length; i++) {
    alert(
        "Tenemos disponible el " + 
        autos[i].nombre + 
        " | Precio: $" + autos[i].precio +
        " | Stock " + autos[i].stock
    );
}

let carrito = []

do {
    opcion = prompt (
    "Opciones | 1. Ver catalogo, 2. Agregar auto al carrito, 3. Ver Carrito, 4. Finalizar Compra, 5. Salir. "
)
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
        eleccion = prompt (
            "Que auto quieres agregar al carrito?\n" +
            "Golf Gti\n" +
            "Golf R\n" +
            "Golf G60\n"
            
        ).toLowerCase()

        if (eleccion=="golf gti") {
            carrito.push("Golf Gti")
        }

        else if(eleccion=="golf r") {
            carrito.push("Golf R")

        }
        else {
            carrito.push("Golf G60")
        }
        
        break
    case "3":
        alert("En el carrito se encuentran los autos " + carrito.join("\n"))

        break;

    case "4":
        alert("Tienes actualmente en el carrito:" + carrito.join("\n"))
        total = 
        metodo = prompt("Que metodo de pago quieres? | 1. Efectivo, 2. Tarjeta")

        break;
        
    default:
        alert("Opcion no valida, intenta de nuevo.")
        break;
}
    
} while (opcion!==5);