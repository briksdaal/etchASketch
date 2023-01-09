const DEFAULTNUMBEROFSQUARES = 16;
const TRANSITIONINTIME = 0.7;
const TRANSITIONOUTTIME = 3;
const MAXSQUARES = 64;
const WHITEBACKGROUND = "rgba(242, 238, 237, 1)";
const BLACKBACKGROUND = "rgba(0, 0, 0, 1)";

let currentBackground = BLACKBACKGROUND;
let boolOnHover = false;
let boolVanishing = false;
let boolRainbow = false;
let boolDarken = false;
let boolEraser = false;

const squaresContainer = document.querySelector(".squares-container");
const input = document.querySelector("input[type=range]");
const colorPicker = document.querySelector("input[type=color]");
const btnVanishing = document.querySelector(".btn-vanishing");
const btnOnHover = document.querySelector(".btn-on-hover");
const btnRainbow = document.querySelector(".btn-rainbow");
const btnDarken = document.querySelector(".btn-darken");
const btnClear = document.querySelector(".btn-clear");
const btnGrid = document.querySelector(".btn-grid");
const btnEraser = document.querySelector(".btn-eraser");
const btnColor = document.querySelector(".btn-color");

function drawBoard(newNumOfSquares) {
  clearSquares();
  if (newNumOfSquares >= MAXSQUARES) {
    newNumOfSquares = MAXSQUARES;
  } else if (newNumOfSquares < 1) {
    newNumOfSquares = 1;
  }
  createSquares(newNumOfSquares);
}

function changeInputElements(newNumOfSquares) {
  input.value = newNumOfSquares;
  input.nextElementSibling.textContent = `${newNumOfSquares} X ${newNumOfSquares}`;
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
    else if (i === num * num - num)
      tempSquare.style.borderBottomLeftRadius = "3px";
    else if (i === num * num - 1)
      tempSquare.style.borderBottomRightRadius = "3px";

    if (i < num) tempSquare.style.borderTop = "0";
    if (i % num === 0) tempSquare.style.borderLeft = "0";

    tempSquare.addEventListener("mouseenter", (e) => onEnterSquare(e));
    tempSquare.addEventListener("mousedown", (e) => onMousedownSquare(e));
    tempSquare.addEventListener("mouseleave", (e) => onLeaveSquare(e));
    arr.push(tempSquare);
  }
  squaresContainer.append(...arr);
}

// for all enter square events, both when hovering and clicking
function onEnterSquare(hoveredSquareEvent) {
  if (boolOnHover || hoveredSquareEvent.buttons > 0) {
    const hoveredSquare = hoveredSquareEvent.target;
    if (boolEraser) {
      hoveredSquare.style.backgroundColor = WHITEBACKGROUND;
    } else if (boolDarken) {
      darken(hoveredSquare);
    } else if (boolRainbow) {
      hoveredSquare.style.backgroundColor = randomColor();
    } else {
      hoveredSquare.style.backgroundColor = currentBackground;
    }
    hoveredSquare.style.transitionDuration = TRANSITIONINTIME + "s";
  }
}

// specifically to deal with the first square being clicked on
function onMousedownSquare(hoveredSquareEvent) {
  const hoveredSquare = hoveredSquareEvent.target;
  if (boolEraser) {
    hoveredSquare.style.backgroundColor = WHITEBACKGROUND;
  } else if (boolDarken) {
    darken(hoveredSquare);
  } else if (boolRainbow) {
    hoveredSquare.style.backgroundColor = randomColor();
  } else {
    hoveredSquare.style.backgroundColor = currentBackground;
  }
  hoveredSquare.style.transitionDuration = TRANSITIONINTIME + "s";
}

// for the vanishing ink effect
function onLeaveSquare(hoveredSquareEvent) {
  if (boolVanishing && (boolOnHover || hoveredSquareEvent.buttons > 0)) {
    const hoveredSquare = hoveredSquareEvent.target;
    setTimeout(() => {
      hoveredSquare.style.transitionDuration = TRANSITIONOUTTIME + "s";
      hoveredSquare.style.backgroundColor = WHITEBACKGROUND;
    }, TRANSITIONINTIME * 1000);
  }
}

function random(n) {
  return Math.floor(Math.random() * n);
}

function randomColor() {
  return `rgba(${random(256)}, ${random(256)}, ${random(256)}, 1)`;
}

// calculates rgba and ups alpha by 10% if necessary
function darken(square) {
  if (!compareColors(square.style.backgroundColor, currentBackground)) {
    square.style.backgroundColor = zeroizeAlpha(currentBackground);
  }
  square.style.backgroundColor = raiseAlpha(square.style.backgroundColor);
}

