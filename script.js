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

let nextTerritoryID = 1;

const territories = {};

for (let y = 0; y < height; y++) {
    map[y] = [];

    for (let x = 0; x < width; x++) {
        const territoryID = nextTerritoryID;

        map[y][x] = {
            territory: territoryID
        };

        territories[territoryID] = {
            owner: null
        };

        nextTerritoryID++;
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
// DRAW MAP
// ====================

function drawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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


// ====================
// PAINT PIXEL
// ====================

function findTerritories() {
    const visited = [];
    const foundTerritories = [];

    for (let y = 0; y < height; y++) {
        visited[y] = [];

        for (let x = 0; x < width; x++) {
            visited[y][x] = false;
        }
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {

            if (visited[y][x]) {
                continue;
            }

            const country = map[y][x].country;

            if (country === null) {
                visited[y][x] = true;
                continue;
            }

            const territory = [];
            const queue = [[x, y]];

            visited[y][x] = true;

            while (queue.length > 0) {
                const [currentX, currentY] = queue.shift();

                territory.push([currentX, currentY]);

                const neighbors = [
                    [currentX + 1, currentY],
                    [currentX - 1, currentY],
                    [currentX, currentY + 1],
                    [currentX, currentY - 1]
                ];

                for (const [nx, ny] of neighbors) {

                    if (
                        nx >= 0 &&
                        nx < width &&
                        ny >= 0 &&
                        ny < height &&
                        !visited[ny][nx] &&
                        map[ny][nx].country === country
                    ) {
                        visited[ny][nx] = true;
                        queue.push([nx, ny]);
                    }
                }
            }

            foundTerritories.push({
                country: country,
                pixels: territory
            });
        }
    }

    return foundTerritories;
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
        const territoryID = map[y][x].territory;

territories[territoryID].owner = selectedCountry;

map[y][x].country = selectedCountry;

drawMap();

const foundTerritories = findTerritories();

console.log(foundTerritories);
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

drawMap();
