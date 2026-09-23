// =========================================
// GEORGE BOT - TEACH ME
// =========================================

const georgeConcepts = {
    sequences: { icon:"🧩", name:"Sequences", aliases:["sequence","sequences","sequencing","ordered instructions","steps"], prompts:["what is a sequence","teach me sequences","learn about sequences","what is sequencing","teach me sequencing"], explanations:{"years1-2":"A sequence is a set of instructions in the right order. 🧩 Computers follow instructions step by step.","years3-4":"A sequence is a set of instructions that a computer follows in a particular order. 🧩 Changing the order can change what the program does.","years5-6":"A sequence is an ordered set of instructions. 🧩 Programs use sequences to make actions happen in the intended order."} },
    loops: { icon:"🔁", name:"Loops", aliases:["loop","loops","repeat","repetition","for loop","while loop","until loop","nested loop"], prompts:["what is a loop","what are loops","teach me loops","learn about loops","how do loops work","can you teach me about loops"], explanations:{"years1-2":"A loop lets a computer repeat instructions. 🔁 Instead of writing the same instruction many times, you can tell the computer to repeat it.","years3-4":"A loop repeats instructions in a program. 🔁 This saves you from writing the same instructions again and again.","years5-6":"A loop repeats a block of instructions. 🔁 Different loops can repeat a set number of times or continue while a condition is met."} },
    conditionals: { icon:"🔀", name:"Conditionals", aliases:["conditional","conditionals","if else","if/else","if statement","decisions"], prompts:["what is a conditional","what are conditionals","teach me conditionals","learn about conditionals","what is if else","teach me if else"], explanations:{"years1-2":"A conditional helps a program make a choice. 🔀 IF something is true, the program can do one thing; ELSE it can do another.","years3-4":"A conditional lets a program make a decision based on a condition. 🔀 An IF/ELSE can choose between two actions.","years5-6":"A conditional controls which instructions run depending on whether a condition is true or false. 🔀 IF/ELSE statements let programs make decisions."} },
    variables: { icon:"🔢", name:"Variables", aliases:["variable","variables","score","store information","store a value"], prompts:["what is a variable","what are variables","teach me variables","learn about variables","how do variables work"], explanations:{"years1-2":"A variable is like a labelled box that can hold information. 🔢 The value in the box can change while a program runs.","years3-4":"A variable stores information that a program can use and change. 🔢 A game can use a variable to keep track of a score.","years5-6":"A variable is a named place for storing a value. 🔢 Programs can read a variable and change its value as the program runs."} },
    debugging: { icon:"🐞", name:"Debugging", aliases:["debug","debugging","bug","bugs","fix a bug","find errors","fix errors","mistake in code"], prompts:["what is debugging","teach me debugging","learn about debugging","how do i debug","how do you debug code","what is a bug in coding"], explanations:{"years1-2":"Debugging means finding and fixing a problem in a program. 🐞 A bug is a mistake that makes the program behave differently from what you wanted.","years3-4":"Debugging is the process of finding and fixing problems in a program. 🐞 Test your code, find where it goes wrong, change the instructions, and test again.","years5-6":"Debugging is a systematic way of finding and fixing errors in a program. 🐞 Test, identify the problem, change the code, and test again."} },
    events: { icon:"🎯", name:"Events", aliases:["event","events","trigger","when clicked","when key pressed","user input"], prompts:["what is an event","what are events","teach me events","learn about events","how do events work","what are programming events"], explanations:{"years1-2":"An event is something that happens that can make a program respond. 🎯 For example, clicking a button can make something happen.","years3-4":"An event is something that happens in a program and can trigger instructions. 🎯 For example, pressing a key can start an action.","years5-6":"An event is an occurrence that triggers code to run. 🎯 Events can come from users, such as clicks or key presses, or from things happening in a program."} }
};

const activityConceptOverrides = {
    "Debugging with Laurel":["debugging","sequences","loops"], "Hello World":["events"], "Sprites in Action":["events"], "Mini-Project: Virtual Pet":["events"], "Dance Party":["events"], "Build a Star Wars Game":["events"], "Game Design":["events"], "Environment and Players":["events"], "Game Jam Day 1: Create":["events"], "Mini-Project: User Input Programs":["events"], "Build a Flappy Game":["events"], "Mini-Project: Chase Game":["events"], "Mini-Project: A Royal Battle with Events":["events"], "Mini-Project: On the Move with Play Lab":["events"], "Mini-Project: Sticker Art":["events"],
    "Mini-Project: Collector Game":["variables","events"], "Outbreak":["variables"], "Counting with Variables":["variables"], "Using Variables with the Artist":["variables","loops"], "Variables with the Bee":["variables","conditionals"], "Variables as Score":["variables"], "Harvesting with Conditionals":["conditionals"], "Conditionals in Minecraft: Voyage Aquatic":["conditionals"], "Conditionals with the Farmer":["conditionals"], "If/Else with Bee":["conditionals"], "Looking Ahead with Minecraft":["sequences","conditionals"],
    "Programming with Angry Birds":["sequences"], "Programming with Harvester":["sequences"], "Programming with Scrat":["sequences"], "Programming with Rey and BB-8":["sequences"], "Sequencing with Angry Birds":["sequences"], "Sequencing with Scrat":["sequences"], "Sequencing in Music Lab":["sequences","loops"], "Introduction to Online Puzzles":["sequences"], "Learn to Drag and Drop":["sequences"],
    "Loops with Scrat":["loops"], "Loops with Laurel":["loops"], "Ocean Scene with Loops":["loops"], "Loops with Harvester":["loops"], "Drawing Gardens with Loops":["loops"], "Loops with Rey and BB-8":["loops"], "Harvesting Crops with Loops":["loops"], "Loops in Ice Age":["loops"], "Drawing Shapes with Loops":["loops"], "Nested Loops in Maze":["loops"], "While Loops in Farmer":["loops"], "Until Loops in Maze":["loops"], "For Loops with Bee":["loops"], "For Loops with Artist":["loops"]
};

