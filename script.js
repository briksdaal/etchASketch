const DEFAULTNUMBEROFSQUARES = 16;
const TRANSITIONINTIME = 0.7;
const TRANSITIONOUTTIME = 3;
const MAXSQUARES = 100;

const WHITEBACKGROUND = 'rgba(242, 238, 237, 1)';
const BLACKBACKGROUND = 'rgba(0, 0, 0, 1)';

let boolOnHover = false;
let boolVanishing = false;
let boolRainbow = false;
let boolDarken = false;
let boolEraser = false;

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
  input.nextSibling.textContent = newNumOfSquares;
  createSquares(newNumOfSquares);
}

function clearSquares() {
  while (squaresContainer.lastChild) {
    squaresContainer.removeChild(squaresContainer.lastChild);
  }
}

function createSquares(num) {
  num = parseInt(num);
  squaresContainer.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
  const square = document.createElement("div");
  const arr = [];
  for (let i = 0; i < num * num; i++) {
    tempSquare = square.cloneNode(true);
    tempSquare.style.backgroundColor = WHITEBACKGROUND;
    if (num === 1) tempSquare.style.borderRadius = "3px";
    else if (i === 0) tempSquare.style.borderTopLeftRadius = "3px";
    else if (i === num - 1) tempSquare.style.borderTopRightRadius = "3px";
    else if (i === num * num - num) tempSquare.style.borderBottomLeftRadius = "3px";
    else if (i === num * num - 1) tempSquare.style.borderBottomRightRadius = "3px";
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
      if (hoveredSquare.style.backgroundColor !== BLACKBACKGROUND) {
        hoveredSquare.style.opacity = 0;
        hoveredSquare.style.backgroundColor = BLACKBACKGROUND;
      }
      newOpacity = (parseInt(hoveredSquare.style.opacity * 10) + 1) / 10;
      if (hoveredSquare.style.opacity >= 1) {
        newOpacity = 1;
      }
      hoveredSquare.style.opacity = newOpacity;
    } else {
      hoveredSquare.style.backgroundColor = BLACKBACKGROUND;
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
  return `rgba(${random(256)}, ${random(256)}, ${random(256)}, 1)`;
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

btnVanishing = document.querySelector(".btn-vanishing");
btnOnHover = document.querySelector(".btn-on-hover");
btnRainbow = document.querySelector(".btn-rainbow");
btnDarken = document.querySelector(".btn-darken");
btnClear = document.querySelector(".btn-clear");
// btnGrid = document.querySelector(".btn-grid");
btnEraser = document.querySelector(".btn-eraser");
btnColor = document.querySelector(".btn-color");

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

btnClear.addEventListener("click", (e) => {
  e.target.classList.toggle("btn-pushed");
  setTimeout(() => e.target.classList.toggle("btn-pushed"), 100);
  drawBoard(input.value);
});

// btnGrid.addEventListener("click", (e) => {
//   e.target.classList.toggle("btn-pushed");
//   boolDarken = !boolDarken;
//   drawBoard(input.value);
// });

btnEraser.addEventListener("click", (e) => {
  e.target.classList.toggle("btn-pushed");
  boolDarken = !boolDarken;
  drawBoard(input.value);
});

btnColor.addEventListener("click", (e) => {
  e.target.classList.toggle("btn-pushed");
  boolDarken = !boolDarken;
  drawBoard(input.value);
});

function disableDragAndDrop() {
  const body = document.querySelector("body");
  body.addEventListener("dragstart", (event) => {
    event.preventDefault();
  });
}

disableDragAndDrop();

color = "rgba(149, 232, 65, 0.8)";
arr = color.slice(5, color.length - 1);
arr = arr.replace(/ /g, "");
console.log(arr);

// clear

// grid lines 

// eraser

// color picker