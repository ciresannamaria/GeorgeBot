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

        form.addEventListener("submit", function (event) {
            const question = input.value.trim();
            const lower = question.toLowerCase();

            if (!question) return;

            // A bare range such as 4-5 is often a year range, not maths.
            if (/^\d+(?:\.\d+)?\s*-\s*\d+(?:\.\d+)?$/.test(question)) {
                event.preventDefault();
                event.stopImmediatePropagation();

                addRuntimeMessage("You", question, "user-message");
                addRuntimeMessage(
                    "GeorgeBot",
                    "😊 If you mean your year group, choose one of the year buttons: 🟢 Years 1–2, 🔵 Years 3–4, or 🟣 Years 5–6.",
                    "bot-message"
                );
                input.value = "";
                return;
            }

            // Recognise natural questions about playing chess.
            if (/\bchess\b/.test(lower) && /\b(play|game|games)\b/.test(lower)) {
                event.preventDefault();
                event.stopImmediatePropagation();

                // This handler takes over the normal submit handler, so it must
                // explicitly render BOTH sides of the conversation.
                addRuntimeMessage("You", question, "user-message");
                addRuntimeMessage(
                    "GeorgeBot",
                    "♟️ Yes! You can play Chess with me. Click the robot face in the top-left corner to open the hidden Games menu.",
                    "bot-message"
                );
                input.value = "";
            }
        }, true);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", install);
    } else {
        install();
    }
})();
