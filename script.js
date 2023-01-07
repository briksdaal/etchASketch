const DEFAULTNUMBEROFSQUARES = 16;

const squaresContainer = document.querySelector(".squares-container");
const input = document.querySelector("input");

initiateBoard();

function initiateBoard() {
  createSquares(DEFAULTNUMBEROFSQUARES);
  input.value = DEFAULTNUMBEROFSQUARES;
}

function createSquares(num) {
  squaresContainer.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
  const square = document.createElement("div");
  // square.classList.add("square");

  // square.addEventListener("mouseenter", () => console.log("a"));
  // square.addEventListener("mouseleave", removeHover);

  const arr = [];
  for (let i = 0; i < num * num; i++) {
    tempSquare = square.cloneNode(true);
    tempSquare.addEventListener("mouseenter", (e) => onEnterSquare(e.target));
    tempSquare.addEventListener("mouseleave", (e) => onLeaveSquare(e.target));
    arr.push(tempSquare);
  }
  squaresContainer.append(...arr);
}

function onEnterSquare(hoveredSquare) {
  hoveredSquare.style.backgroundColor = "#000";
}

function onLeaveSquare(hoveredSquare) {
  
}

function clearSquares() {
  while (squaresContainer.lastChild) {
    squaresContainer.removeChild(squaresContainer.lastChild);
  }
}

input.addEventListener("input", (e) => {
  clearSquares();
  let newNumOfSquares = e.target.value;
  if (newNumOfSquares >= 100) newNumOfSquares = 100;
  else if (newNumOfSquares < 1) newNumOfSquares = 1;
  input.value = newNumOfSquares;
  createSquares(newNumOfSquares);
});
