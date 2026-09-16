// =========================================
// GEORGE BOT ACTIVITIES
// Activity catalogue
// =========================================

const activities = [
    {
        title: "ScratchJr",
        description: "",
        icon: "🐱",
        category: "Coding Games",
        level: 1,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://codejr.org/"
    },
    {
        title: "Learn to Drag and Drop",
        description: "",
        icon: "🖱️",
        category: "Coding Games",
        level: 1,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/coursea-2025/units/1/lessons/2/levels/1?viewAs=Instructor"
    },
    {
        title: "Sequencing with Scrat",
        description: "",
        icon: "🧩",
        category: "Coding Games",
        level: 1,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/coursea-2025/units/1/lessons/4/levels/1"
    },
    {
        title: "Programming with Scrat",
        description: "",
        icon: "🐿️",
        category: "Coding Games",
        level: 1,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/coursea-2025/units/1/lessons/5/levels/1"
    },
    {
        title: "Programming with Rey and BB-8",
        description: "",
        icon: "🤖",
        category: "Coding Games",
        level: 1,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/coursea-2025/units/1/lessons/6/levels/1"
    },
    {
        title: "Loops with Scrat",
        description: "",
        icon: "🔁",
        category: "Coding Games",
        level: 1,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/coursea-2025/units/1/lessons/8/levels/1?viewAs=Instructor"
    },
    {
        title: "Loops with Laurel",
        description: "",
        icon: "🌳",
        category: "Coding Games",
        level: 1,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/coursea-2025/units/1/lessons/9/levels/1"
    },
    {
        title: "Ocean Scene with Loops",
        description: "",
        icon: "🌊",
        category: "Coding Games",
        level: 1,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/coursea-2025/units/1/lessons/10/levels/1"
    },
    {
        title: "Mini-Project: On the Move with Play Lab",
        description: "",
        icon: "🎮",
        category: "Coding Games",
        level: 1,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/coursea-2025/units/1/lessons/12/levels/1"
    },
    {
        title: "End of Course Project",
        description: "",
        icon: "🏆",
        category: "Coding Games",
        level: 1,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/coursea-2025/units/1/lessons/13/levels/1"
    },
    {
        title: "Sequencing with Angry Birds",
        description: "",
        icon: "🐦",
        category: "Coding Games",
        level: 2,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/courseb-2025/units/1/lessons/3/levels/1?viewAs=Instructor"
    },
    {
        title: "Programming with Angry Birds",
        description: "",
        icon: "🐦",
        category: "Coding Games",
        level: 2,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/courseb-2025/units/1/lessons/4/levels/1"
    },
    {
        title: "Programming with Harvester",
        description: "",
        icon: "🚜",
        category: "Coding Games",
        level: 2,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/courseb-2025/units/1/lessons/5/levels/1"
    },
    {
        title: "Loops with Harvester",
        description: "",
        icon: "🔁",
        category: "Coding Games",
        level: 2,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/courseb-2025/units/1/lessons/7/levels/1?viewAs=Instructor"
    },
    {
        title: "Loops with Laurel",
        description: "",
        icon: "🌳",
        category: "Coding Games",
        level: 2,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/courseb-2025/units/1/lessons/8/levels/1"
    },
    {
        title: "Drawing Gardens with Loops",
        description: "",
        icon: "🌷",
        category: "Coding Games",
        level: 2,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/courseb-2025/units/1/lessons/9/levels/1"
    },
    {
        title: "Mini-Project: A Royal Battle with Events",
        description: "",
        icon: "👑",
        category: "Coding Games",
        level: 2,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/courseb-2025/units/1/lessons/12/levels/1"
    },
    {
        title: "End of Course Project",
        description: "",
        icon: "🏆",
        category: "Coding Games",
        level: 2,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/courseb-2025/units/1/lessons/13/levels/1"
    },
    {
        title: "Programming with Angry Birds",
        description: "",
        icon: "🐦",
        category: "Coding Games",
        level: 3,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/coursec-2025/units/1/lessons/3/levels/1"
    },
    {
        title: "Debugging in Maze",
        description: "",
        icon: "🐞",
        category: "Coding Games",
        level: 3,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/coursec-2025/units/1/lessons/4/levels/1"
    },
    {
        title: "Collecting Treasure with Laurel",
        description: "",
        icon: "💎",
        category: "Coding Games",
        level: 3,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/coursec-2025/units/1/lessons/5/levels/1"
    },
    {
        title: "Creating Art with Code",
        description: "",
        icon: "🎨",
        category: "Coding Games",
        level: 3,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/coursec-2025/units/1/lessons/6/levels/1"
    },
    {
        title: "Loops with Rey and BB-8",
        description: "",
        icon: "🔁",
        category: "Coding Games",
        level: 3,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/coursec-2025/units/1/lessons/8/levels/1"
    },
    {
        title: "Harvesting Crops with Loops",
        description: "",
        icon: "🌾",
        category: "Coding Games",
        level: 3,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/coursec-2025/units/1/lessons/9/levels/1"
    },
    {
        title: "Mini-Project: Sticker Art",
        description: "",
        icon: "⭐",
        category: "Coding Games",
        level: 3,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/coursec-2025/units/1/lessons/10/levels/1?viewAs=Instructor"
    },
    {
        title: "Build a Flappy Game",
        description: "",
        icon: "🐦",
        category: "Coding Games",
        level: 3,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/coursec-2025/units/1/lessons/12/levels/1"
    },
    {
        title: "Mini-Project: Chase Game",
        description: "",
        icon: "🏃",
        category: "Coding Games",
        level: 3,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/coursec-2025/units/1/lessons/13/levels/1"
    },
    {
        title: "End of Course Project",
        description: "",
        icon: "🏆",
        category: "Coding Games",
        level: 3,
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://studio.code.org/courses/coursec-2025/units/1/lessons/17/levels/1"
    },
    {
        title: "Pixel Art",
        description: "",
        icon: "🎨",
        category: "Create & Design",
        yearGroups: ["years1-2"],
        type: "external",
        link: "https://www.pixilart.com/draw?ref=home-page"
    },
    {
        title: "Scratch",
        description: "",
        icon: "🐱",
        category: "Coding Games",
        yearGroups: ["years3-4", "years5-6"],
        type: "external",
        link: "https://scratch.mit.edu/"
    }
];