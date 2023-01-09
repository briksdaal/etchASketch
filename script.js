const DEFAULTNUMBEROFSQUARES = 16;
const TRANSITIONINTIME = 0.7;
const TRANSITIONOUTTIME = 3;
const MAXSQUARES = 100;

const WHITEBACKGROUND = "rgba(242, 238, 237, 1)";
let currentBackground = "rgba(0, 0, 0, 1)";

let boolOnHover = false;
let boolVanishing = false;
let boolRainbow = false;
let boolDarken = false;
let boolEraser = false;

const squaresContainer = document.querySelector(".squares-container");
const input = document.querySelector("input");
const colorPicker = document.querySelector(".color-picker");

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
    else if (i === num * num - num)
      tempSquare.style.borderBottomLeftRadius = "3px";
    else if (i === num * num - 1)
      tempSquare.style.borderBottomRightRadius = "3px";
    tempSquare.addEventListener("mouseenter", (e) => onEnterSquare(e));
    tempSquare.addEventListener("mousedown", (e) => onMousedownSquare(e));
    tempSquare.addEventListener("mouseleave", (e) => onLeaveSquare(e));
    arr.push(tempSquare);
  }
  squaresContainer.append(...arr);
}

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

function onLeaveSquare(hoveredSquareEvent) {
  if ((boolVanishing) && (boolOnHover || hoveredSquareEvent.buttons > 0)) {
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
});

btnOnHover.addEventListener("click", (e) => {
  e.target.classList.toggle("btn-pushed");
  boolOnHover = !boolOnHover;
});

btnRainbow.addEventListener("click", (e) => {
  e.target.classList.toggle("btn-pushed");
  boolRainbow = !boolRainbow;
  if (boolDarken) {
    boolDarken = false;
    btnDarken.classList.toggle("btn-pushed");
  }
});

btnDarken.addEventListener("click", (e) => {
  e.target.classList.toggle("btn-pushed");
  boolDarken = !boolDarken;
  if (boolRainbow) {
    boolRainbow = false;
    btnRainbow.classList.toggle("btn-pushed");
  }
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
  boolEraser = !boolEraser;
  if (boolOnHover) {
    boolOnHover = false;
    btnOnHover.classList.toggle("btn-pushed");
  }
});

colorPicker.addEventListener("input", (e) => {
  dummy = document.createElement("p");
  dummy.style.backgroundColor = e.target.value;
  currentBackground = dummy.style.backgroundColor;
});

function disableDragAndDrop() {
  const body = document.querySelector("body");
  body.addEventListener("dragstart", (event) => {
    event.preventDefault();
  });
}

disableDragAndDrop();

// clear

// grid lines

// eraser

// color picker
