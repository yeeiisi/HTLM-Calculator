const pantalla = document.querySelector(".pantalla");
const Historial = document.querySelector(".Historial");
const botones = document.querySelectorAll(".btn");
const limpiarBtn = document.querySelector(".limpiar-btn"); // Selección del botón
let historial = [];
var operacion; 

const guardar = () => {
    localStorage.setItem("historial", JSON.stringify(historial))
    render();
}

const render = () => {
    Historial.innerHTML = ""; // Limpiar el contenido anterior

    historial = JSON.parse(localStorage.getItem("historial"))

    if (historial === null) {
        historial = [];
    } else {
        historial.map(h => {
            // Utilizar interpolación de cadenas para mostrar el historial correctamente
            Historial.innerHTML += `<div class='alert alert-info text-center'>${h}</div>`;
        })
    }
}


// Llama a render() al cargar la página para mostrar el historial
render();

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonApretado = boton.textContent;

        if (boton.id === "c") {
            pantalla.textContent = "0";
            return;
        }

        if (boton.id === "borrar") {
            if (pantalla.textContent.length === 1 || pantalla.textContent === "Error") {
                pantalla.textContent = "0";
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            }
            return;
        }

        if (boton.id === "igual") {
            try {
                operacion = pantalla.textContent;
                pantalla.textContent = eval(pantalla.textContent);
            } catch {
                pantalla.textContent = "Error";
            }
            historial.push(operacion + " = " + eval(pantalla.textContent));
            guardar();
            return;
        }

        if (pantalla.textContent === "0" || pantalla.textContent === "Error") {
            pantalla.textContent = botonApretado;
        } else {
            pantalla.textContent += botonApretado;
        }
        
        console.log(boton.textContent);
    })
})

// Implementación para limpiar el historial
limpiarBtn.addEventListener("click", () => {
    clearHistorial();
});

function clearHistorial() {
    historial = [];
    localStorage.setItem("historial", JSON.stringify(historial));
    render();
}

