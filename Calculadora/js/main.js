const pantalla = document.querySelector(".pantalla"); // Calculator screen 
const Historial = document.querySelector(".Historial"); // Calculator history
const botones = document.querySelectorAll(".btn"); // All buttons
const limpiarBtn = document.querySelector(".limpiar-btn"); // CLear button
let historial = [];
var operacion; 


// Save function
// It saves the operation done in an local array
const guardar = () => {
    localStorage.setItem("historial", JSON.stringify(historial))
    render();
}

const render = () => {
    Historial.innerHTML = ""; // Clean the previous content of the history

    historial = JSON.parse(localStorage.getItem("historial"))

    if (historial === null) { // Empty history
        historial = [];
    } else {
        historial.map(h => {
            // Use string interpolation to display history correctly
            Historial.innerHTML += `<div class='alert alert-info text-center'>${h}</div>`;
        })
    }
}


// Call render() to load the page if it shows the previous calculator history
render();

// Clear history function
function clearHistorial() {
    historial = [];
    localStorage.setItem("historial", JSON.stringify(historial));
    render();
}

// Buttons function 
// When a button has been pressed
botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonApretado = boton.textContent;

        // Clear (all) button
        // It clears the calculator screen
        if (boton.id === "c") { 
            pantalla.textContent = "0";
            return;
        }

        // Backspace key
        if (boton.id === "borrar") { 
            if (pantalla.textContent.length === 1 || pantalla.textContent === "Error") {
                pantalla.textContent = "0";
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            }
            return;
        }

        // Equal button && Maths operations
        if (boton.id === "igual") {
            try {
                operacion = pantalla.textContent;
                pantalla.textContent = eval(pantalla.textContent); // Maths operations
            } catch {
                pantalla.textContent = "Error"; // Math error
            }
            historial.push(operacion + " = " + eval(pantalla.textContent)); 
            guardar(); // It saves the history in the array
            return;
        }

        // Empty screen
        if (pantalla.textContent === "0" || pantalla.textContent === "Error") {
            pantalla.textContent = botonApretado; 
        } else {
            pantalla.textContent += botonApretado;
        }
        
        console.log(boton.textContent);
    })
})

// Implementation to clear history
limpiarBtn.addEventListener("click", () => {
    clearHistorial();
});



