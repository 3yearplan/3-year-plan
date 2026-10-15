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
            country: null,
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
// FIND TERRITORIES
// ====================

function findTerritories() {
    const visited = [];
    const foundTerritories = [];
    let territoryID = 1;

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

            for (const [px, py] of territory) {
                map[py][px].territory = territoryID;
            }

            foundTerritories.push({
                id: territoryID,
                country: country,
                pixels: territory
            });

            territoryID++;
        }
    }

    return foundTerritories;
}


// ====================
// CREATE STARTING MAP
// ====================

function createStartingMap() {

    // ====================
    // BLUE TERRITORY
    // ====================

    const bluePixels = [
        [7, 5], [8, 5], [9, 5], [10, 5], [11, 5], [12, 5],
        [6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6], [12, 6], [13, 6],
        [5, 7], [6, 7], [7, 7], [8, 7], [9, 7], [10, 7], [11, 7], [12, 7], [13, 7],
        [5, 8], [6, 8], [7, 8], [8, 8], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
        [6, 9], [7, 9], [8, 9], [9, 9], [10, 9], [11, 9], [12, 9], [13, 9],
        [6, 10], [7, 10], [8, 10], [9, 10], [10, 10], [11, 10], [12, 10],
        [7, 11], [8, 11], [9, 11], [10, 11], [11, 11], [12, 11],
        [8, 12], [9, 12], [10, 12], [11, 12]
    ];

    for (const [x, y] of bluePixels) {
        map[y][x].country = "blue";
    }


    // ====================
    // RED TERRITORY
    // ====================

    const redPixels = [
        [28, 5], [29, 5], [30, 5], [31, 5], [32, 5],
        [27, 6], [28, 6], [29, 6], [30, 6], [31, 6], [32, 6], [33, 6],
        [26, 7], [27, 7], [28, 7], [29, 7], [30, 7], [31, 7], [32, 7], [33, 7], [34, 7],
        [26, 8], [27, 8], [28, 8], [29, 8], [30, 8], [31, 8], [32, 8], [33, 8], [34, 8],
        [27, 9], [28, 9], [29, 9], [30, 9], [31, 9], [32, 9], [33, 9],
        [27, 10], [28, 10], [29, 10], [30, 10], [31, 10], [32, 10],
        [28, 11], [29, 11], [30, 11], [31, 11], [32, 11],
        [29, 12], [30, 12], [31, 12]
    ];

    for (const [x, y] of redPixels) {
        map[y][x].country = "red";
    }


    // ====================
    // GREEN TERRITORY
    // ====================

    const greenPixels = [
        [16, 17], [17, 17], [18, 17], [19, 17], [20, 17], [21, 17], [22, 17],
        [15, 18], [16, 18], [17, 18], [18, 18], [19, 18], [20, 18], [21, 18], [22, 18], [23, 18],
        [15, 19], [16, 19], [17, 19], [18, 19], [19, 19], [20, 19], [21, 19], [22, 19], [23, 19],
        [16, 20], [17, 20], [18, 20], [19, 20], [20, 20], [21, 20], [22, 20],
        [17, 21], [18, 21], [19, 21], [20, 21], [21, 21]
    ];

    for (const [x, y] of greenPixels) {
        map[y][x].country = "green";
    }

    findTerritories();
}

// ====================
// DRAW MAP
// ====================

function drawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the map
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

    // Draw the normal grid
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

    // Draw territory borders
    drawTerritoryBorders();
}
// ====================
// PAINT PIXEL
// ====================

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

        const foundTerritories = findTerritories();

        console.log(foundTerritories);

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

window.addEventListener("load", () => {
    drawMap();
});
