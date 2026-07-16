const container = document.querySelector("#grid-container");
const slider = document.querySelector(".custom-slider");
const output = document.querySelector(".slider-value");
const erase = document.querySelector(".erase");
const pickColorBtn = document.querySelector(".color");
const toggleGridBtn = document.querySelector(".toggle-Grid-Line");
const clearBtn = document.querySelector(".clear");
const circleColor = document.querySelector(".circle-Color");

const pickerContainer = document.querySelector("#pickerContainer");

let isEraserOn = false;
let currentColor = "#000000";
let showGridLines = true;

const colorPicker = new iro.ColorPicker("#pickerContainer", {
  width: 150,
  color: currentColor,
  layout: [
    { component: iro.ui.Box },
    { component: iro.ui.Slider, options: { sliderType: "hue" } },
  ],
});

pickColorBtn.addEventListener("click", () => {
  isEraserOn = false;
  erase.style.backgroundColor = "";
  erase.textContent = "Erase";

  if (
    pickerContainer.style.display === "none" ||
    pickerContainer.style.display === ""
  ) {
    pickerContainer.style.display = "flex";
  } else {
    pickerContainer.style.display = "none";
  }
});

colorPicker.on("color:change", function (color) {
  currentColor = color.hexString;
  document.querySelector(".circle-Color").style.backgroundColor =
    color.hexString;
});

erase.addEventListener("click", () => {
  isEraserOn = !isEraserOn;

  if (isEraserOn) {
    erase.classList.add("active"); // Inverts button to white text on black background
    erase.textContent = "Erasing";
    pickerContainer.style.display = "none";
  } else {
    erase.classList.remove("active"); // Safely restores original button state layout
    erase.textContent = "Erase";
  }
});

toggleGridBtn.addEventListener("click", () => {
  showGridLines = !showGridLines;

  const squares = document.querySelectorAll(".grid-square");

  squares.forEach((square) => {
    if (showGridLines) {
      square.style.border = "1px solid #ddd";
    } else {
      square.style.border = "none";
    }
  });
});

clearBtn.addEventListener("click", () => {
  // 1. Grab every single square currently on your drawing pad
  const squares = document.querySelectorAll(".grid-square");

  // 2. Loop through each one and reset its color to white
  squares.forEach((square) => {
    square.style.backgroundColor = "white";
  });
});

function createGridElements(size) {
  container.innerHTML = "";

  const totalSquares = size * size;
  const squareSizePercentage = 100 / size;

  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-square");

    square.style.width = `${squareSizePercentage}%`;
    square.style.height = `${squareSizePercentage}%`;

    if (!showGridLines) {
      square.style.border = "none";
    }

    square.addEventListener("mousedown", () => {
      square.style.backgroundColor = isEraserOn ? "white" : currentColor;

      pickerContainer.style.display = "none";
    });

    square.addEventListener("mouseenter", (event) => {
      if (event.buttons === 1) {
        square.style.backgroundColor = isEraserOn ? "white" : currentColor;

        pickerContainer.style.display = "none";
      }
    });

    container.appendChild(square);
  }
}

slider.addEventListener("input", function () {
  output.textContent = `${this.value} x ${this.value}`;
  const currentSize = Number(this.value);
  createGridElements(currentSize);
});

createGridElements(16);
