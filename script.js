const DEFAULTNUMBEROFSQUARES = 16;
const TRANSITIONINTIME = 0.7;
const TRANSITIONOUTTIME = 3;
const MAXSQUARES = 100;

let boolOnHover = false;
let boolVanishing = false;
let boolRainbow = false;
let boolDarken = false;

const squaresContainer = document.querySelector(".squares-container");
const input = document.querySelector("input");

drawBoard(DEFAULTNUMBEROFSQUARES);

function drawBoard(newNumOfSquares) {
  clearSquares();
  if (newNumOfSquares >= MAXSQUARES) {
    newNumOfSquares = MAXSQUARES;
  } else if (newNumOfSquares < 1) {
    newNumOfSquares = 1;
  }
  input.value = newNumOfSquares;
  createSquares(newNumOfSquares);
}

function clearSquares() {
  while (squaresContainer.lastChild) {
    squaresContainer.removeChild(squaresContainer.lastChild);
  }
}

function createSquares(num) {
  squaresContainer.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
  const square = document.createElement("div");

  const arr = [];
  for (let i = 0; i < num * num; i++) {
    tempSquare = square.cloneNode(true);
    tempSquare.addEventListener("mouseenter", (e) => onEnterSquare(e));
    if (boolVanishing) {
      tempSquare.addEventListener("mouseleave", (e) => onLeaveSquare(e));
    }
    arr.push(tempSquare);
  }
  squaresContainer.append(...arr);
}

function onEnterSquare(hoveredSquareEvent) {
  if (boolOnHover || hoveredSquareEvent.buttons > 0) {
    const hoveredSquare = hoveredSquareEvent.target;
    if (boolRainbow) {
      hoveredSquare.style.backgroundColor = randomColor();
    } else if (boolDarken) {
      if (hoveredSquare.style.backgroundColor !== "rgb(0, 0, 0)") {
        hoveredSquare.style.opacity = 0;
        hoveredSquare.style.backgroundColor = "#000";
      }
      newOpacity = (parseInt(hoveredSquare.style.opacity * 10) + 1) / 10;
      if (hoveredSquare.style.opacity >= 1) {
        newOpacity = 1;
      }
      hoveredSquare.style.opacity = newOpacity;
    } else {
      hoveredSquare.style.backgroundColor = "rgb(0, 0, 0)";
    }
    hoveredSquare.style.transitionDuration = TRANSITIONINTIME + "s";
  }
}

function onLeaveSquare(hoveredSquareEvent) {
  const hoveredSquare = hoveredSquareEvent.target;
  setTimeout(() => {
    hoveredSquare.style.transitionDuration = TRANSITIONOUTTIME + "s";
    hoveredSquare.style.backgroundColor = "rgb(255, 255, 255)";
  }, TRANSITIONINTIME * 1000);
}

function random(n) {
  return Math.floor(Math.random() * n);
}

function randomColor() {
  return `rgb(${random(256)}, ${random(256)}, ${random(256)})`;
}

function calculateColor(currentColor) {
  let newColor;
  if ((currentColor = "")) return "rgba(0, 0, 0, 0)";
  console.log(currentColor);
  const alpha = parseInt(currentColor.split(",")[3].slice(0, -1));
  return `rgba(0, 0, 0, ${alpha + 0.1})`;
}

// input field redraw
input.addEventListener("input", (e) => {
  drawBoard(e.target.value);
});

// reset button redraw
resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", () => {
  const newNumOfSquares = prompt("Enter new sq", 16);
  drawBoard(newNumOfSquares);
});

btnVanishing = document.querySelector(".btn-vanishing");
btnOnHover = document.querySelector(".btn-on-hover");
btnRainbow = document.querySelector(".btn-rainbow");
btnDarken = document.querySelector(".btn-darken");

btnVanishing.addEventListener("click", (e) => {
  e.target.classList.toggle("btn-pushed");
  boolVanishing = !boolVanishing;
  drawBoard(input.value);
});

btnOnHover.addEventListener("click", (e) => {
  e.target.classList.toggle("btn-pushed");
  boolOnHover = !boolOnHover;
  drawBoard(input.value);
});

btnRainbow.addEventListener("click", (e) => {
  e.target.classList.toggle("btn-pushed");
  boolRainbow = !boolRainbow;
  drawBoard(input.value);
});

btnDarken.addEventListener("click", (e) => {
  e.target.classList.toggle("btn-pushed");
  boolDarken = !boolDarken;
  drawBoard(input.value);
});


function disableDragAndDrop() {
  const body = document.querySelector("body");
  body.addEventListener("dragstart",(event)=>{
    event.preventDefault();
  })
}

disableDragAndDrop();