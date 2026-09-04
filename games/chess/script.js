// =========================================
// GEORGE BOT - CHESS
// A simple, self-contained chess game for students.
// =========================================

window.initChess = function (container) {
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const pieceSymbols = {
        w: { k: "♔", q: "♕", r: "♖", b: "♗", n: "♘", p: "♙" },
        b: { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" }
    };

    const pieceNames = {
        k: "king",
        q: "queen",
        r: "rook",
        b: "bishop",
        n: "knight",
        p: "pawn"
    };

    let board;
    let turn;
    let selected;
    let gameOver;
    let enPassantTarget;
    let castling;
    let promotionPending;

    function startingBoard() {
        return [
            ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
            ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
            ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"]
        ];
    }

    function resetGame() {
        board = startingBoard();
        turn = "w";
        selected = null;
        gameOver = false;
        enPassantTarget = null;
        castling = { wK: true, wQ: true, bK: true, bQ: true };
        promotionPending = null;
        render();
    }

    function cloneState() {
        return {
            board: board.map(row => row.slice()),
            turn,
            enPassantTarget: enPassantTarget ? { ...enPassantTarget } : null,
            castling: { ...castling }
        };
    }

    function restoreState(state) {
        board = state.board.map(row => row.slice());
        turn = state.turn;
        enPassantTarget = state.enPassantTarget ? { ...state.enPassantTarget } : null;
        castling = { ...state.castling };
    }

    function inside(r, c) {
        return r >= 0 && r < 8 && c >= 0 && c < 8;
    }

    function opposite(color) {
        return color === "w" ? "b" : "w";
    }

    function pieceColor(piece) {
        return piece ? piece[0] : null;
    }

    function pieceType(piece) {
        return piece ? piece[1] : null;
    }

    function squareName(r, c) {
        return files[c] + (8 - r);
    }

    function findKing(color, position = board) {
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (position[r][c] === color + "k") {
                    return { r, c };
                }
            }
        }
        return null;
    }

    function squareAttacked(r, c, byColor, position = board) {
        const pawnRow = byColor === "w" ? r + 1 : r - 1;
        for (const dc of [-1, 1]) {
            const pc = c + dc;
            if (inside(pawnRow, pc) && position[pawnRow][pc] === byColor + "p") {
                return true;
            }
        }

        const knightSteps = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
        for (const [dr, dc] of knightSteps) {
            const nr = r + dr;
            const nc = c + dc;
            if (inside(nr, nc) && position[nr][nc] === byColor + "n") {
                return true;
            }
        }

        const kingSteps = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        for (const [dr, dc] of kingSteps) {
            const nr = r + dr;
            const nc = c + dc;
            if (inside(nr, nc) && position[nr][nc] === byColor + "k") {
                return true;
            }
        }

        const directions = [
            { steps: [[-1, 0], [1, 0], [0, -1], [0, 1]], pieces: ["r", "q"] },
            { steps: [[-1, -1], [-1, 1], [1, -1], [1, 1]], pieces: ["b", "q"] }
        ];

        for (const group of directions) {
            for (const [dr, dc] of group.steps) {
                let nr = r + dr;
                let nc = c + dc;
                while (inside(nr, nc)) {
                    const piece = position[nr][nc];
                    if (piece) {
                        if (pieceColor(piece) === byColor && group.pieces.includes(pieceType(piece))) {
                            return true;
                        }
                        break;
                    }
                    nr += dr;
                    nc += dc;
                }
            }
        }

        return false;
    }

    function inCheck(color, position = board) {
        const king = findKing(color, position);
        return king ? squareAttacked(king.r, king.c, opposite(color), position) : true;
    }

    function pseudoMoves(r, c, position = board) {
        const piece = position[r][c];
        if (!piece) return [];

        const color = pieceColor(piece);
        const type = pieceType(piece);
        const moves = [];

        function add(nr, nc, extra = {}) {
            if (!inside(nr, nc)) return;
            const target = position[nr][nc];
            if (!target || pieceColor(target) !== color) {
                moves.push({ from: { r, c }, to: { r: nr, c: nc }, ...extra });
            }
        }

        function slide(directions) {
            for (const [dr, dc] of directions) {
                let nr = r + dr;
                let nc = c + dc;
                while (inside(nr, nc)) {
                    const target = position[nr][nc];
                    if (!target) {
                        moves.push({ from: { r, c }, to: { r: nr, c: nc } });
                    } else {
                        if (pieceColor(target) !== color) {
                            moves.push({ from: { r, c }, to: { r: nr, c: nc } });
                        }
                        break;
                    }
                    nr += dr;
                    nc += dc;
                }
            }
        }

        if (type === "p") {
            const direction = color === "w" ? -1 : 1;
            const startRow = color === "w" ? 6 : 1;
            const oneRow = r + direction;
            if (inside(oneRow, c) && !position[oneRow][c]) {
                moves.push({ from: { r, c }, to: { r: oneRow, c } });
                const twoRow = r + direction * 2;
                if (r === startRow && !position[twoRow][c]) {
                    moves.push({ from: { r, c }, to: { r: twoRow, c }, doublePawn: true });
                }
            }
            for (const dc of [-1, 1]) {
                const nc = c + dc;
                if (!inside(oneRow, nc)) continue;
                const target = position[oneRow][nc];
                if (target && pieceColor(target) !== color) {
                    moves.push({ from: { r, c }, to: { r: oneRow, c: nc } });
                }
                if (enPassantTarget && enPassantTarget.r === oneRow && enPassantTarget.c === nc) {
                    moves.push({ from: { r, c }, to: { r: oneRow, c: nc }, enPassant: true });
                }
            }
        } else if (type === "n") {
            [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]].forEach(([dr, dc]) => add(r + dr, c + dc));
        } else if (type === "b") {
            slide([[-1, -1], [-1, 1], [1, -1], [1, 1]]);
        } else if (type === "r") {
            slide([[-1, 0], [1, 0], [0, -1], [0, 1]]);
        } else if (type === "q") {
            slide([[-1, -1], [-1, 1], [1, -1], [1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]]);
        } else if (type === "k") {
            [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].forEach(([dr, dc]) => add(r + dr, c + dc));

            const row = color === "w" ? 7 : 0;
            if (r === row && c === 4 && !inCheck(color, position)) {
                const kingSide = color === "w" ? castling.wK : castling.bK;
                const queenSide = color === "w" ? castling.wQ : castling.bQ;
                if (kingSide && position[row][5] === null && position[row][6] === null && position[row][7] === color + "r" &&
                    !squareAttacked(row, 5, opposite(color), position) && !squareAttacked(row, 6, opposite(color), position)) {
                    moves.push({ from: { r, c }, to: { r: row, c: 6 }, castle: "king" });
                }
                if (queenSide && position[row][1] === null && position[row][2] === null && position[row][3] === null && position[row][0] === color + "r" &&
                    !squareAttacked(row, 3, opposite(color), position) && !squareAttacked(row, 2, opposite(color), position)) {
                    moves.push({ from: { r, c }, to: { r: row, c: 2 }, castle: "queen" });
                }
            }
        }

        return moves;
    }

    function applyMove(move, color, promotionPiece = "q") {
        const piece = board[move.from.r][move.from.c];
        const captured = board[move.to.r][move.to.c];

        board[move.from.r][move.from.c] = null;
        board[move.to.r][move.to.c] = piece;

        if (move.enPassant) {
            const capturedRow = color === "w" ? move.to.r + 1 : move.to.r - 1;
            board[capturedRow][move.to.c] = null;
        }

        if (move.castle === "king") {
            board[move.to.r][5] = board[move.to.r][7];
            board[move.to.r][7] = null;
        }
        if (move.castle === "queen") {
            board[move.to.r][3] = board[move.to.r][0];
            board[move.to.r][0] = null;
        }

        if (pieceType(piece) === "p" && (move.to.r === 0 || move.to.r === 7)) {
            board[move.to.r][move.to.c] = color + promotionPiece;
        }

        updateCastlingRights(piece, move, captured);

        if (move.doublePawn) {
            enPassantTarget = {
                r: (move.from.r + move.to.r) / 2,
                c: move.from.c
            };
        } else {
            enPassantTarget = null;
        }
    }

    function updateCastlingRights(piece, move, captured) {
        const color = pieceColor(piece);
        const type = pieceType(piece);

        if (type === "k") {
            if (color === "w") {
                castling.wK = false;
                castling.wQ = false;
            } else {
                castling.bK = false;
                castling.bQ = false;
            }
        }

        if (type === "r") {
            if (move.from.r === 7 && move.from.c === 0) castling.wQ = false;
            if (move.from.r === 7 && move.from.c === 7) castling.wK = false;
            if (move.from.r === 0 && move.from.c === 0) castling.bQ = false;
            if (move.from.r === 0 && move.from.c === 7) castling.bK = false;
        }

        if (captured === "wr") {
            if (move.to.r === 7 && move.to.c === 0) castling.wQ = false;
            if (move.to.r === 7 && move.to.c === 7) castling.wK = false;
        }
        if (captured === "br") {
            if (move.to.r === 0 && move.to.c === 0) castling.bQ = false;
            if (move.to.r === 0 && move.to.c === 7) castling.bK = false;
        }
    }

    function legalMovesForSquare(r, c) {
        const piece = board[r][c];
        if (!piece || pieceColor(piece) !== turn) return [];

        const candidates = pseudoMoves(r, c);
        const legal = [];

        for (const move of candidates) {
            const state = cloneState();
            applyMove(move, turn, "q");
            if (!inCheck(turn)) legal.push(move);
            restoreState(state);
        }
        return legal;
    }

    function allLegalMoves(color) {
        const originalTurn = turn;
        turn = color;
        const result = [];
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (pieceColor(board[r][c]) === color) {
                    result.push(...legalMovesForSquare(r, c));
                }
            }
        }
        turn = originalTurn;
        return result;
    }

    function describeMove(move, piece) {
        return `${pieceNames[pieceType(piece)]} from ${squareName(move.from.r, move.from.c)} to ${squareName(move.to.r, move.to.c)}`;
    }

    function makeMove(move) {
        const movingColor = turn;
        const movingPiece = board[move.from.r][move.from.c];
        const reachesEnd = pieceType(movingPiece) === "p" && (move.to.r === 0 || move.to.r === 7);

        applyMove(move, movingColor, "q");

        if (reachesEnd) {
            promotionPending = { move, color: movingColor };
            showPromotionChoices();
            return;
        }

        finishTurn(movingColor, move, movingPiece);
    }

    function finishTurn(movingColor, move, movingPiece) {
        turn = opposite(movingColor);
        selected = null;
        const moves = allLegalMoves(turn);
        const checked = inCheck(turn);

        if (moves.length === 0) {
            gameOver = true;
            if (checked) {
                setStatus(`${turn === "w" ? "White" : "Black"} is in checkmate! 🏆 ${movingColor === "w" ? "White" : "Black"} wins!`);
            } else {
                setStatus("Stalemate! 🤝 The game is a draw.");
            }
        } else if (checked) {
            setStatus(`${turn === "w" ? "White" : "Black"} is in check! ⚠️`);
        } else {
            setStatus(`${turn === "w" ? "White" : "Black"}'s turn — click a piece to move.`);
        }

        render();
    }

    function setStatus(text) {
        const status = container.querySelector(".chess-status");
        if (status) status.textContent = text;
    }

    function showPromotionChoices() {
        const choices = container.querySelector(".chess-promotion");
        choices.hidden = false;
        choices.innerHTML = `<div class="chess-promotion-title">Choose a piece:</div>`;
        ["q", "r", "b", "n"].forEach(type => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "chess-promotion-button";
            button.textContent = pieceSymbols[promotionPending.color][type];
            button.setAttribute("aria-label", pieceNames[type]);
            button.addEventListener("click", () => promote(type));
            choices.appendChild(button);
        });
    }

    function promote(type) {
        const pending = promotionPending;
        promotionPending = null;
        board[pending.move.to.r][pending.move.to.c] = pending.color + type;
        container.querySelector(".chess-promotion").hidden = true;
        finishTurn(pending.color, pending.move, pending.color + "p");
    }

    function handleSquareClick(r, c) {
        if (gameOver || promotionPending) return;

        const piece = board[r][c];

        if (selected) {
            const move = legalMovesForSquare(selected.r, selected.c).find(m => m.to.r === r && m.to.c === c);
            if (move) {
                makeMove(move);
                return;
            }

            if (piece && pieceColor(piece) === turn) {
                selected = { r, c };
                render();
                return;
            }

            selected = null;
            render();
            return;
        }

        if (piece && pieceColor(piece) === turn) {
            selected = { r, c };
            render();
        }
    }

    function render() {
        container.innerHTML = `
            <div class="chess-game">
                <div class="chess-heading">
                    <h2>♟️ Chess</h2>
                    <p>Learn the moves. Think ahead. Have fun!</p>
                </div>

                <div class="chess-board" role="grid" aria-label="Chess board"></div>

                <div class="chess-status">${turn === "w" ? "White" : "Black"}'s turn — click a piece to move.</div>

                <div class="chess-promotion" hidden></div>

                <div class="chess-controls">
                    <button type="button" class="chess-new-game">New Game</button>
                    <button type="button" class="chess-help">How to Play</button>
                </div>

                <div class="chess-help-panel" hidden>
                    <strong>How to play</strong>
                    <p>White moves first. Click one of your pieces, then click a highlighted square.</p>
                    <p>♙ Pawn · ♖ Rook · ♘ Knight · ♗ Bishop · ♕ Queen · ♔ King</p>
                    <p>Your goal is to put the other king in <strong>checkmate</strong>.</p>
                </div>
            </div>
        `;

        const boardElement = container.querySelector(".chess-board");

        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const square = document.createElement("button");
                square.type = "button";
                square.className = `chess-square ${(r + c) % 2 === 0 ? "light" : "dark"}`;
                square.dataset.row = r;
                square.dataset.col = c;
                square.setAttribute("role", "gridcell");

                const piece = board[r][c];
                if (piece) {
                    square.textContent = pieceSymbols[pieceColor(piece)][pieceType(piece)];
                    square.classList.add(`piece-${pieceColor(piece)}`);
                    square.setAttribute("aria-label", `${pieceColor(piece) === "w" ? "White" : "Black"} ${pieceNames[pieceType(piece)]} on ${squareName(r, c)}`);
                } else {
                    square.setAttribute("aria-label", `Empty ${squareName(r, c)}`);
                }

                if (selected && selected.r === r && selected.c === c) {
                    square.classList.add("selected");
                }

                if (selected) {
                    const legal = legalMovesForSquare(selected.r, selected.c);
                    const target = legal.find(move => move.to.r === r && move.to.c === c);
                    if (target) square.classList.add(piece ? "capture-target" : "move-target");
                }

                if (piece && pieceType(piece) === "k" && pieceColor(piece) === turn && inCheck(turn)) {
                    square.classList.add("in-check");
                }

                square.addEventListener("click", () => handleSquareClick(r, c));
                boardElement.appendChild(square);
            }
        }

        container.querySelector(".chess-new-game").addEventListener("click", resetGame);
        container.querySelector(".chess-help").addEventListener("click", function () {
            const panel = container.querySelector(".chess-help-panel");
            panel.hidden = !panel.hidden;
        });
    }

    resetGame();
};
