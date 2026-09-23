// GeorgeBot runtime safety fixes.
(function () {
    function install() {
        const form = document.getElementById("chat-form");
        const input = document.getElementById("user-input");
        const chat = document.getElementById("chat");
        if (!form || !input || !chat) return;

        form.addEventListener("submit", function (event) {
            const question = input.value.trim();
            const lower = question.toLowerCase();

            // A bare range such as 4-5 is often a year range, not maths.
            if (/^\d+(?:\.\d+)?\s*-\s*\d+(?:\.\d+)?$/.test(question)) {
                event.preventDefault();
                event.stopImmediatePropagation();
                const message = document.createElement("div");
                message.className = "message bot-message";
                message.innerHTML = "<strong>GeorgeBot</strong><p>😊 If you mean your year group, choose one of the year buttons: 🟢 Years 1–2, 🔵 Years 3–4, or 🟣 Years 5–6.</p>";
                chat.appendChild(message);
                chat.scrollTop = chat.scrollHeight;
                input.value = "";
                return;
            }

            // Recognise natural questions about playing chess.
            if (/\bchess\b/.test(lower) && /\b(play|game|games)\b/.test(lower)) {
                event.preventDefault();
                event.stopImmediatePropagation();
                const message = document.createElement("div");
                message.className = "message bot-message";
                message.innerHTML = "<strong>GeorgeBot</strong><p>♟️ Yes! You can play Chess with me. Click the robot face in the top-left corner to open the hidden Games menu.</p>";
                chat.appendChild(message);
                chat.scrollTop = chat.scrollHeight;
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
