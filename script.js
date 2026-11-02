// =========================================
// GEORGE BOT
// Chatbot behaviour
// =========================================

const startScreen = document.getElementById("start-screen");
const askGeorgeButton = document.getElementById("ask-george-button");
const activitiesStartButton = document.getElementById("activities-start-button");
const calmingCornerStartButton = document.getElementById("calming-corner-start-button");
const calmingCorner = document.getElementById("calming-corner");
const calmingBackButton = document.getElementById("calming-back-button");
const zoneCards = document.querySelectorAll(".zone-card");
const zoneSelectionMessage = document.getElementById("zone-selection-message");
const zoneFeelings = document.getElementById("zone-feelings");
const zoneFeelingsTitle = document.getElementById("zone-feelings-title");
const zoneFeelingsList = document.getElementById("zone-feelings-list");
const backToZonesButton = document.getElementById("back-to-zones-button");
const blueSupport = document.getElementById("blue-support");
const blueSupportProgress = document.getElementById("blue-support-progress");
const blueSupportTitle = document.getElementById("blue-support-title");
const blueSupportQuestion = document.getElementById("blue-support-question");
const blueSupportOptions = document.getElementById("blue-support-options");
const blueSupportResult = document.getElementById("blue-support-result");
const blueSupportBack = document.getElementById("blue-support-back");
const activitiesHub = document.getElementById("activities-hub");
const yearGroupButtons = document.querySelectorAll(".year-group-button");
const yearSections = document.querySelectorAll(".year-section");
const backToStartButton = document.getElementById("back-to-start-button");
const chat = document.getElementById("chat");
const chatBackButton = document.getElementById("chat-back-button");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");

function showChat() {
    startScreen.hidden = true;
    activitiesHub.hidden = true;
    calmingCorner.hidden = true;
    chat.hidden = false;
    form.hidden = false;
    input.focus();
}

function showActivitiesHub() {
    startScreen.hidden = true;
    chat.hidden = true;
    calmingCorner.hidden = true;
    form.hidden = true;
    activitiesHub.hidden = false;
    showYearGroup("years1-2");
}

function showStartScreen() {
    activitiesHub.hidden = true;
    calmingCorner.hidden = true;
    chat.hidden = true;
    form.hidden = true;
    startScreen.hidden = false;
}

function showCalmingCorner() {
    startScreen.hidden = true;
    activitiesHub.hidden = true;
    chat.hidden = true;
    form.hidden = true;
    calmingCorner.hidden = false;
    zoneCards.forEach(function(card) {
        card.setAttribute("aria-pressed", "false");
    });
    document.querySelector(".zones-grid").hidden = false;
    zoneFeelings.hidden = true;
    blueSupport.hidden = true;
    resetBlueSupport();
    zoneSelectionMessage.textContent = "There is no right or wrong answer.";
}

askGeorgeButton.addEventListener("click", showChat);
chatBackButton.addEventListener("click", showStartScreen);
activitiesStartButton.addEventListener("click", showActivitiesHub);
calmingCornerStartButton.addEventListener("click", showCalmingCorner);
calmingBackButton.addEventListener("click", showStartScreen);

const zoneFeelingExamples = {
    blue: { title: "Blue Zone", feelings: ["Sad", "Tired", "Sick", "Bored", "Disappointed"] },
    green: { title: "Green Zone", feelings: ["Calm", "Happy", "Focused", "Content", "Proud"] },
    yellow: { title: "Yellow Zone", feelings: ["Stressed", "Frustrated", "Anxious", "Excited", "Silly"] },
    red: { title: "Red Zone", feelings: ["Angry", "Furious", "Panicked", "Terrified", "Extremely sad"] }
};

