// =========================================
// GEORGE BOT
// Chatbot behaviour
// =========================================

const chat = document.getElementById("chat");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");


// =========================================
// ACTIVITIES MENU
// =========================================

const activitiesButton = document.getElementById("activities-button");
const activitiesMenu = document.getElementById("activities-menu");
const closeActivitiesButton = document.getElementById("close-activities-button");

function openActivities() {
    activitiesMenu.hidden = false;
    activitiesButton.setAttribute("aria-expanded", "true");
}

function closeActivities() {
    activitiesMenu.hidden = true;
    activitiesButton.setAttribute("aria-expanded", "false");
}

activitiesButton.addEventListener("click", function() {
    if (activitiesMenu.hidden) {
        openActivities();
    } else {
        closeActivities();
    }
});

closeActivitiesButton.addEventListener("click", closeActivities);


// =========================================
// GAME ELEMENTS
// =========================================

const ticTacToeButton = document.getElementById("tic-tac-toe-button");
const gameModal = document.getElementById("game-modal");
const gameContainer = document.getElementById("game-container");
const closeGameButton = document.getElementById("close-game-button");

let ticTacToeLoaded = false;


// =========================================
// LOAD TIC-TAC-TOE
// =========================================

function loadTicTacToe() {

    if (ticTacToeLoaded) {
        window.initTicTacToe(gameContainer);
        return;
    }

    const gameStyle = document.createElement("link");
    gameStyle.rel = "stylesheet";
    gameStyle.href = "games/tic-tac-toe/style.css";
    document.head.appendChild(gameStyle);

    const gameScript = document.createElement("script");
    gameScript.src = "games/tic-tac-toe/script.js";

    gameScript.onload = function() {
        ticTacToeLoaded = true;
        window.initTicTacToe(gameContainer);
    };

    gameContainer.innerHTML = "<p>Loading game...</p>";
    document.body.appendChild(gameScript);
}

function openTicTacToe() {
    closeActivities();
    gameModal.hidden = false;
    loadTicTacToe();
}

function closeGame() {
    gameModal.hidden = true;
}

ticTacToeButton.addEventListener("click", openTicTacToe);
closeGameButton.addEventListener("click", closeGame);

gameModal.addEventListener("click", function(event) {
    if (event.target === gameModal) {
        closeGame();
    }
});


// =========================================
// CLEAN UP THE STUDENT'S QUESTION
// =========================================

function cleanQuestion(question) {

    return question
        .toLowerCase()
        .replace(/[?!.,:;'\"]/g, "")
        .trim();
}


// =========================================
// FIND AN ANSWER
// =========================================

function findAnswer(question) {
    const cleanedQuestion = cleanQuestion(question);

    let bestAnswer = null;
    let bestScore = 0;

    for (const item of knowledge) {
        for (const keyword of item.keywords) {
            const cleanedKeyword = cleanQuestion(keyword);

            if (!cleanedQuestion.includes(cleanedKeyword)) {
                continue;
            }

            let score = cleanedKeyword.length;

            if (cleanedKeyword.includes(" ")) {
                score += 100;
            }

            score += cleanedKeyword.split(" ").length * 20;

            if (score > bestScore) {
                bestScore = score;
                bestAnswer = item.answer;
            }
        }
    }

    if (bestAnswer !== null) {
        return bestAnswer;
    }

    return "🤔 I can't find this information in my learning resources. Ask your teacher!";
}


// =========================================
// ADD A MESSAGE TO THE CHAT
// =========================================

function addMessage(sender, text, className) {

    const message = document.createElement("div");

    message.classList.add("message", className);

    message.innerHTML = `
        <strong>${sender}</strong>
        <p>${text}</p>
    `;

    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
}


// =========================================
// WHEN THE STUDENT SENDS A QUESTION
// =========================================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const question = input.value.trim();

    if (question === "") {
        return;
    }

    addMessage(
        "You",
        question,
        "user-message"
    );

    input.value = "";

    setTimeout(function() {

        const answer = findAnswer(question);

        addMessage(
            "GeorgeBot",
            answer,
            "bot-message"
        );

    }, 600);

});
