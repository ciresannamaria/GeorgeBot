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
const chatBackButton = document.getElementById("chat-back-button");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");

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
chatBackButton.addEventListener("click", showStartScreen);
activitiesStartButton.addEventListener("click", showActivitiesHub);

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


// Teacher-only classroom noise meter. Uses relative microphone amplitude, not calibrated dB SPL.
(function initTeacherNoiseMeter() {
 const open=document.getElementById("noise-meter-open");
 const panel=document.getElementById("noise-meter-panel");
 const close=document.getElementById("noise-meter-close");
 const start=document.getElementById("noise-meter-start");
 const stop=document.getElementById("noise-meter-stop");
 const limit=document.getElementById("noise-meter-limit");
 const limitValue=document.getElementById("noise-meter-limit-value");
 const value=document.getElementById("noise-meter-value");
 const bar=document.getElementById("noise-meter-bar");
 const status=document.getElementById("noise-meter-status");
 const sound=document.getElementById("noise-meter-sound");
 let stream=null, context=null, analyser=null, source=null, frame=null, lastAlert=0, aboveSince=0, smoothedLevel=null;
 function showPanel(){panel.hidden=false;}
 function hidePanel(){panel.hidden=true;}
 function stopMeter(){if(frame!==null)cancelAnimationFrame(frame);frame=null;if(stream)stream.getTracks().forEach(track=>track.stop());stream=null;if(context&&context.state!=="closed")context.close().catch(()=>{});context=null;analyser=null;source=null;start.disabled=false;stop.disabled=true;status.textContent="Measurement stopped. Press Start to measure again.";}
 function beep(){
  if(!sound.checked||!context||context.state!=="running"){
   if(sound.checked) status.textContent="Alert sound is unavailable. Press Start again to enable audio.";
   return false;
  }
  try{
   const now=context.currentTime;
   [0,0.24].forEach((delay)=>{
    const osc=context.createOscillator();
    const gain=context.createGain();
    osc.type="sine";
    osc.frequency.setValueAtTime(1046,now+delay);
    gain.gain.setValueAtTime(0.0001,now+delay);
    gain.gain.linearRampToValueAtTime(0.28,now+delay+0.025);
    gain.gain.setValueAtTime(0.28,now+delay+0.14);
    gain.gain.linearRampToValueAtTime(0.0001,now+delay+0.21);
    osc.connect(gain);
    gain.connect(context.destination);
    osc.start(now+delay);
    osc.stop(now+delay+0.23);
   });
   return true;
  }catch(error){
   status.textContent="Could not play alert. Check your device volume.";
   return false;
  }
 }
 function measure(){if(!analyser)return;const data=new Uint8Array(analyser.fftSize);analyser.getByteTimeDomainData(data);let sum=0;for(let i=0;i<data.length;i++){const n=(data[i]-128)/128;sum+=n*n;}const rms=Math.sqrt(sum/data.length);
  // Use a gentler relative scale and smooth short microphone fluctuations. This is not dB SPL.
  const rawLevel=Math.max(0,Math.min(100,Math.round(20*Math.log10(Math.max(rms,0.00001))+75)));
  smoothedLevel=smoothedLevel===null?rawLevel:(smoothedLevel*0.82+rawLevel*0.18);const level=Math.round(smoothedLevel);
  value.textContent=String(level);bar.style.width=level+"%";const threshold=Number(limit.value);bar.classList.toggle("over-limit",level>=threshold);if(level>=threshold){if(!aboveSince)aboveSince=Date.now();status.textContent="Noise limit exceeded";if(Date.now()-aboveSince>900&&Date.now()-lastAlert>3000){if(beep()){lastAlert=Date.now();status.textContent="Noise limit exceeded — alert sound played";}else{lastAlert=Date.now();}}}else{aboveSince=0;status.textContent="Noise level is within your limit";}frame=requestAnimationFrame(measure);}
 open.addEventListener("click",showPanel);close.addEventListener("click",hidePanel);panel.addEventListener("click",e=>{if(e.target===panel)e.stopPropagation();});
 limit.addEventListener("input",()=>{limitValue.textContent=limit.value;});
 start.addEventListener("click",async()=>{if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){status.textContent="Microphone access is not supported in this browser.";return;}start.disabled=true;status.textContent="Requesting microphone access…";try{context=new (window.AudioContext||window.webkitAudioContext)();await context.resume();stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}});analyser=context.createAnalyser();analyser.fftSize=2048;source=context.createMediaStreamSource(stream);source.connect(analyser);stop.disabled=false;status.textContent="Listening… Monitoring continues if you close this panel or move around GeorgeBot.";measure();}catch(error){stopMeter();status.textContent=error.name==="NotAllowedError"?"Microphone permission was denied. Allow access in your browser settings.":"Could not start the microphone. Check that it is connected and available.";}});
 stop.addEventListener("click",stopMeter);
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!panel.hidden)hidePanel();});
 document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"&&analyser&&frame===null){if(context&&context.state==="suspended")context.resume().catch(()=>{});measure();}});
})();
