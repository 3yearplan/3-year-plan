const canvas = document.getElementById("gameMap");
const ctx = canvas.getContext("2d");

const width = 40;
const height = 25;
const pixelSize = 20;

canvas.width = width * pixelSize;
canvas.height = height * pixelSize;

// Each pixel stores its country
const map = [];

for (let y = 0; y < height; y++) {
    map[y] = [];

    for (let x = 0; x < width; x++) {
        map[y][x] = null;
    }
}

// Countries
const countries = {
    blue: "#4a90e2",
    red: "#e74c3c",
    green: "#2ecc71"
};

let selectedCountry = "blue";
let mouseDown = false;

// Draw the entire map
function drawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            const country = map[y][x];

            if (country) {
                ctx.fillStyle = countries[country];
            } else {
                ctx.fillStyle = "#333";
            }

            ctx.fillRect(
                x * pixelSize,
                y * pixelSize,
                pixelSize,
                pixelSize
            );

            // Pixel grid
            ctx.strokeStyle = "#444";
            ctx.strokeRect(
                x * pixelSize,
                y * pixelSize,
                pixelSize,
                pixelSize
            );
        }
    }
}

// Paint a pixel
function paintPixel(event) {
    const rect = canvas.getBoundingClientRect();

    const x = Math.floor(
        (event.clientX - rect.left) / pixelSize
    );

    const y = Math.floor(
        (event.clientY - rect.top) / pixelSize
    );

    if (x >= 0 && x < width && y >= 0 && y < height) {
        map[y][x] = selectedCountry;
        drawMap();
    }
}

// Mouse controls
canvas.addEventListener("mousedown", (event) => {
    mouseDown = true;
    paintPixel(event);
});

canvas.addEventListener("mousemove", (event) => {
    if (mouseDown) {
        paintPixel(event);
    }
});

document.addEventListener("mouseup", () => {
    mouseDown = false;
});

// Keyboard controls
document.addEventListener("keydown", (event) => {

    if (event.key === "1") {
        selectedCountry = "blue";
    }

    if (event.key === "2") {
        selectedCountry = "red";
    }

    if (event.key === "3") {
        selectedCountry = "green";
    }

    if (event.key === "0") {
        selectedCountry = null;
    }
});

drawMap();
