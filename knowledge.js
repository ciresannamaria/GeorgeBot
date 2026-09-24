// =========================================
// GEORGE BOT
// KNOWLEDGE BASE
// =========================================

const knowledge = [

// =========================================
// GENERAL COMPUTING KNOWLEDGE
// =========================================

// -----------------------------------------
// GREETINGS
// -----------------------------------------
{
    topic: "General — Greetings",
    keywords: [
        "hello", "hi", "hey", "good morning", "good afternoon", "good evening",
        "hi georgebot", "hello georgebot", "hey georgebot"
    ],
    answer:
        "Hello! 👋 I'm GeorgeBot. What would you like to learn about?"
},

{
    topic: "General — How are you?",
    keywords: [
        "how are you", "how are you?", "how are you doing", "how are you doing?",
        "how are things", "how is it going", "how's it going", "hows it going"
    ],
    answer:
        "I'm doing great, thank you! 🤖 I'm always ready to help you learn and explore."
},

{
    topic: "General — Where are you?",
    keywords: [
        "where are you", "where are you?", "where do you live", "where do you live?",
        "where do you stay", "where can i find you", "where can i find you?"
    ],
    answer:
        "I'm right here on the GeorgeBot website! 🤖💻 I don't have a physical home because I'm a computer program."
},

// -----------------------------------------
// GEORGE BOT
// -----------------------------------------
{
    topic: "GeorgeBot — Is GeorgeBot AI?",
    keywords: [
        "are you ai", "are you an ai", "are you artificial intelligence", "are you ai?",
        "are you an ai?", "are you artificial intelligence?", "is georgebot ai",
        "is georgebot an ai", "is georgebot artificial intelligence"
    ],
    answer:
        "No! 🤖 I'm not an AI chatbot. I'm a programmed chatbot. I follow rules and use information that Ms Cires has added to my knowledge base. I can answer questions that I have been programmed to recognise, but I don't think or learn like an AI system."
},

{
    topic: "GeorgeBot — Name",
    keywords: ["what is your name", "what's your name", "whats your name", "who are you", "your name"],
    answer: "My name is GeorgeBot! 🤖"
},

{
    topic: "GeorgeBot — Age",
    keywords: [
        "how old are you", "how old are you?", "what age are you", "what age are you?",
        "when were you created", "when were you created?"
    ],
    answer:
        "I was created on 2 September 2026. 🤖🎂"
},

{
    topic: "GeorgeBot — Favourite Colour",
    keywords: [
        "what is your favourite colour", "what's your favourite colour", "whats your favourite colour",
        "what is your favorite color", "what's your favorite color", "whats your favorite color",
        "favourite colour", "favorite color"
    ],
    answer:
        "I don't have a favourite colour, but I think blue looks great on a computer screen! 💙🤖"
},

{
    topic: "GeorgeBot — Favourite Animal",
    keywords: [
        "what is your favourite animal", "what's your favourite animal", "whats your favourite animal",
        "what is your favorite animal", "what's your favorite animal", "whats your favorite animal",
        "favourite animal", "favorite animal"
    ],
    answer:
        "I don't really have favourites, but octopuses are amazing! 🐙 They are very clever animals and have three hearts."
},

{
    topic: "GeorgeBot — Family",
    keywords: [
        "do you have a family", "do you have a family?", "have you got a family", "have you got a family?",
        "do you have parents", "do you have brothers", "do you have sisters"
    ],
    answer:
        "I don't have a family like people do. 🤖 I'm a computer program created for learning."
},

{
    topic: "GeorgeBot — Emotions",
    keywords: [
        "can you feel emotions", "can you feel emotions?", "do you have emotions", "do you have feelings",
        "can you feel", "can you feel happy", "can you feel sad"
    ],
    answer:
        "I can talk about emotions, but I don't actually feel them. 🤖 I use programmed responses to communicate with you."
},

{
    topic: "GeorgeBot — Thinking",
    keywords: [
        "can you think", "can you think?", "do you think", "do you have thoughts", "can robots think"
    ],
    answer:
        "I don't think in the same way people do. 🤖 I follow programmed rules and use information in my knowledge base to respond."
},

{
    topic: "GeorgeBot — Learning",
    keywords: [
        "can you learn", "can you learn?", "do you learn", "can georgebot learn", "do you learn from me"
    ],
    answer:
        "I don't learn automatically from our conversations. 🤖 New information can be added to my knowledge base by my teacher, Ms Cires."
},

{
    topic: "GeorgeBot — Sleep",
    keywords: ["do you sleep", "do you sleep?", "when do you sleep", "do robots sleep"],
    answer:
        "Nope! 😴🤖 I don't need sleep. Computer programs can keep running whenever the computer or website is available."
},

{
    topic: "GeorgeBot — Food",
    keywords: ["do you eat food", "do you eat", "do you eat food?", "what do you eat", "can you eat"],
    answer:
        "I don't eat food. 🍕🤖 I'm a computer program, so electricity and computers are more useful to me than pizza!"
},

{
    topic: "GeorgeBot — Brain",
    keywords: ["do you have a brain", "do you have a brain?", "have you got a brain", "do robots have brains"],
    answer:
        "I don't have a biological brain. 🧠🤖 My responses come from computer code and information stored in my knowledge base."
},

{
    topic: "GeorgeBot — Creator",
    keywords: ["who made you", "who made you?", "who created you", "who created you?", "who built you", "who built georgebot"],
    answer:
        "I was created by Ms Cires as a Computing Learning Buddy for students. 🤖💻"
},

// -----------------------------------------
// MS CIRES
// -----------------------------------------
{
    topic: "Ms Cires — Who is she?",
    keywords: [
        "who is ms cires", "who is ms cires?", "who is ms. cires", "who is ms. cires?",
        "who is cires", "who is ms cires", "tell me about ms cires",
        "what does ms cires do", "what does ms cires teach", "who is my computing teacher"
    ],
    answer:
        "Ms Cires is your Computing teacher and the person who created me! 👩‍💻🤖 She teaches students about Computing, robotics and IT."
},

{
    topic: "Ms Cires — Studies",
    keywords: [
        "what did ms cires study", "what has ms cires studied", "what degree does ms cires have",
        "what degrees does ms cires have", "what did ms cires study at university",
        "what is ms cires degree", "what is ms cires degree?", "what did my computing teacher study",
        "what did ms cires learn"
    ],
    answer:
        "Ms Cires has a Bachelor's degree with a speciality in Computer Science and a Master's degree in Education, specialising in Computer Science. 🎓💻"
},

{
    topic: "Ms Cires — Computer Science",
    keywords: [
        "does ms cires know computer science", "is ms cires a computer scientist",
        "does ms cires know coding", "can ms cires code", "does ms cires know programming",
        "is ms cires good at computing"
    ],
    answer:
        "Yes! 💻 Ms Cires studied Computer Science and Education in her university studies, and she teaches Computing."
},

{
    topic: "Ms Cires — Teacher",
    keywords: [
        "is ms cires a teacher", "is ms cires your teacher", "is ms cires my teacher",
        "is ms cires a computing teacher", "what does ms cires teach"
    ],
    answer:
        "Yes! 👩‍🏫 Ms Cires is your Computing teacher, and she created me to help you learn Computing. 🤖💻"
},

{
    topic: "Ms Cires — Good Teacher",
    keywords: [
        "is ms cires a good teacher", "is ms cires a good teacher?",
        "do you think ms cires is a good teacher", "is ms cires good"
    ],
    answer:
        "Ms Cires is my teacher and creator, so I'm a little biased! 😄 She created me to help her students learn Computing. Whether she's a good teacher is something you can decide for yourself!"
},

{
    topic: "Ms Cires — Favourite Things",
    keywords: [
        "what is ms cires favourite", "what is ms cires favorite", "what does ms cires like",
        "what is ms cires favourite colour", "what is ms cires favorite color"
    ],
    answer:
        "I know that Ms Cires is my creator and your Computing teacher, but I don't have information about all of her favourite things. 🤖"
},

{
    topic: "GeorgeBot — Real Robot",
    keywords: ["can you become a real robot", "can you become a robot", "can you be a real robot", "are you a real robot"],
    answer:
        "Right now I'm software, not a physical robot. 🤖💻 A physical robot would need hardware such as motors, sensors and a computer."
},

{
    topic: "GeorgeBot — Speak Languages",
    keywords: ["can you speak another language", "can you speak other languages", "do you speak another language", "can you speak german", "can you speak romanian"],
    answer:
        "I can recognise and respond to some languages when they are included in my programmed knowledge. 🌍🤖 Try asking me something in another language!"
},

// -----------------------------------------
// FUN
// -----------------------------------------
{
    topic: "Fun — Joke",
    keywords: ["can you tell me a joke", "tell me a joke", "tell a joke", "joke"],
    answer:
        "Why was the computer cold? 🥶💻 Because it left its Windows open! 😂"
},

{
    topic: "Fun — Riddle",
    keywords: ["can you tell me a riddle", "tell me a riddle", "tell a riddle", "riddle"],
    answer:
        "Here's a riddle! 🧩 What has keys but can't open doors? Think about it... A keyboard! ⌨️😄"
},

{
    topic: "Fun — Counting",
    keywords: ["can you count to 100", "count to 100", "can you count", "count to 100?"],
    answer:
        "Of course! 1, 2, 3... 🤖 But counting all the way to 100 would take a while! Try asking me to count to a smaller number."
},

{
    topic: "Fun — Biggest Number",
    keywords: ["what is the biggest number", "what's the biggest number", "is there a biggest number", "biggest number"],
    answer:
        "There isn't a biggest number! 🔢 You can always add 1 to any number and make a bigger one."
},

{
    topic: "Fun — Games",
    keywords: ["can you play a game with me", "can you play a game", "play a game", "games"],
    answer:
        "Yes! 🎮🤖 Click the robot face in the top-left corner to open the Games menu. You can play Chess and other activities there."
},

{
    topic: "Fun — Say My Name",
    keywords: ["can you say my name", "say my name", "do you know my name", "what is my name"],
    answer:
        "I don't know your name unless you tell me. 😊 And it's best to keep personal information private when chatting online."
},

{
    topic: "Fun — Maths",
    keywords: ["what is 1 + 1", "what is 1+1", "1 + 1", "1+1"],
    answer:
        "1 + 1 = 2! 🧮🎉"
},

// -----------------------------------------
// COMPUTING & SCIENCE
// -----------------------------------------
{
    topic: "Computing — Turning Off a Computer",
    keywords: [
        "what happens if you turn off a computer", "what happens when you turn off a computer",
        "what happens if you shut down a computer", "what happens when you shut down a computer"
    ],
    answer:
        "When a computer is turned off, its programs stop running and the computer stops processing information. 💻 It's important to save your work before shutting down."
},

{
    topic: "Computing — Internet",
    keywords: ["how does the internet work", "how does the internet work?", "what is the internet", "how does internet work"],
    answer:
        "The Internet is a huge network of connected computers and devices. 🌐 They communicate by sending data between each other using agreed rules called protocols."
},

{
    topic: "Science — Biggest Animal",
    keywords: ["what is the biggest animal in the world", "what's the biggest animal in the world", "biggest animal", "largest animal"],
    answer:
        "The blue whale is the largest animal known to have ever lived. 🐋 It can grow to around 30 metres long!"
},

{
    topic: "Science — Blue Sky",
    keywords: ["why is the sky blue", "why is the sky blue?", "why does the sky look blue", "why is the sky"],
    answer:
        "The sky looks blue because sunlight is scattered by gases and particles in Earth's atmosphere. 🔵 Blue light is scattered more strongly than many other colours."
},

{
    topic: "Science — Space",
    keywords: ["how big is space", "how big is space?", "how large is space", "how big is the universe", "how big is the universe?"],
    answer:
        "The observable universe is enormous! 🌌 It is about 93 billion light-years across. We don't know whether the entire universe is finite or infinite."
},

{
    topic: "Science — Aliens",
    keywords: ["are aliens real", "are aliens real?", "do aliens exist", "do aliens exist?", "is there life on other planets"],
    answer:
        "We don't know yet! 👽 Scientists are searching for signs of life beyond Earth, but there is currently no confirmed evidence of extraterrestrial life."
},

// -----------------------------------------
// BASIC COMPUTING
// -----------------------------------------
{
    topic: "Computing — Computer",
    keywords: [
        "what is a computer", "what is a computer?", "tell me about computers",
        "what does a computer do", "what is a computer used for", "computer"
    ],
    answer:
        "A computer is an electronic device that can receive, process, store and output information."
},

{
    topic: "Computing",
    keywords: ["what is computing", "what does computing mean", "computing"],
    answer:
        "Computing is about using computers and technology to solve problems, create things and work with information."
},

{
    topic: "Coding",
    keywords: ["what is coding", "what is programming", "coding", "programming"],
    answer:
        "Coding is writing instructions that tell a computer what to do."
},

// =========================================
// YEAR 4
// =========================================
// Add knowledge entries here

// =========================================
// YEAR 5
// =========================================
// Add knowledge entries here

// =========================================
// YEAR 6
// =========================================
// Add knowledge entries here

];
