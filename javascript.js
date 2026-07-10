const container = document.querySelector("#grid-container");
const gridSize = 16;
const totalSquares = gridSize * gridSize; // 256

function createGridElements() {
  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-square");

    square.addEventListener("mousedown", () => {
      square.style.backgroundColor = "black";
    });

    square.addEventListener("mouseenter", (event) => {
      if (event.buttons === 1) {
        square.style.backgroundColor = "black";
      }
    });
    container.appendChild(square);
  }
}

createGridElements();
