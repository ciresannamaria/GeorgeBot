// =========================================
// GEORGE BOT — CAT CORNER
// A small, playful Easter egg for cat-loving students.
// =========================================
(function () {
    const catFacts = [
        "Cats can rotate their ears to help locate sounds.",
        "A cat's whiskers help it judge whether a space is wide enough to fit through.",
        "Most cats have five toes on their front paws and four on their back paws.",
        "Cats spend a lot of time sleeping — often around 12 to 16 hours a day.",
        "A group of cats is sometimes called a clowder.",
        "Cats use purring to communicate, and sometimes to comfort themselves.",
        "A cat's nose print is unique, a bit like a human fingerprint.",
        "Cats can jump several times their own body length."
    ];
    function randomItem(items) {
        return items[Math.floor(Math.random() * items.length)];
    }
    window.isCatQuestion = function (question) {
        return /\b(cat|cats|kitten|kittens|feline|meow|meows|purr|purring)\b/i.test(question);
    };
    window.getCatAnswer = function () {
        const fact = randomItem(catFacts);
        const imageUrl = "https://cataas.com/cat?width=440&height=280&fit=cover&t=" + Date.now();
        return `
            <div class="cat-corner">
                <p>🐾 You found <strong>GeorgeBot's Cat Corner!</strong></p>
                <img class="cat-corner-image" src="${imageUrl}" alt="A surprise cat" loading="lazy">
                <p class="cat-corner-fact"><strong>Cat fact:</strong> <span>${fact}</span></p>
                <button class="cat-another-button" type="button" data-cat-next>🐱 Show me another cat!</button>
                <p class="cat-corner-note">Paws, pause, and enjoy your little cat break!</p>
            </div>`;
    };
    document.addEventListener("click", function (event) {
        const button = event.target.closest("[data-cat-next]");
        if (!button) return;
        const corner = button.closest(".cat-corner");
        if (!corner) return;
        corner.querySelector(".cat-corner-image").src =
            "https://cataas.com/cat?width=440&height=280&fit=cover&t=" + Date.now();
        corner.querySelector(".cat-corner-fact span").textContent = randomItem(catFacts);
    });
})();
