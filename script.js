const canvas = document.getElementById("gameMap");
const ctx = canvas.getContext("2d");

const width = 40;
const height = 25;
const pixelSize = 20;

canvas.width = width * pixelSize;
canvas.height = height * pixelSize;


// ====================
// COUNTRY DATA
// ====================

const countries = {
    blue: {
        name: "Blue Country",
        color: "#4a90e2"
    },

    red: {
        name: "Red Country",
        color: "#e74c3c"
    },

    green: {
        name: "Green Country",
        color: "#2ecc71"
    },

    yellow: {
        name: "Yellow Country",
        color: "#f1c40f"
    },

    purple: {
        name: "Purple Country",
        color: "#9b59b6"
    }
};


// ====================
// MAP DATA
// ====================

const map = [];

for (let y = 0; y < height; y++) {
    map[y] = [];

    for (let x = 0; x < width; x++) {
        map[y][x] = {
            country: null
        };
    }
}


// ====================
// GAME VARIABLES
// ====================

let selectedCountry = "blue";
let mouseDown = false;


// ====================
// COUNTRY SELECTION
// ====================

function selectCountry(country) {
    selectedCountry = country;

    if (country === null) {
        document.getElementById("selected").textContent =
            "Selected: Eraser";
    } else {
        document.getElementById("selected").textContent =
            "Selected: " + countries[country].name;
    }
}


// ====================
// CREATE STARTING MAP
// ====================

function createStartingMap() {

    // Blue territory
    for (let y = 5; y < 13; y++) {
        for (let x = 6; x < 13; x++) {

            if (
                (y === 5 && (x === 6 || x === 12)) ||
                (y === 12 && (x === 6 || x === 12))
            ) {
                continue;
            }

            map[y][x].country = "blue";
        }
    }


    // Red territory
    for (let y = 5; y < 13; y++) {
        for (let x = 27; x < 34; x++) {

            if (
                (y === 5 && (x === 27 || x === 33)) ||
                (y === 12 && (x === 27 || x === 33))
            ) {
                continue;
            }

            map[y][x].country = "red";
        }
    }


    // Green territory
    for (let y = 17; y < 22; y++) {
        for (let x = 16; x < 24; x++) {
            map[y][x].country = "green";
        }
    }
}


// ====================
// DRAW MAP
// ====================

function drawMap() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Draw colors
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            const country = map[y][x].country;

            if (country && countries[country]) {
                ctx.fillStyle = countries[country].color;
            } else {
                ctx.fillStyle = "#333";
            }

            ctx.fillRect(
                x * pixelSize,
                y * pixelSize,
                pixelSize,
                pixelSize
            );
        }
    }


    // Draw grid
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 1;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            ctx.strokeRect(
                x * pixelSize,
                y * pixelSize,
                pixelSize,
                pixelSize
            );
        }
    }


    // Draw country borders
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 3;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            const country = map[y][x].country;


            // Right border
            if (x < width - 1) {

                const rightCountry =
                    map[y][x + 1].country;

                if (
                    country !== rightCountry &&
                    (country || rightCountry)
                ) {

                    ctx.beginPath();

                    ctx.moveTo(
                        (x + 1) * pixelSize,
                        y * pixelSize
                    );

                    ctx.lineTo(
                        (x + 1) * pixelSize,
                        (y + 1) * pixelSize
                    );

                    ctx.stroke();
                }
            }


            // Bottom border
            if (y < height - 1) {

                const bottomCountry =
                    map[y + 1][x].country;

                if (
                    country !== bottomCountry &&
                    (country || bottomCountry)
                ) {

                    ctx.beginPath();

                    ctx.moveTo(
                        x * pixelSize,
                        (y + 1) * pixelSize
                    );

                    ctx.lineTo(
                        (x + 1) * pixelSize,
                        (y + 1) * pixelSize
                    );

                    ctx.stroke();
                }
            }
        }
    }

    ctx.lineWidth = 1;
}


// ====================
// PAINT PIXEL
// ====================

function paintPixel(event) {

    const rect = canvas.getBoundingClientRect();

    const x = Math.floor(
        (event.clientX - rect.left)
        * canvas.width
        / rect.width
        / pixelSize
    );

    const y = Math.floor(
        (event.clientY - rect.top)
        * canvas.height
        / rect.height
        / pixelSize
    );


    if (
        x >= 0 &&
        x < width &&
        y >= 0 &&
        y < height
    ) {

        map[y][x].country = selectedCountry;

        drawMap();
    }
}


// ====================
// MOUSE CONTROLS
// ====================

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


// ====================
// START GAME
// ====================

createStartingMap();

drawMap();
