// =========================================
// GEORGE BOT
// Chatbot behaviour
// =========================================


// Find the elements we need from the webpage

const chat = document.getElementById("chat");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");


// =========================================
// CLEAN UP THE STUDENT'S QUESTION
// =========================================

function cleanQuestion(question) {

    return question
        .toLowerCase()
        .replace(/[?!.,:;'"]/g, "")
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

            // Give multi-word phrases priority
            if (cleanedKeyword.includes(" ")) {
                score += 100;
            }

            // Give longer phrases an additional advantage
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

    // Scroll to the newest message

    chat.scrollTop = chat.scrollHeight;
}


// =========================================
// WHEN THE STUDENT SENDS A QUESTION
// =========================================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const question = input.value.trim();


    // Do nothing if the input is empty

    if (question === "") {
        return;
    }


    // Show the student's question

    addMessage(
        "You",
        question,
        "user-message"
    );


    // Clear the input box

    input.value = "";


    // Give GeorgeBot a short thinking time

    setTimeout(function() {

        const answer = findAnswer(question);

        addMessage(
            "GeorgeBot",
            answer,
            "bot-message"
        );

    }, 600);

});
