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
        button.textContent = feeling;
        zoneFeelingsList.appendChild(button);
    });
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
    document.querySelector(".zones-grid").hidden = false;
    zoneSelectionMessage.textContent = "There is no right or wrong answer.";
});