function showZoneFeelings(zone) {
    const details = zoneFeelingExamples[zone];
    if (!details) return;
    document.querySelector(".zones-grid").hidden = true;
    zoneSelectionMessage.textContent = "";
    zoneFeelingsTitle.textContent = details.title + " — how are you feeling?";
    zoneFeelingsList.innerHTML = "";

    details.feelings.forEach(function(feeling) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "zone-feeling-option";
        button.setAttribute("aria-pressed", "false");

        const feelingEmojis = {
            "Sad": "😢", "Tired": "😴", "Sick": "🤒", "Bored": "😐", "Disappointed": "😞",
            "Calm": "😌", "Happy": "😊", "Focused": "🎯", "Content": "🙂", "Proud": "🥹",
            "Stressed": "😣", "Frustrated": "😤", "Anxious": "😟", "Excited": "🤩", "Silly": "🤪",
            "Angry": "😠", "Furious": "🤬", "Panicked": "😱", "Terrified": "😨", "Extremely sad": "😭"
        };

        const emoji = document.createElement("span");
        emoji.className = "zone-feeling-emoji";
        emoji.textContent = feelingEmojis[feeling] || "💭";
        const label = document.createElement("span");
        label.className = "zone-feeling-label";
        label.textContent = feeling;
        button.appendChild(emoji);
        button.appendChild(label);

        if (zone === "blue") {
            button.addEventListener("click", function() { showBlueSupport(feeling); });
        }
        zoneFeelingsList.appendChild(button);
    });
    zoneFeelings.classList.remove("blue-zone-feelings");
    zoneFeelings.hidden = false;
}

zoneCards.forEach(function(card) {
    card.addEventListener("click", function() {
        zoneCards.forEach(function(otherCard) {
            otherCard.setAttribute("aria-pressed", String(otherCard === card));
        });
        if (zoneFeelingExamples[card.dataset.zone]) {
            showZoneFeelings(card.dataset.zone);
        } else {
            zoneSelectionMessage.textContent = "That's okay. It's fine not to be sure.";
        }
    });
});

backToZonesButton.addEventListener("click", function() {
    zoneFeelings.hidden = true;
    blueSupport.hidden = true;
    document.querySelector(".zones-grid").hidden = false;
    zoneSelectionMessage.textContent = "There is no right or wrong answer.";
});
blueSupportBack.addEventListener("click", function() {
    blueSupport.hidden = true;
    zoneFeelings.hidden = false;
});

backToStartButton.addEventListener("click", showStartScreen);