function zeroizeAlpha(color) {
  const rgba = getRGBA(color);
  rgba[3] = 0;
  return createRGBAtring(rgba);
}

function raiseAlpha(color) {
  const rgba = getRGBA(color);
  if (rgba[3] < 1) rgba[3] = rgba[3] + 0.1;
  return createRGBAtring(rgba);
}

function createRGBAtring(rgbaArr) {
  return `rgba(${rgbaArr[0]}, ${rgbaArr[1]}, ${rgbaArr[2]}, ${rgbaArr[3]})`;
}

//gets rgba array back from rgb and rgba strings
function getRGBA(color) {
  let rgbaArray;
  let slicePosition;

  if (color.charAt(3) != "a") slicePosition = 4;
  else slicePosition = 5;

  rgbaArray = color
    .slice(slicePosition, color.length - 1)
    .replace(/ /g, "")
    .split(",");

  for (let i = 0; i < rgbaArray.length; i++)
    rgbaArray[i] = parseFloat(rgbaArray[i]);

  if (rgbaArray.length === 3) rgbaArray.push(1);

  return rgbaArray;
}

function compareColors(color1, color2, alpha) {
  // alpha = false for no alpha, true for alpha
  color1Rgba = getRGBA(color1);
  color2Rgba = getRGBA(color2);

  let till = color1Rgba.length;
  if (!alpha) till--;

  for (let i = 0; i < till; i++) {
    if (color1Rgba[i] !== color2Rgba[i]) return false;
  }

  return true;
}

// redraw after input slider change
input.addEventListener("change", (e) => {
  drawBoard(e.target.value);
});

input.addEventListener("input", (e) => {
  changeInputElements(e.target.value);
});

changeInputElements;

// buttons listeners for effects and events
btnVanishing.addEventListener("click", (e) => {
  e.target.classList.toggle("btn-pushed");
  boolVanishing = !boolVanishing;

  boolEraser = false;
  btnEraser.classList.remove("btn-pushed");
});

btnOnHover.addEventListener("click", (e) => {
  e.target.classList.toggle("btn-pushed");
  boolOnHover = !boolOnHover;

  boolEraser = false;
  btnEraser.classList.remove("btn-pushed");
});

btnRainbow.addEventListener("click", (e) => {
  e.target.classList.toggle("btn-pushed");
  boolRainbow = !boolRainbow;

  boolDarken = false;
  btnDarken.classList.remove("btn-pushed");

  boolEraser = false;
  btnEraser.classList.remove("btn-pushed");
});

btnDarken.addEventListener("click", (e) => {
  e.target.classList.toggle("btn-pushed");
  boolDarken = !boolDarken;

  boolRainbow = false;
  btnRainbow.classList.remove("btn-pushed");

  boolEraser = false;
  btnEraser.classList.remove("btn-pushed");
});

btnClear.addEventListener("click", (e) => {
  e.target.classList.toggle("btn-pushed");
  setTimeout(() => e.target.classList.toggle("btn-pushed"), 100);

  boolEraser = false;
  btnEraser.classList.remove("btn-pushed");

  boolVanishing = false;
  btnVanishing.classList.remove("btn-pushed");

  boolOnHover = false;
  btnOnHover.classList.remove("btn-pushed");

  boolRainbow = false;
  btnRainbow.classList.remove("btn-pushed");

  boolDarken = false;
  btnDarken.classList.remove("btn-pushed");
  
  currentBackground = BLACKBACKGROUND;
  colorPicker.value = "#000000";

  drawBoard(input.value);
});

btnGrid.addEventListener("click", (e) => {
  e.target.classList.toggle("btn-pushed");
  squaresContainer.classList.toggle("grid");
});

btnEraser.addEventListener("click", (e) => {
  e.target.classList.toggle("btn-pushed");
  boolEraser = !boolEraser;

  boolVanishing = false;
  btnVanishing.classList.remove("btn-pushed");

  boolOnHover = false;
  btnOnHover.classList.remove("btn-pushed");

  boolRainbow = false;
  btnRainbow.classList.remove("btn-pushed");

  boolDarken = false;
  btnDarken.classList.remove("btn-pushed");
});

colorPicker.addEventListener("input", (e) => {
  dummy = document.createElement("p");
  dummy.style.backgroundColor = e.target.value;
  currentBackground = dummy.style.backgroundColor;
});

// disabling drag and drop prevents a grab icon from showing up during drawing
function disableDragAndDrop() {
  const body = document.querySelector("body");
  body.addEventListener("dragstart", (event) => {
    event.preventDefault();
  });
}
disableDragAndDrop();

input.max = MAXSQUARES;
// main drawing function
changeInputElements(DEFAULTNUMBEROFSQUARES);
drawBoard(DEFAULTNUMBEROFSQUARES);
