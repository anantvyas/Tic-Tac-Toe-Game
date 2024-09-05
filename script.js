// Selecting the boxes and initializing turn variables
let boxes = document.querySelectorAll(".box");

let turn = "X";
let isGameOver = false;

// Sound files for X turn, O turn, win, and draw
const turnXSound = new Audio('turn-X-audio.mp3');
const turnOSound = new Audio('turn-O-audio.mp3');
const winSound = new Audio('win-sound.wav');
const drawSound = new Audio('draw-sound.wav');

turnXSound.volume = 1.0;  // Set volume (1.0 is 100%)
turnOSound.volume = 1.0;
winSound.volume = 1.0;
drawSound.volume = 1.0;

// Adding event listeners for each box
boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            playTurnSound(); // Play sound for each move
            cheakWin();
            cheakDraw();
            changeTurn();
        }
    });
});

// Function to change the turn and update the UI
function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

// Function to check for win conditions
function cheakWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if (v0 != "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " wins";
            document.querySelector("#play-again").style.display = "inline";

            // Highlight winning boxes
            for (let j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6";
                boxes[winConditions[i][j]].style.color = "#000";
            }

            playWinSound(); // Play winning sound
        }
    }
}

// Function to check for a draw
function cheakDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        });

        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline";
            playDrawSound(); // Play draw sound
        }
    }
}

// Event listener for the Play Again button
document.querySelector("#play-again").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    // Reset each box
    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff";
    });
});

// Function to play the correct sound for each turn
function playTurnSound() {
    if (turn === "X") {
        turnXSound.play();  // Play X sound
    } else {
        turnOSound.play();  // Play O sound
    }
}

// Function to play the winning sound
function playWinSound() {
    winSound.play();
}

// Function to play the draw sound
function playDrawSound() {
    drawSound.play();
}

