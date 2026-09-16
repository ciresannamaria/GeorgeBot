// =========================================
// GEORGE BOT
// Chatbot behaviour
// =========================================

const startScreen = document.getElementById("start-screen");
const askGeorgeButton = document.getElementById("ask-george-button");
const activitiesStartButton = document.getElementById("activities-start-button");
const activitiesHub = document.getElementById("activities-hub");
const yearGroupButtons = document.querySelectorAll(".year-group-button");
const yearSections = document.querySelectorAll(".year-section");
const backToStartButton = document.getElementById("back-to-start-button");
const chat = document.getElementById("chat");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const exportQuestionsButton = document.getElementById("export-questions-button");

function showChat() {
    startScreen.hidden = true;
    activitiesHub.hidden = true;
    chat.hidden = false;
    form.hidden = false;
    input.focus();
}

function showActivitiesHub() {
    startScreen.hidden = true;
    chat.hidden = true;
    form.hidden = true;
    activitiesHub.hidden = false;
    showYearGroup("years1-2");
}

function showStartScreen() {
    activitiesHub.hidden = true;
    chat.hidden = true;
    form.hidden = true;
    startScreen.hidden = false;
}

askGeorgeButton.addEventListener("click", showChat);
activitiesStartButton.addEventListener("click", showActivitiesHub);
backToStartButton.addEventListener("click", showStartScreen);


// =========================================
// YEAR GROUP SELECTION
// =========================================

function showYearGroup(yearGroupId) {
    yearSections.forEach(function(section) {
        section.hidden = section.id !== yearGroupId;
    });

    yearGroupButtons.forEach(function(button) {
        button.classList.toggle("selected", button.dataset.yearGroup === yearGroupId);
    });

    renderActivities(yearGroupId);
}

yearGroupButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        showYearGroup(button.dataset.yearGroup);
    });
});


// =========================================
// ACTIVITY HUB
// =========================================

function createActivityCard(activity) {
    const card = document.createElement("a");
    card.className = "activity-card";
    card.href = activity.link;
    card.target = "_blank";
    card.rel = "noopener noreferrer";

    card.innerHTML = `
        <span class="activity-card-icon">${activity.icon}</span>
        <span class="activity-card-title">${activity.title}</span>
    `;

    return card;
}

function renderActivities(yearGroupId) {
    const section = document.getElementById(yearGroupId);

    if (!section) {
        return;
    }

    const categories = section.querySelectorAll(".activity-category");

    categories.forEach(function(categorySection) {
        const heading = categorySection.querySelector("h4");
        const list = categorySection.querySelector(".activity-grid");
        const placeholder = categorySection.querySelector(".year-placeholder");

        if (!heading || !list) {
            return;
        }

        const categoryName = heading.textContent.replace(/^\S+\s*/, "").trim();
        list.innerHTML = "";

        const matchingActivities = activities.filter(function(activity) {
            return activity.category === categoryName && activity.yearGroups.includes(yearGroupId);
        });

        if (categoryName === "Coding Games" && yearGroupId === "years1-2") {
            [1, 2].forEach(function(level) {
                const levelActivities = matchingActivities.filter(function(activity) {
                    return activity.level === level;
                });

                if (levelActivities.length === 0) {
                    return;
                }

                const levelSection = document.createElement("div");
                levelSection.className = "coding-level";

                const levelTitle = document.createElement("h5");
                levelTitle.textContent = "Level " + level;
                levelSection.appendChild(levelTitle);

                const levelGrid = document.createElement("div");
                levelGrid.className = "activity-grid";

                levelActivities.forEach(function(activity) {
                    levelGrid.appendChild(createActivityCard(activity));
                });

                levelSection.appendChild(levelGrid);
                list.appendChild(levelSection);
            });
        } else {
            matchingActivities.forEach(function(activity) {
                list.appendChild(createActivityCard(activity));
            });
        }

        if (placeholder) {
            placeholder.hidden = matchingActivities.length !== 0;
        }
    });
}


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
const chessButton = document.getElementById("chess-button");
const gameModal = document.getElementById("game-modal");
const gameContainer = document.getElementById("game-container");
const closeGameButton = document.getElementById("close-game-button");

