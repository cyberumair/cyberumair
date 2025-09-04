// PicAnime
const profilePic = document.getElementById("picSec");

setTimeout(() => {
        profilePic.style.transform = "scale(1)"; // Scale to 1
}, 800);

// Binary Canvas

// Get the canvas element
const canvas = document.getElementById("BinaryCanvas");
const ctx = canvas.getContext("2d");

// Set the width and height of the canvas
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Create an array of characters
const characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

// Create an array of columns
const columns = Math.floor(canvasWidth / 20);

// Initialize the y positions of the columns
const yPositions = [];

for (let i = 0; i < columns; i++) {
        yPositions[i] = Math.random() * canvasHeight;
}

// Update the Binary animation
function updateBinary() {
        // Set the background color
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        // Set the text color and font
        ctx.fillStyle = "yellow";
        ctx.font = "12px timesnewroman";
        
        // Loop through each column
        for (let i = 0; i < columns; i++) {
                // Select a random character from the array
                const character = characters[Math.floor(Math.random() * characters.length)];
                
                // Set the y position of the current column
                const y = yPositions[i];
                
                // Draw the character at the current position
                ctx.fillText(character, i * 20, y);
                
                // Move the column down by 20 units
                yPositions[i] += 20;
                
                // Reset the position if it reaches the bottom of the canvas
                if (yPositions[i] > canvasHeight && Math.random() > 0.98) {
                        yPositions[i] = 0;
                }
        }
}

// Render the binary animation
function renderBinary() {
        requestAnimationFrame(renderBinary);
        updateBinary();
}

// Start the animation
renderBinary();

const words = ["Python Dev", "Ethical Hacker", "Cyber Beginner"];
let wordIndex = 0;
const textElement = document.getElementById("changing-text");
const cursorElement = document.querySelector(".cursor");

function deleteText() {
        let currentText = textElement.textContent;
        if (currentText.length > 0) {
                // Move cursor left while deleting
                cursorElement.style.animation = "move-left 0.5s forwards";
                textElement.textContent = currentText.slice(0, -1);
                setTimeout(deleteText, 100); // Delete one character every 100ms
        } else {
                setTimeout(addText, 500); // Start adding next word after a brief pause
        }
}

function addText() {
        const nextWord = words[wordIndex];
        let currentText = textElement.textContent;
        if (currentText.length < nextWord.length) {
                // Move cursor right while adding
                cursorElement.style.animation = "move-right 0.5s forwards";
                textElement.textContent = nextWord.slice(0, currentText.length + 1);
                setTimeout(addText, 100); // Add one character every 100ms
        } else {
                wordIndex = (wordIndex + 1) % words.length; // Move to next word
                setTimeout(deleteText, 2000); // Wait 2 seconds before deleting again
        }
}

// Start the cycle
setTimeout(deleteText, 2000); // Start after 2 seconds