function normaliseTeachingText(text){return String(text||"").toLowerCase().replace(/[?!.,:;'\"]/g,"").replace(/\s+/g," ").trim();}
function detectTeachingConcept(question){
    const text=normaliseTeachingText(question);
    for(const [id,c] of Object.entries(georgeConcepts)){if(c.prompts.some(p=>text.includes(normaliseTeachingText(p))))return id;}
    const learningWords=["teach me","teach","learn about","learn","explain","how do","how does","what is","what are"];
    if(!learningWords.some(w=>text.includes(w)))return null;
    for(const [id,c] of Object.entries(georgeConcepts)){if(c.aliases.some(a=>text.includes(normaliseTeachingText(a))))return id;}
    return null;
}
function getActivityConcepts(activity){
    if(Object.prototype.hasOwnProperty.call(activityConceptOverrides,activity.title))return activityConceptOverrides[activity.title];
    const t=normaliseTeachingText(activity.title),tags=[];
    if(/sequenc|programming|puzzle|drag and drop/.test(t))tags.push("sequences");
    if(/loop|repeat|for loop|while loop|until loop/.test(t))tags.push("loops");
    if(/if\/else|conditionals?/.test(t))tags.push("conditionals");
    if(/variable|counting with/.test(t))tags.push("variables");
    if(/debug/.test(t))tags.push("debugging");
    if(/event|dance party|sprite|game|virtual pet|user input|prompt/.test(t))tags.push("events");
    return [...new Set(tags)];
}
function getTeachingActivities(conceptId,yearGroupId){
    if(typeof activities==="undefined"||!Array.isArray(activities))return [];
    return activities.filter(a=>a.yearGroups&&a.yearGroups.includes(yearGroupId)&&getActivityConcepts(a).includes(conceptId)).sort((a,b)=>(a.level||99)-(b.level||99));
}
function addTeachingMessage(text,className="bot-message"){
    const message=document.createElement("div");message.className="message "+className;
    message.innerHTML="<strong>"+(className==="user-message"?"You":"GeorgeBot")+"</strong><p>"+text+"</p>";
    chat.appendChild(message);chat.scrollTop=chat.scrollHeight;
}
function addTeachingButton(label,callback,className){
    const wrapper=document.createElement("div"),button=document.createElement("button");wrapper.className="teaching-choice-wrap";button.type="button";button.className="teaching-choice-button "+(className||"");button.textContent=label;button.addEventListener("click",callback);wrapper.appendChild(button);chat.appendChild(wrapper);chat.scrollTop=chat.scrollHeight;
}
function showTeachingYearChoices(conceptId){
    const c=georgeConcepts[conceptId];if(!c)return;
    addTeachingMessage(c.icon+" <strong>"+c.name+"</strong><br><br>Which year are you in?");
    addTeachingButton("🟢 Years 1–2",()=>finishTeaching(conceptId,"years1-2"),"year-choice-green");
    addTeachingButton("🔵 Years 3–4",()=>finishTeaching(conceptId,"years3-4"),"year-choice-blue");
    addTeachingButton("🟣 Years 5–6",()=>finishTeaching(conceptId,"years5-6"),"year-choice-purple");
}
function finishTeaching(conceptId,yearGroupId){
    const c=georgeConcepts[conceptId];addTeachingMessage(c.icon+" <strong>"+c.name+"</strong><br><br>"+c.explanations[yearGroupId]+"<br><br>🎮 <strong>Ready to try it?</strong>");
    const matches=getTeachingActivities(conceptId,yearGroupId);
    if(!matches.length){addTeachingMessage("I don't have a matching activity for this concept and year group yet. Try another topic!");return;}
    const first=matches[0],card=document.createElement("a");card.className="teaching-activity-card";card.href=first.link;card.target="_blank";card.rel="noopener noreferrer";card.innerHTML="<span class=\"teaching-activity-icon\">"+first.icon+"</span><span><strong>"+first.title+"</strong><small>Level "+(first.level||1)+"</small></span><span class=\"teaching-activity-arrow\">↗</span>";chat.appendChild(card);
    if(matches.length>1){const next=matches[1],challenge=document.createElement("a");challenge.className="teaching-challenge-card";challenge.href=next.link;challenge.target="_blank";challenge.rel="noopener noreferrer";challenge.textContent="⭐ Try another "+c.name.toLowerCase()+" activity";chat.appendChild(challenge);}
    chat.scrollTop=chat.scrollHeight;
}
(function installTeachingSubmitHandler(){
    if(!form||!input)return;
    form.addEventListener("submit",function(event){
        const question=input.value.trim(),conceptId=detectTeachingConcept(question);if(!question||!conceptId)return;
        event.preventDefault();event.stopImmediatePropagation();addTeachingMessage(question,"user-message");input.value="";showTeachingYearChoices(conceptId);
    },true);
})();

// Expose these functions so the compatibility handler can use the same
// teaching system if the normal submit listener is unavailable.
window.georgeConcepts=georgeConcepts;
window.detectTeachingConcept=detectTeachingConcept;
window.addTeachingMessage=addTeachingMessage;
window.showTeachingYearChoices=showTeachingYearChoices;