let ticTacToeLoaded = false;
let chessLoaded = false;

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

function loadChess() {
    if (chessLoaded) {
        window.initChess(gameContainer);
        return;
    }

    const gameStyle = document.createElement("link");
    gameStyle.rel = "stylesheet";
    gameStyle.href = "games/chess/style.css";
    document.head.appendChild(gameStyle);

    const gameScript = document.createElement("script");
    gameScript.src = "games/chess/script.js";
    gameScript.onload = function() {
        chessLoaded = true;
        window.initChess(gameContainer);
    };

    gameContainer.innerHTML = "<p>Loading chess...</p>";
    document.body.appendChild(gameScript);
}

function openTicTacToe() {
    closeActivities();
    gameModal.hidden = false;
    loadTicTacToe();
}

function openChess() {
    closeActivities();
    gameModal.hidden = false;
    loadChess();
}

function closeGame() {
    gameModal.hidden = true;
}

ticTacToeButton.addEventListener("click", openTicTacToe);
chessButton.addEventListener("click", openChess);
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

function findKnowledgeMatch(question) {
    const cleanedQuestion = cleanQuestion(question);
    let bestMatch = null;
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
                bestMatch = item;
            }
        }
    }

    return bestMatch;
}

function findAnswer(question) {
    const match = findKnowledgeMatch(question);

    if (match !== null) {
        return match.answer;
    }

    return "🤔 I can't find this information in my learning resources. Ask your teacher!";
}


// =========================================
// QUESTION LOG
// =========================================

const QUESTION_LOG_KEY = "georgebot-question-log";

// Google Apps Script Web App endpoint for central question logging.
const QUESTION_LOG_ENDPOINT = "https://script.google.com/macros/s/AKfycbzMnabJC4lyR65aO4KE9tvJWbAIICI_XxFtLoDO0PorOJVPPEDHEXmGWLGCFs2VLyjDYg/exec";

function getQuestionLog() {
    try {
        return JSON.parse(localStorage.getItem(QUESTION_LOG_KEY)) || [];
    } catch (error) {
        return [];
    }
}

function saveQuestionToLog(question, answer) {
    const match = findKnowledgeMatch(question);
    const entry = {
        date: new Date().toISOString(),
        question: question,
        answered: match !== null,
        topic: match ? match.topic : "Unknown"
    };

    // Keep a local copy as a backup.
    const log = getQuestionLog();
    log.push(entry);

    try {
        localStorage.setItem(QUESTION_LOG_KEY, JSON.stringify(log));
    } catch (error) {
        console.warn("GeorgeBot could not save the local question log.", error);
    }

    // Send the same question to the central Google Sheet.
    if (QUESTION_LOG_ENDPOINT) {
        fetch(QUESTION_LOG_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(entry),
            keepalive: true
        }).catch(function(error) {
            console.warn("GeorgeBot could not send the question to Google Sheets.", error);
        });
    }
}

function csvEscape(value) {
    return '"' + String(value).replace(/"/g, '""') + '"';
}

function exportQuestions() {
    const log = getQuestionLog();

    if (log.length === 0) {
        alert("No questions have been saved on this device yet.");
        return;
    }

    const rows = [
        ["Date", "Question", "Answered?", "Topic"]
    ];

    log.forEach(function(item) {
        rows.push([
            new Date(item.date).toLocaleString(),
            item.question,
            item.answered ? "Yes" : "No",
            item.topic
        ]);
    });

    const csv = rows.map(function(row) {
        return row.map(csvEscape).join(",");
    }).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "georgebot-questions.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

exportQuestionsButton.addEventListener("click", function() {
    exportQuestions();
});


// =========================================
// CHAT MESSAGES
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

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const question = input.value.trim();

    if (question === "") {
        return;
    }

    addMessage("You", question, "user-message");
    input.value = "";

    setTimeout(function() {
        const answer = findAnswer(question);
        saveQuestionToLog(question, answer);
        addMessage("GeorgeBot", answer, "bot-message");
    }, 600);
});
