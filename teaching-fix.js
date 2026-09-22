// GeorgeBot teaching flow compatibility fix
// Uses DOM references directly so it works independently of script.js scope.
(function () {
    function install() {
        const form = document.getElementById("chat-form");
        const input = document.getElementById("user-input");
        const chat = document.getElementById("chat");
        if (!form || !input || !chat || typeof window.detectTeachingConcept !== "function") return;
        if (form.dataset.teachingFixInstalled === "true") return;
        form.dataset.teachingFixInstalled = "true";

        form.addEventListener("submit", function (event) {
            const question = input.value.trim();
            const conceptId = window.detectTeachingConcept(question);
            if (!question || !conceptId) return;

            event.preventDefault();
            event.stopImmediatePropagation();

            window.addTeachingMessage(question, "user-message");
            input.value = "";
            window.showTeachingYearChoices(conceptId);
        }, true);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", install);
    } else {
        install();
    }
})();
