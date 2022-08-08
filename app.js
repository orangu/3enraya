const CASILLAS = document.querySelectorAll("[data-casilla]");
const TABLERO = document.getElementById("tablero");
const RESULTADO = document.getElementById("resultado");
const GAMEOVERSCREEN = document.getElementById("final-partida");
const RESTART = document.getElementById("restart");
const CLASE_X = "jugador-x";
const CLASE_CIRCULO = "jugador-o";
const COMBINACIONES_GANADORAS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let turno = true; //true=circulo y false=x. Comprobado en la función accionClick

RESTART.addEventListener("click", startGame);

startGame();

function startGame() {
  CASILLAS.forEach((casilla) => {
    casilla.className = "casilla";
    casilla.removeEventListener("click", accionClick);
    casilla.addEventListener("click", accionClick, { once: true });
  });
  cambiaSimboloHover();
  GAMEOVERSCREEN.classList.remove("show");
}

function accionClick(e) {
  const CASILLA = e.target;
  const CLASE = turno ? CLASE_CIRCULO : CLASE_X;
  marcarCasilla(CASILLA, CLASE);
  if (estadoPartida(CLASE)) {
    finPartida(false);
  } else if (esEmpate()) {
    finPartida(true);
  } else {
    cambiaTurno();
    cambiaSimboloHover();
  }
}

function marcarCasilla(casilla, clase) {
  casilla.classList.add(clase);
}

function cambiaTurno() {
  turno = !turno;
}

function cambiaSimboloHover() {
  TABLERO.className = "";
  if (turno) {
    TABLERO.classList.add(CLASE_CIRCULO);
  } else {
    TABLERO.classList.add(CLASE_X);
  }
}

function estadoPartida(CLASE) {
  return COMBINACIONES_GANADORAS.some((combinacion) => {
    return combinacion.every((index) => {
      return CASILLAS[index].classList.contains(CLASE);
    });
  });
}

function esEmpate() {
  return [...CASILLAS].every((casilla) => {
    return (
      casilla.classList.contains(CLASE_X) ||
      casilla.classList.contains(CLASE_CIRCULO)
    );
  });
}

function finPartida(empate) {
  if (empate) {
    RESULTADO.innerText = "Empate";
  } else {
    RESULTADO.innerText = `${turno ? "O" : "X"} es el ganador!`;
  }
  GAMEOVERSCREEN.classList.add("show");
}
