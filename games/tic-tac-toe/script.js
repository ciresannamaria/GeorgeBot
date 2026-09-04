// =========================================
// GEORGE BOT - TIC-TAC-TOE
// =========================================

window.initTicTacToe = function (container) {

    container.innerHTML = `
        <div class="tic-tac-toe-game">
            <div class="tic-tac-toe-header">
                <h2>🎮 Tic-Tac-Toe</h2>
                <p id="tic-tac-toe-status">Your turn — you are X</p>
            </div>

            <div class="tic-tac-toe-board" aria-label="Tic-Tac-Toe board">
                <button class="tic-cell" data-index="0" aria-label="Cell 1"></button>
                <button class="tic-cell" data-index="1" aria-label="Cell 2"></button>
                <button class="tic-cell" data-index="2" aria-label="Cell 3"></button>
                <button class="tic-cell" data-index="3" aria-label="Cell 4"></button>
                <button class="tic-cell" data-index="4" aria-label="Cell 5"></button>
                <button class="tic-cell" data-index="5" aria-label="Cell 6"></button>
                <button class="tic-cell" data-index="6" aria-label="Cell 7"></button>
                <button class="tic-cell" data-index="7" aria-label="Cell 8"></button>
                <button class="tic-cell" data-index="8" aria-label="Cell 9"></button>
            </div>

            <button class="tic-restart" type="button">Play again</button>
        </div>
    `;

    const cells = container.querySelectorAll(".tic-cell");
    const status = container.querySelector("#tic-tac-toe-status");
    const restartButton = container.querySelector(".tic-restart");

    let board = ["", "", "", "", "", "", "", "", ""];
    let gameOver = false;

    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWinner(player) {
        return winningLines.some(line =>
            line.every(index => board[index] === player)
        );
    }

    function checkDraw() {
        return board.every(cell => cell !== "");
    }

    function endGame(message) {
        gameOver = true;
        status.textContent = message;
        cells.forEach(cell => cell.disabled = true);
    }

    function computerMove() {
        const emptyCells = board
            .map((value, index) => value === "" ? index : null)
            .filter(index => index !== null);

        if (emptyCells.length === 0 || gameOver) return;

        // Try to win.
        for (const index of emptyCells) {
            board[index] = "O";
            if (checkWinner("O")) {
                renderBoard();
                endGame("GeorgeBot wins! 🤖");
                return;
            }
            board[index] = "";
        }

        // Try to block the player.
        for (const index of emptyCells) {
            board[index] = "X";
            if (checkWinner("X")) {
                board[index] = "O";
                renderBoard();
                status.textContent = "Your turn — you are X";
                return;
            }
            board[index] = "";
        }

        // Otherwise choose a random empty square.
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomIndex] = "O";
        renderBoard();

        if (checkWinner("O")) {
            endGame("GeorgeBot wins! 🤖");
        } else if (checkDraw()) {
            endGame("It's a draw! 🤝");
        } else {
            status.textContent = "Your turn — you are X";
        }
    }

    function renderBoard() {
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
            cell.classList.toggle("x", board[index] === "X");
            cell.classList.toggle("o", board[index] === "O");
        });
    }

    function playerMove(event) {
        const index = Number(event.currentTarget.dataset.index);

        if (gameOver || board[index] !== "") return;

        board[index] = "X";
        renderBoard();

        if (checkWinner("X")) {
            endGame("You win! 🎉");
            return;
        }

        if (checkDraw()) {
            endGame("It's a draw! 🤝");
            return;
        }

        status.textContent = "GeorgeBot is thinking... 🤖";
        setTimeout(computerMove, 400);
    }

    function restartGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        gameOver = false;
        cells.forEach(cell => cell.disabled = false);
        status.textContent = "Your turn — you are X";
        renderBoard();
    }

    cells.forEach(cell => cell.addEventListener("click", playerMove));
    restartButton.addEventListener("click", restartGame);

    renderBoard();
};