const blueSupportFlows = {
 "Sad": {
  question:"What might help you right now?",
  choices:[["comfort","💙 Feel comforted"],["express","🎨 Show how I feel"],["distract","🌿 Take a gentle break"],["connect","🤝 Connect with someone"],["unsure","❔ I'm not sure"]],
  activities:{
   comfort:["Find a comfort","Think of a person, place or object that helps you feel safe and cared for. Picture it in your mind, or draw it.","You do not have to explain why you feel sad."],
   express:["Draw your feeling","Draw your feeling using colours, shapes or a picture. There is no right or wrong way.","Keep your drawing or share it with someone you trust."],
   distract:["Notice the world around you","Find 3 things you can see, 2 things you can hear and 1 thing you can feel.","Repeat slowly if it feels helpful."],
   connect:["Reach out","Choose someone you trust and say: “I'm feeling sad. Can you spend a little time with me?”","You do not need to tell the whole story."],
   unsure:["Choose one small thing","Take three comfortable breaths, have a sip of water, or find a quiet place for a moment.","You can come back and choose another idea."]
  }
 },
 "Tired":{
  question:"What kind of tired do you feel?",
  choices:[["rest","😌 I need a quiet rest"],["move","🙆 I want to wake up gently"],["water","💧 I might need water"],["unsure","❔ I'm not sure"]],
  activities:{
   rest:["Take a quiet pause","Sit comfortably, relax your shoulders and give yourself a quiet moment.","If you are still very tired, tell a trusted adult."],
   move:["Wake up gently","If you feel well enough, stand up, stretch your arms slowly and roll your shoulders. Stop if uncomfortable.","A little gentle movement may help you feel more awake."],
   water:["Have a drink","If you can, have a drink of water and take a few comfortable sips.","Notice whether you feel any different afterwards."],
   unsure:["Check what your body needs","Would a quiet rest, a drink of water or a gentle stretch feel best? Choose one, or ask an adult.","If you feel unwell or unusually exhausted, tell a trusted adult."]
  }
 },
 "Sick":{
  question:"What would help you feel looked after?",
  choices:[["adult","🙋 Tell a trusted adult"],["rest","🛋️ Find a quiet place to rest"],["unsure","❔ I'm not sure"]],
  activities:{
   adult:["Let someone know","Please tell your teacher or another trusted adult: “I don't feel well. Can you help me?”","An adult can help you decide what to do next."],
   rest:["Take a quiet rest","Sit somewhere comfortable and rest while you let a trusted adult know how you are feeling.","This app cannot check how your body is doing. Please tell an adult."],
   unsure:["Ask for help","You do not have to work this out alone. Find your teacher or another trusted adult and say you do not feel well.","If you feel very unwell, tell an adult straight away."]
  }
 },
 "Bored":{
  question:"What would you like to do?",
  choices:[["create","🎨 Make something"],["notice","🔎 Find something interesting"],["move","🙆 Move a little"],["unsure","❔ Give me an idea"]],
  activities:{
   create:["Make a tiny creation","Choose a colour and make a quick pattern, doodle or imaginary creature on paper. Give it a name.","It does not need to be perfect. Just experiment."],
   notice:["Become a curious explorer","Find one object you have never really noticed. What shapes, colours or tiny details can you spot?","Can you find one more interesting detail?"],
   move:["Try a movement break","If it is a suitable place and you feel well, stand up, stretch gently and take a short walk.","Come back when you are ready."],
   unsure:["Try a one-minute challenge","Name 5 animals, spot 4 things of the same colour, or invent a new use for an everyday object.","Pick whichever sounds fun."]
  }
 },
 "Disappointed":{
  question:"What would help you right now?",
  choices:[["pause","🌬️ Have a quiet moment"],["express","🎨 Show how I feel"],["next","🧩 Think of one next step"],["connect","🤝 Talk to someone"],["unsure","❔ I'm not sure"]],
  activities:{
   pause:["Give yourself a moment","It can be hard when something does not go the way you hoped. Sit comfortably and take a few slow, comfortable breaths.","You do not have to feel better straight away."],
   express:["Show your feeling","Draw the moment using colours, shapes or a few simple pictures. You do not need to write words.","You can keep it private or share it with someone you trust."],
   next:["Find one small next step","Ask yourself: “What is one small thing I can do next?” It might be trying again, asking for help or taking a break.","One small step is enough."],
   connect:["Share what happened","If you want to, tell someone you trust: “I'm disappointed because things didn't go as I hoped. Can you listen?”","You can choose how much you want to share."],
   unsure:["Start with a small pause","Take a moment, have a sip of water or choose a quiet activity. You can ask a trusted adult to help you choose.","It is okay if you still feel disappointed."]
  }
 }
};
let currentBlueFeeling="";
function resetBlueSupport(){currentBlueFeeling="";blueSupportOptions.innerHTML="";blueSupportResult.hidden=true;blueSupportResult.textContent="";blueSupportProgress.textContent="";}
function addBlueButton(label,action){const b=document.createElement("button");b.type="button";b.className="blue-support-option";b.textContent=label;b.addEventListener("click",action);blueSupportOptions.appendChild(b);}
function showBlueSupport(feeling){
 const flow=blueSupportFlows[feeling];if(!flow)return;currentBlueFeeling=feeling;zoneFeelings.hidden=true;blueSupport.hidden=false;blueSupportResult.hidden=true;
 blueSupportProgress.textContent="A small step, at your own pace";blueSupportTitle.textContent=feeling+" — let's find something that might help";blueSupportQuestion.textContent=flow.question;blueSupportOptions.innerHTML="";
 flow.choices.forEach(choice=>addBlueButton(choice[1],()=>showBlueActivity(choice[0])));
}
function showBlueActivity(key){
 const item=blueSupportFlows[currentBlueFeeling].activities[key];if(!item)return;blueSupportProgress.textContent="An idea to try";blueSupportTitle.textContent=item[0];blueSupportQuestion.textContent=item[1];blueSupportResult.textContent=item[2];blueSupportResult.hidden=false;blueSupportOptions.innerHTML="";
 addBlueButton("I've tried it — how do I feel?",showBlueCheckIn);
}
function showBlueCheckIn(){
 blueSupportProgress.textContent="Check in with yourself";blueSupportTitle.textContent="How are you feeling now?";blueSupportQuestion.textContent="There is no right or wrong answer. You do not have to feel better straight away.";blueSupportResult.hidden=true;blueSupportOptions.innerHTML="";
 [["better","🙂 A little better"],["same","😐 About the same"],["still","💙 I still feel this way"]].forEach(choice=>addBlueButton(choice[1],()=>showBlueNextStep(choice[0])));
}
function showBlueNextStep(answer){
 blueSupportOptions.innerHTML="";blueSupportResult.hidden=false;
 if(answer==="better"){blueSupportTitle.textContent="I'm glad you found something helpful 💙";blueSupportQuestion.textContent="You can go back to your day, or try another idea.";blueSupportResult.textContent="You can use a tool whenever you need it.";}
 else if(answer==="same"){blueSupportTitle.textContent="That's okay. Take your time.";blueSupportQuestion.textContent="Sometimes feelings need time. Would you like to try a different idea?";blueSupportResult.textContent="You can also talk to someone you trust.";}
 else{blueSupportTitle.textContent="You don't have to manage this alone.";blueSupportQuestion.textContent="Would you like to try another idea, or talk to a trusted adult?";blueSupportResult.textContent="You can say: “I'm still feeling this way. Can you help me?”";}
 addBlueButton("↻ Try a different idea",()=>showBlueSupport(currentBlueFeeling));
 addBlueButton("🤝 Talk to a trusted adult",()=>{blueSupportTitle.textContent="Find a trusted adult";blueSupportQuestion.textContent="Please speak to your teacher or another adult you trust. You can show them this screen.";blueSupportResult.textContent="If you feel unsafe or are hurt, tell a trusted adult immediately.";blueSupportOptions.innerHTML="";});
}

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

        if (categoryName === "Coding" && (yearGroupId === "years1-2" || yearGroupId === "years3-4")) {
            [1, 2, 3].forEach(function(level) {
                const levelActivities = matchingActivities.filter(function(activity) {
                    return activity.level === level;
                });

                if (levelActivities.length === 0) {
                    return;
                }

                const levelSection = document.createElement("div");
                levelSection.className = "coding-level level-" + level;

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

function cleanQuestion(question) {
    return question
        .toLowerCase()
        .replace(/[?!.,:;'\"]/g, "")
        .trim();
}

// Some student questions are intentionally left unanswered, especially
// personal/romantic/gender questions and messages containing profanity.
// This prevents fuzzy matching from accidentally turning them into an
// unrelated answer.
function isIgnoredQuestion(question) {
    const cleaned = cleanQuestion(question);
    const ignoredTerms = [
        "are you gay", "are you lesbian", "are you bisexual", "are you trans",
        "are you transgender", "gay femboy", "femboy", "boyfriend", "girlfriend",
        "robo boyfriend", "robo girlfriend", "do you wanna be my boyfriend",
        "do you want to be my boyfriend", "do you wanna be my girlfriend",
        "do you want to be my girlfriend", "fuck", "fucking", "shit", "bitch",
        "asshole"
    ];

    return ignoredTerms.some(function(term) {
        return cleaned.includes(term);
    });
}

function solveCalculation(question) {
    let expression = question
        .toLowerCase()
        .replace(/what is|calculate|work out|solve|please|can you|could you/g, "")
        .replace(/divided by/g, "/")
        .replace(/divide by/g, "/")
        .replace(/multiplied by/g, "*")
        .replace(/times/g, "*")
        .replace(/plus/g, "+")
        .replace(/minus/g, "-")
        .replace(/x/g, "*")
        .replace(/÷/g, "/")
        .replace(/×/g, "*")
        .replace(/=/g, "")
        .replace(/\s+/g, "")
        .trim();

    if (!/^[0-9+*/().%\-]+$/.test(expression)) {
        return null;
    }

    if (!/[+*/%\-]/.test(expression)) {
        return null;
    }

    if (expression.includes("%")) {
        expression = expression.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");
    }

    try {
        const result = Function("\"use strict\"; return (" + expression + ");")();

        if (typeof result !== "number" || !Number.isFinite(result)) {
            return null;
        }

        const roundedResult = Number.isInteger(result)
            ? result
            : Number(result.toFixed(10));

        return "🧮 " + question.trim() + " = **" + roundedResult + "**";
    } catch (error) {
        return null;
    }
}

// Fuse.js is used as a second layer after the exact keyword matcher.
// This lets GeorgeBot recognise small spelling mistakes and different
// phrasings without changing the carefully programmed answers.
let knowledgeFuse = null;

function getKnowledgeFuse() {
    if (knowledgeFuse !== null) {
        return knowledgeFuse;
    }

    if (typeof Fuse === "undefined" || !Array.isArray(knowledge)) {
        return null;
    }

    knowledgeFuse = new Fuse(knowledge, {
        keys: ["keywords"],
        includeScore: true,
        threshold: 0.45,
        ignoreLocation: true,
        minMatchCharLength: 2
    });

    return knowledgeFuse;
}

function findKnowledgeMatch(question) {
    if (isIgnoredQuestion(question)) {
        return null;
    }

    const cleanedQuestion = cleanQuestion(question);
    let bestMatch = null;
    let bestScore = 0;

    // First keep the original exact keyword behaviour.
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

    if (bestMatch !== null) {
        return bestMatch;
    }

    // If no exact keyword matched, try fuzzy matching.
    const fuse = getKnowledgeFuse();

    if (fuse === null) {
        return null;
    }

    const fuzzyResults = fuse.search(cleanedQuestion);

    if (fuzzyResults.length === 0) {
        return null;
    }

    const bestFuzzyResult = fuzzyResults[0];

    // Fuse scores closer to 0 are better. The threshold above keeps
    // unrelated questions from being treated as known questions.
    if (typeof bestFuzzyResult.score === "number" && bestFuzzyResult.score <= 0.45) {
        return bestFuzzyResult.item;
    }

    return null;
}

function findAnswer(question) {
    if (isIgnoredQuestion(question)) {
        return null;
    }

    if (window.isNumberGameRequest && window.isNumberGameRequest(question)) {
        return window.getNumberGameAnswer();
    }

    if (window.isCatQuestion && window.isCatQuestion(question)) {
        return window.getCatAnswer();
    }

    const calculationAnswer = solveCalculation(question);

    if (calculationAnswer !== null) {
        return calculationAnswer;
    }

    const match = findKnowledgeMatch(question);

    if (match !== null) {
        return match.answer;
    }

    return null;
}

// Keep track of consecutive questions GeorgeBot could not answer.
// The first two attempts encourage the student to rephrase or check spelling.
// Only after three unsuccessful attempts do we direct them to the teacher.
let unansweredAttempts = 0;

function getUnknownQuestionAnswer() {
    unansweredAttempts += 1;

    if (unansweredAttempts < 3) {
        return "🤔 I'm not quite sure what you mean. Try rephrasing your question or check the spelling, then ask me again!";
    }

    return "🤔 I still don't know this one. Please ask your teacher!";
}

const QUESTION_LOG_KEY = "georgebot-question-log";
const QUESTION_LOG_ENDPOINT = "https://script.google.com/macros/s/AKfycbzMnabJC4lyR65aO4KE9tvJWbAIICI_XxFtLoDO0PorOJVPPEDHEXmGWLGCFs2VLyjDYg/exec";

function getQuestionLog() {
    try {
        return JSON.parse(localStorage.getItem(QUESTION_LOG_KEY)) || [];
    } catch (error) {
        return [];
    }
}

function saveQuestionToLog(question, answer, topicOverride) {
    const match = findKnowledgeMatch(question);
    const calculationAnswer = solveCalculation(question);
    const entry = {
        date: new Date().toISOString(),
        question: question,
        answered: (topicOverride !== null && topicOverride !== undefined) || match !== null || calculationAnswer !== null,
        topic: topicOverride || (match ? match.topic : (calculationAnswer !== null ? "Calculator" : "Unknown"))
    };

    const log = getQuestionLog();
    log.push(entry);

    try {
        localStorage.setItem(QUESTION_LOG_KEY, JSON.stringify(log));
    } catch (error) {
        console.warn("GeorgeBot could not save the local question log.", error);
    }

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

// When a student offers to tell a joke, GeorgeBot invites them to share it.
// The next message is treated as their joke and gets an encouraging reaction.
let waitingForStudentJoke = false;

function isJokeInvitation(question) {
    const cleaned = cleanQuestion(question);
    return /\\b(i have a joke|ive got a joke|i've got a joke|can i tell you a joke|may i tell you a joke|let me tell you a joke|i want to tell you a joke|i wanna tell you a joke|i will tell you a joke|here is a joke|heres a joke|here's a joke|wanna hear a joke|want to hear a joke)\\b/.test(cleaned);
}

function getStudentJokeReaction() {
    const reactions = [
        "😂 HAHAHA! Thanks for sharing your joke! You've made my circuits giggle!",
        "🤣 That was a good one! Thanks for making me laugh!",
        "😄 Thanks for telling me a joke! My robot belly is shaking with laughter!",
        "😂 Brilliant! I love hearing jokes. Have you got another one?"
    ];
    return reactions[Math.floor(Math.random() * reactions.length)];
}

function addMessage(sender, text, className) {
    const message = document.createElement("div");
    message.classList.add("message", className);
    const name = document.createElement("strong");
    name.textContent = sender;
    const paragraph = document.createElement("p");

    // Student messages are always inserted as plain text, so typed jokes
    // cannot accidentally be interpreted as HTML.
    if (className === "user-message") {
        paragraph.textContent = text;
    } else {
        paragraph.innerHTML = text;
    }

    message.appendChild(name);
    message.appendChild(paragraph);
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
        let answer;
        let topicOverride = null;

        if (waitingForStudentJoke) {
            waitingForStudentJoke = false;
            answer = getStudentJokeReaction();
            topicOverride = "Fun — Student Joke";
            unansweredAttempts = 0;
        } else if (isJokeInvitation(question)) {
            waitingForStudentJoke = true;
            answer = "😃 Absolutely! I'm all ears. Tell me your best joke!";
            topicOverride = "Fun — Student Joke";
            unansweredAttempts = 0;
        } else {
            answer = findAnswer(question);

            if (answer === null) {
                answer = getUnknownQuestionAnswer();
            } else {
                unansweredAttempts = 0;
            }

            if (window.isNumberGameRequest && window.isNumberGameRequest(question)) {
                topicOverride = "Games — Missing Number";
            } else if (window.isCatQuestion && window.isCatQuestion(question)) {
                topicOverride = "Animals — Cats";
            }
        }

        saveQuestionToLog(question, answer, topicOverride);
        addMessage("GeorgeBot", answer, "bot-message");
    }, 600);
});
