// =========================================
// GEORGE BOT — MISSING NUMBER CHALLENGE
// Five questions, progressing from easy to challenging.
// =========================================
(function () {
    const TOTAL_QUESTIONS = 5;
    let questionNumber = 0;
    let score = 0;
    let currentQuestion = null;
    let gameFinished = false;

    function pick(items) {
        return items[Math.floor(Math.random() * items.length)];
    }

    function makeQuestion(level) {
        const templates = {
            1: [
                function () { const start = pick([1, 2, 3, 4, 5]); const step = pick([1, 2, 5, 10]); return { sequence: [0,1,2,3,4].map(i => start + step*i), missing: 3, explanation: "The numbers go up by " + step + " each time." }; },
                function () { const start = pick([10, 20, 30, 40]); const step = pick([2, 5, 10]); return { sequence: [0,1,2,3,4].map(i => start + step*i), missing: 2, explanation: "The numbers go up by " + step + " each time." }; }
            ],
            2: [
                function () { const start = pick([2, 3, 4, 5]); return { sequence: [start, start*2, start*4, start*8, start*16], missing: 3, explanation: "Each number is multiplied by 2." }; },
                function () { const start = pick([30, 40, 50, 60]); const step = pick([3, 4, 6, 7]); return { sequence: [start, start-step, start-step*2, start-step*3, start-step*4], missing: 2, explanation: "The numbers go down by " + step + " each time." }; }
            ],
            3: [
                function () { const start = pick([1, 2, 3]); return { sequence: [0,1,2,3,4].map(i => (start+i)*(start+i)), missing: 3, explanation: "These are square numbers: " + [0,1,2,3,4].map(i => (start+i) + "²").join(", ") + "." }; },
                function () { const start = pick([2, 3, 4]); const step = pick([3, 4, 5]); return { sequence: [start, start+step, start+2*step+1, start+3*step+3, start+4*step+6], missing: 3, explanation: "The gaps increase by 1 each time." }; }
            ]
        };
        const q = pick(templates[level])();
        q.answer = q.sequence[q.missing];
        q.level = level;
        q.options = makeOptions(q.answer);
        return q;
    }

    function makeOptions(answer) {
        const values = new Set([answer]);
        const offsets = [-10, -5, -3, -2, -1, 1, 2, 3, 5, 10, 4, -4];
        while (values.size < 4) {
            const offset = pick(offsets);
            const candidate = answer + offset;
            if (candidate >= 0) values.add(candidate);
        }
        return Array.from(values).sort(() => Math.random() - 0.5);
    }

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, function (char) {
            return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char];
        });
    }

    function renderGame() {
        const level = Math.min(3, Math.ceil(questionNumber / 2));
        const q = currentQuestion;
        const sequence = q.sequence.map((number, index) =>
            index === q.missing ? '<span class="missing-number">?</span>' : '<span>' + number + '</span>'
        ).join('<span class="sequence-comma">·</span>');
        const options = q.options.map(value =>
            '<button type="button" class="number-choice" data-number-answer="' + value + '">' + value + '</button>'
        ).join("");
        return '<div class="number-game" data-number-game>' +
            '<div class="number-game-top"><strong>🧩 Missing Number Challenge</strong><span>Question ' + questionNumber + ' of ' + TOTAL_QUESTIONS + '</span></div>' +
            '<div class="number-game-progress"><span style="width:' + ((questionNumber - 1) / TOTAL_QUESTIONS * 100) + '%"></span></div>' +
            '<p class="number-game-level">LEVEL ' + ["", "EASY", "MEDIUM", "CHALLENGE"][level] + '</p>' +
            '<div class="number-sequence">' + sequence + '</div>' +
            '<p class="number-game-prompt">Which number is missing?</p>' +
            '<div class="number-game-options">' + options + '</div>' +
            '<p class="number-game-feedback" aria-live="polite">Choose your answer!</p>' +
            '<p class="number-game-score">⭐ Score: ' + score + '</p>' +
            '</div>';
    }

    function renderResult() {
        return '<div class="number-game number-game-result"><h3>🏆 Challenge complete!</h3>' +
            '<p>You scored <strong>' + score + ' out of ' + TOTAL_QUESTIONS + '</strong>.</p>' +
            '<p>' + (score === 5 ? "Perfect score! You're a number-pattern superstar!" : score >= 3 ? "Great work, number detective!" : "Good effort! Every challenge helps your brain grow.") + '</p>' +
            '<button type="button" class="number-game-restart" data-number-restart>🔄 Play again</button></div>';
    }

    function startGame() {
        questionNumber = 1;
        score = 0;
        gameFinished = false;
        currentQuestion = makeQuestion(1);
        return renderGame();
    }

    window.isNumberGameRequest = function (text) {
        return /\b(play|game|challenge)\b.*\b(number|numbers|missing number|sequence|maths|math)\b|\b(number|numbers|missing number)\b.*\b(game|challenge|play)\b|\bwhat.s the missing number\b/i.test(text);
    };
    window.getNumberGameAnswer = startGame;

    document.addEventListener("click", function (event) {
        const answerButton = event.target.closest("[data-number-answer]");
        if (answerButton) {
            const game = answerButton.closest("[data-number-game]");
            if (!game || gameFinished || answerButton.disabled) return;
            const chosen = Number(answerButton.dataset.numberAnswer);
            const correct = chosen === currentQuestion.answer;
            if (correct) score++;
            game.querySelectorAll("[data-number-answer]").forEach(button => {
                button.disabled = true;
                if (Number(button.dataset.numberAnswer) === currentQuestion.answer) button.classList.add("number-correct");
                else if (button === answerButton && !correct) button.classList.add("number-incorrect");
            });
            game.querySelector(".number-game-feedback").textContent = correct
                ? "🎉 Correct! " + currentQuestion.explanation
                : "Not quite! The answer is " + currentQuestion.answer + ". " + currentQuestion.explanation;
            game.querySelector(".number-game-score").textContent = "⭐ Score: " + score;
            const next = document.createElement("button");
            next.type = "button";
            next.className = "number-game-next";
            next.textContent = questionNumber === TOTAL_QUESTIONS ? "See my score" : "Next question →";
            next.dataset.numberNext = "true";
            game.appendChild(next);
            return;
        }

        if (event.target.closest("[data-number-next]")) {
            questionNumber++;
            if (questionNumber > TOTAL_QUESTIONS) {
                gameFinished = true;
                event.target.closest("[data-number-game]").outerHTML = renderResult();
            } else {
                const level = Math.min(3, Math.ceil(questionNumber / 2));
                currentQuestion = makeQuestion(level);
                event.target.closest("[data-number-game]").outerHTML = renderGame();
            }
            return;
        }

        if (event.target.closest("[data-number-restart]")) {
            event.target.closest(".number-game-result").outerHTML = startGame();
        }
    });
})();
