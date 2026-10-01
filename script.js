const canvas = document.getElementById("gameMap");
const ctx = canvas.getContext("2d");

// Map size
const width = 40;
const height = 25;
const pixelSize = 20;

canvas.width = width * pixelSize;
canvas.height = height * pixelSize;

// Country colors
const countries = {
    A: "#4a90e2",
    B: "#e74c3c",
    C: "#2ecc71"
};

// Draw the map
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {

        let country = ".";

        // Country A
        if (x >= 5 && x <= 15 && y >= 5 && y <= 13) {
            country = "A";
        }

        // Country B
        if (x >= 20 && x <= 32 && y >= 4 && y <= 12) {
            country = "B";
        }

        // Country C
        if (x >= 13 && x <= 25 && y >= 14 && y <= 20) {
            country = "C";
        }

        if (country !== ".") {
            ctx.fillStyle = countries[country];
            ctx.fillRect(
                x * pixelSize,
                y * pixelSize,
                pixelSize,
                pixelSize
            );
        }
    }
}
