const canvas = document.getElementById("gameMap");
const ctx = canvas.getContext("2d");

const width = 40;
const height = 25;
const pixelSize = 20;

canvas.width = width * pixelSize;
canvas.height = height * pixelSize;

const map = [];

for (let y = 0; y < height; y++) {
    map[y] = [];

    for (let x = 0; x < width; x++) {
        map[y][x] = null;
    }
}

const countries = {
    blue: "#4a90e2",
    red: "#e74c3c",
    green: "#2ecc71"
};

const countryNames = {
    blue: "Blue Country",
    red: "Red Country"
};

let selectedCountry = "blue";
let mouseDown = false;

function selectCountry(country) {
    selectedCountry = country;

    if (country === null) {
        document.getElementById("selected").textContent = "Selected: Eraser";
    } else {
        document.getElementById("selected").textContent =
            "Selected: " + countryNames[country];
    }
}

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

drawMap();
