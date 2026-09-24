// GeorgeBot runtime safety fixes.
(function () {
    function install() {
        const form = document.getElementById("chat-form");
        const input = document.getElementById("user-input");
        const chat = document.getElementById("chat");
        if (!form || !input || !chat) return;

        function addRuntimeMessage(sender, text, className) {
            const message = document.createElement("div");
            message.className = "message " + className;
            message.innerHTML = "<strong>" + sender + "</strong><p>" + text + "</p>";
            chat.appendChild(message);
            chat.scrollTop = chat.scrollHeight;
        }

        function logRuntimeQuestion(question, answer) {
            if (typeof window.saveQuestionToLog === "function") {
                window.saveQuestionToLog(question, answer);
            }
        }

        function solveNaturalCalculation(question) {
            let expression = question
                .toLowerCase()
                .replace(/what\s+is\b/g, "")
                .replace(/what\b/g, "")
                .replace(/calculate\b/g, "")
                .replace(/work\s+out\b/g, "")
                .replace(/solve\b/g, "")
                .replace(/can\s+you\b/g, "")
                .replace(/could\s+you\b/g, "")
                .replace(/please\b/g, "")
                .replace(/divided\s+by/g, "/")
                .replace(/divide\s+by/g, "/")
                .replace(/multiplied\s+by/g, "*")
                .replace(/times/g, "*")
                .replace(/plus/g, "+")
                .replace(/minus/g, "-")
                .replace(/\bx\b/g, "*")
                .replace(/÷/g, "/")
                .replace(/×/g, "*")
                .replace(/=/g, "")
                .replace(/[?!.,:;'\"]/g, "")
                .replace(/\s+/g, "")
                .trim();

            // Only intercept messages that actually contain an arithmetic
            // operator. This prevents ordinary questions such as "What is IT?"
            // from being treated as calculations.
            if (!/[+*/%\-]/.test(expression)) {
                return null;
            }

            if (!/^[0-9+*/().%\-]+$/.test(expression)) {
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

                return "🧮 " + question + " = <strong>" + roundedResult + "</strong>";
            } catch (error) {
                return null;
            }
        }

        form.addEventListener("submit", function (event) {
            const question = input.value.trim();
            const lower = question.toLowerCase();

            if (!question) return;

            // A bare range such as 4-5 is often a year range, not maths.
            if (/^\d+(?:\.\d+)?\s*-\s*\d+(?:\.\d+)?$/.test(question)) {
                event.preventDefault();
                event.stopImmediatePropagation();

                addRuntimeMessage("You", question, "user-message");
                const answer = "😊 If you mean your year group, choose one of the year buttons: 🟢 Years 1–2, 🔵 Years 3–4, or 🟣 Years 5–6.";
                addRuntimeMessage("GeorgeBot", answer, "bot-message");
                logRuntimeQuestion(question, answer);
                input.value = "";
                return;
            }

            // Handle natural-language arithmetic before the normal knowledge
            // matcher. Otherwise a word such as "what" can accidentally match
            // an unrelated knowledge-base answer.
            const calculationAnswer = solveNaturalCalculation(question);
            if (calculationAnswer !== null) {
                event.preventDefault();
                event.stopImmediatePropagation();

                addRuntimeMessage("You", question, "user-message");
                addRuntimeMessage("GeorgeBot", calculationAnswer, "bot-message");
                logRuntimeQuestion(question, calculationAnswer);
                input.value = "";
                return;
            }

            // Recognise natural questions about playing OR learning chess.
            // Students may say "play chess", "chess game", "learn chess",
            // "I would like to learn chess", etc.
            const asksAboutChess = /\bchess\b/.test(lower);
            const chessIntent = /\b(play|playing|game|games|learn|learning|teach|teaching|study|know|how)\b/.test(lower);
            if (asksAboutChess && chessIntent) {
                event.preventDefault();
                event.stopImmediatePropagation();

                addRuntimeMessage("You", question, "user-message");
                const answer = "♟️ Yes! You can play Chess with me. Click the robot face in the top-left corner to open the hidden Games menu.";
                addRuntimeMessage("GeorgeBot", answer, "bot-message");
                logRuntimeQuestion(question, answer);
                input.value = "";
                return;
            }
        }, true);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", install);
    } else {
        install();
    }
})();