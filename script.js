// =========================================
// GEORGE BOT
// Chatbot behaviour
// =========================================

const startScreen = document.getElementById("start-screen");
const askGeorgeButton = document.getElementById("ask-george-button");
const activitiesStartButton = document.getElementById("activities-start-button");
const calmingCornerStartButton = document.getElementById("calming-corner-start-button");
const calmingCorner = document.getElementById("calming-corner");
const calmingBackButton = document.getElementById("calming-back-button");
const zoneCards = document.querySelectorAll(".zone-card");
const zoneSelectionMessage = document.getElementById("zone-selection-message");
const zoneFeelings = document.getElementById("zone-feelings");
const zoneFeelingsTitle = document.getElementById("zone-feelings-title");
const zoneFeelingsList = document.getElementById("zone-feelings-list");
const backToZonesButton = document.getElementById("back-to-zones-button");
const blueSupport = document.getElementById("blue-support");
const blueSupportProgress = document.getElementById("blue-support-progress");
const blueSupportTitle = document.getElementById("blue-support-title");
const blueSupportQuestion = document.getElementById("blue-support-question");
const blueSupportOptions = document.getElementById("blue-support-options");
const blueSupportResult = document.getElementById("blue-support-result");
const blueSupportBack = document.getElementById("blue-support-back");
const greenSupport = document.getElementById("green-support");
const yellowSupport=document.getElementById("yellow-support");
const yellowSupportProgress=document.getElementById("yellow-support-progress");
const yellowSupportTitle=document.getElementById("yellow-support-title");
const yellowSupportQuestion=document.getElementById("yellow-support-question");
const yellowSupportOptions=document.getElementById("yellow-support-options");
const yellowSupportResult=document.getElementById("yellow-support-result");
const yellowHumanConnection=document.getElementById("yellow-human-connection");
const redSupport=document.getElementById("red-support");
const unsureSupport = document.getElementById("unsure-support");
const unsureProgress = document.getElementById("unsure-support-progress");
const unsureTitle = document.getElementById("unsure-support-title");
const unsureQuestion = document.getElementById("unsure-support-question");
const unsureOptions = document.getElementById("unsure-support-options");
const unsureResult = document.getElementById("unsure-support-result");

const greenSupportBack = document.getElementById("green-support-back");
const activitiesHub = document.getElementById("activities-hub");
const yearGroupButtons = document.querySelectorAll(".year-group-button");
const yearSections = document.querySelectorAll(".year-section");
const backToStartButton = document.getElementById("back-to-start-button");
const chat = document.getElementById("chat");
const chatBackButton = document.getElementById("chat-back-button");
const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");

function showChat() {
    startScreen.hidden = true;
    activitiesHub.hidden = true;
    calmingCorner.hidden = true;
    chat.hidden = false;
    form.hidden = false;
    input.focus();
}

function showActivitiesHub() {
    startScreen.hidden = true;
    chat.hidden = true;
    calmingCorner.hidden = true;
    form.hidden = true;
    activitiesHub.hidden = false;
    showYearGroup("years1-2");
}

function showStartScreen() {
    activitiesHub.hidden = true;
    calmingCorner.hidden = true;
    chat.hidden = true;
    form.hidden = true;
    startScreen.hidden = false;
}

function showCalmingCorner() {
    startScreen.hidden = true;
    activitiesHub.hidden = true;
    chat.hidden = true;
    form.hidden = true;
    calmingCorner.hidden = false;
    zoneCards.forEach(function(card) {
        card.setAttribute("aria-pressed", "false");
    });
    document.querySelector(".zones-grid").hidden = false;
    zoneFeelings.hidden = true;
    blueSupport.hidden = true;
    greenSupport.hidden = true;
    yellowSupport.hidden = true;
    redSupport.hidden = true;
    unsureSupport.hidden = true;
    resetBlueSupport();
    zoneSelectionMessage.textContent = "There is no right or wrong answer.";
}

askGeorgeButton.addEventListener("click", showChat);
chatBackButton.addEventListener("click", showStartScreen);
activitiesStartButton.addEventListener("click", showActivitiesHub);
calmingCornerStartButton.addEventListener("click", showCalmingCorner);
calmingBackButton.addEventListener("click", showStartScreen);

const zoneFeelingExamples = {
    blue: { title: "Blue Zone", feelings: ["Sad", "Tired", "Sick", "Bored", "Disappointed"] },
    green: { title: "Green Zone", feelings: ["Calm", "Happy", "Focused", "Content", "Proud"] },
    yellow: { title: "Yellow Zone", feelings: ["Stressed", "Frustrated", "Anxious", "Excited", "Silly"] },
    red: { title: "Red Zone", feelings: ["Angry", "Furious", "Panicked", "Terrified", "Extremely sad"] }
};

function showZoneFeelings(zone) {
    const details = zoneFeelingExamples[zone];
    if (!details) return;
    document.querySelector(".zones-grid").hidden = true;
    zoneSelectionMessage.textContent = "";
    zoneFeelingsTitle.textContent = details.title + " — how are you feeling?";
    zoneFeelingsList.innerHTML = "";

    details.feelings.forEach(function(feeling) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "zone-feeling-option";
        button.setAttribute("aria-pressed", "false");

        const feelingEmojis = {
            "Sad": "😢", "Tired": "😴", "Sick": "🤒", "Bored": "😐", "Disappointed": "😞",
            "Calm": "😌", "Happy": "😊", "Focused": "🎯", "Content": "🙂", "Proud": "🥹",
            "Stressed": "😣", "Frustrated": "😤", "Anxious": "😟", "Excited": "🤩", "Silly": "🤪",
            "Angry": "😠", "Furious": "🤬", "Panicked": "😱", "Terrified": "😨", "Extremely sad": "😭"
        };

        const emoji = document.createElement("span");
        emoji.className = "zone-feeling-emoji";
        emoji.textContent = feelingEmojis[feeling] || "💭";
        const label = document.createElement("span");
        label.className = "zone-feeling-label";
        label.textContent = feeling;
        button.appendChild(emoji);
        button.appendChild(label);

        if (zone === "blue") {
            button.addEventListener("click", function() { showBlueSupport(feeling); });
        } else if (zone === "green") {
            button.addEventListener("click", function() { showGreenSupport(feeling); });
        } else if (zone === "yellow") {
            button.addEventListener("click", function() { showYellowSupport(feeling); });
        } else if (zone === "red") {
            button.addEventListener("click", showRedSupport);
        }
        zoneFeelingsList.appendChild(button);
    });
    zoneFeelings.classList.remove("blue-zone-feelings");
    zoneFeelings.hidden = false;
}

zoneCards.forEach(function(card) {
    card.addEventListener("click", function() {
        zoneCards.forEach(function(otherCard) {
            otherCard.setAttribute("aria-pressed", String(otherCard === card));
        });
        if (zoneFeelingExamples[card.dataset.zone]) {
            showZoneFeelings(card.dataset.zone);
        } else {
            showUnsureSupport();
        }
    });
});

backToZonesButton.addEventListener("click", function() {
    zoneFeelings.hidden = true;
    blueSupport.hidden = true;
    greenSupport.hidden = true;
    yellowSupport.hidden = true;
    redSupport.hidden = true;
    unsureSupport.hidden = true;
    document.querySelector(".zones-grid").hidden = false;
    zoneSelectionMessage.textContent = "There is no right or wrong answer.";
});
blueSupportBack.addEventListener("click", function() {
    blueSupport.hidden = true;
    zoneFeelings.hidden = false;
});
greenSupportBack.addEventListener("click", function() {
    greenSupport.hidden = true;
    zoneFeelings.hidden = false;
});
document.getElementById("yellow-support-back").addEventListener("click",()=>{yellowSupport.hidden=true;zoneFeelings.hidden=false;});
document.getElementById("red-support-back").addEventListener("click",()=>{redSupport.hidden=true;zoneFeelings.hidden=false;});
document.getElementById("unsure-support-back").addEventListener("click",()=>{unsureSupport.hidden=true;document.querySelector(".zones-grid").hidden=false;zoneSelectionMessage.textContent="There is no right or wrong answer.";});
document.getElementById("unsure-human-connection").addEventListener("click",()=>showHumanConnection(unsureTitle,unsureQuestion,unsureResult,unsureOptions));

backToStartButton.addEventListener("click", showStartScreen);


const unsureActivities=[["Notice your body","Notice what your body is telling you","Take about 1 minute. Notice whether your body feels tired, full of energy, tense, relaxed, warm, or something else. You do not need to name a feeling."],["Draw or choose colours","Show it with colours or shapes","For about 2 minutes, draw lines, shapes or colours that match how you feel inside. There is no right or wrong way."],["Take a quiet pause","Take a quiet pause","Sit comfortably for about 1 minute. Let your breathing happen naturally and notice what is around you."],["Move gently","Move gently","If you feel well and have a safe space, stretch gently or roll your shoulders for about 1 minute. Stop if uncomfortable."]];
function unsureButton(label,fn){const b=document.createElement("button");b.type="button";b.className="blue-support-option";b.textContent=label;b.addEventListener("click",fn);unsureOptions.appendChild(b);}
function showUnsureSupport(){document.querySelector(".zones-grid").hidden=true;zoneFeelings.hidden=true;blueSupport.hidden=true;greenSupport.hidden=true;yellowSupport.hidden=true;redSupport.hidden=true;unsureSupport.hidden=false;unsureProgress.textContent="Explore at your own pace";unsureTitle.textContent="It is okay not to know";unsureQuestion.textContent="Sometimes it is hard to name a feeling. Try an activity just to notice more about yourself. You do not have to choose a zone. Take your time — activities can take 1–3 minutes. If you finish before others, choose another activity or repeat one you liked. There is no need to rush.";unsureResult.hidden=true;unsureOptions.replaceChildren();["My body feels tired","My body feels full of energy","My body feels tense","My body feels comfortable","My thoughts feel busy","I am not sure what I notice"].forEach(v=>unsureButton(v,()=>showUnsureActivities(v)));}
function showUnsureActivities(note){unsureProgress.textContent="Choose an activity";unsureTitle.textContent="Thank you for noticing";unsureQuestion.textContent="You noticed: "+note+". Choose one activity that feels okay.";unsureResult.hidden=true;unsureOptions.replaceChildren();unsureActivities.forEach((a,i)=>unsureButton(a[0],()=>runUnsureActivity(i)));}
function runUnsureActivity(i){const a=unsureActivities[i];unsureProgress.textContent="Your activity";unsureTitle.textContent=a[1];unsureQuestion.textContent=a[2];unsureResult.hidden=false;unsureResult.textContent="When you are ready, check in. You do not need to feel different.";unsureOptions.replaceChildren();unsureButton("I have finished — check in",showUnsureCheckIn);}
function showUnsureCheckIn(){unsureProgress.textContent="Check in with yourself";unsureTitle.textContent="What do you notice now?";unsureQuestion.textContent="Do you have a better idea of how you feel?";unsureResult.hidden=true;unsureOptions.replaceChildren();[["Yes, I have an idea","know"],["A little, but I am still unsure","little"],["I am still not sure","unsure"]].forEach(([label,v])=>unsureButton(label,()=>showUnsureNext(v)));}
function showUnsureNext(v){unsureOptions.replaceChildren();unsureResult.hidden=false;if(v==="know"){unsureTitle.textContent="You noticed something about yourself";unsureQuestion.textContent="If you want, go back and choose the zone or feeling that feels closest. You can also continue with your day.";unsureResult.textContent="You do not have to choose a zone.";unsureButton("Choose a zone",()=>{unsureSupport.hidden=true;document.querySelector(".zones-grid").hidden=false;});}else{unsureTitle.textContent="It is okay to still be unsure";unsureQuestion.textContent="Would you like to try a different activity, or take a break?";unsureResult.textContent="Learning about yourself takes time.";unsureButton("Try another activity",()=>showUnsureActivities("I am still exploring"));unsureButton("Take a break",()=>{unsureTitle.textContent="Take your time";unsureQuestion.textContent="You can pause here, return to class, or talk to someone you trust.";unsureOptions.replaceChildren();});}}

const blueSupportFlows = {
 "Sad": {
  question:"What might help you right now?",
  choices:[["comfort","💙 Feel comforted"],["express","🎨 Show how I feel"],["distract","🌿 Take a gentle break"],["connect","🤝 Connect with someone"],["unsure","❔ I'm not sure"]],
  activities:{
   comfort:["Find a comfort","Think of a person, place or object that helps you feel safe and cared for. Close your eyes if you like, and picture it in your mind for about 30 seconds. You can draw it instead.","You do not have to explain why you feel sad."],
   express:["Draw your feeling","Draw your feeling using colours, shapes or a picture. There is no right or wrong way.","Keep your drawing or share it with someone you trust."],
   distract:["Notice the world around you","Take about 1 minute to notice 3 things you can see, 2 things you can hear and 1 thing you can feel. Go slowly.","Repeat slowly if it feels helpful."],
   connect:["Reach out","Choose someone you trust and say: “I'm feeling sad. Can you spend a little time with me?”","You do not need to tell the whole story."],
   unsure:["Choose one small thing","Take 3 slow, comfortable breaths (about 20–30 seconds). Do not force or hold your breath. Or have a sip of water or sit quietly for 1 minute.","You can come back and choose another idea."]
  }
 },
 "Tired":{
  question:"What kind of tired do you feel?",
  choices:[["rest","😌 I need a quiet rest"],["move","🙆 I want to wake up gently"],["water","💧 I might need water"],["unsure","❔ I'm not sure"]],
  activities:{
   rest:["Take a quiet pause","Sit comfortably, relax your shoulders and take a quiet pause for 1 minute. You can simply sit and rest; you do not need to do anything.","If you are still very tired, tell a trusted adult."],
   move:["Wake up gently","If you feel well enough, stand up, stretch your arms slowly and roll your shoulders. Stop if uncomfortable.","A little gentle movement may help you feel more awake."],
   water:["Have a drink","If you can, have a drink of water and take a few comfortable sips.","Notice whether you feel any different afterwards."],
   unsure:["Check what your body needs","Would a quiet rest, a drink of water or a gentle stretch feel best? Choose one, or ask an adult.","If you feel unwell or unusually exhausted, tell a trusted adult."]
  }
 },
 "Sick":{
  question:"What would help you feel looked after?",
  choices:[["adult","🙋 Tell a trusted adult"],["rest","🛋️ Find a quiet place to rest"],["unsure","❔ I'm not sure"]],
  activities:{
   adult:["Let someone know","Please tell your teacher or another trusted adult: “I don't feel well. Can you help me?”","An adult can help you decide what to do next."],
   rest:["Take a quiet rest","Sit somewhere comfortable and rest while you let a trusted adult know how you are feeling.","This app cannot check how your body is doing. Please tell an adult."],
   unsure:["Ask for help","You do not have to work this out alone. Find your teacher or another trusted adult and say you do not feel well.","If you feel very unwell, tell an adult straight away."]
  }
 },
 "Bored":{
  question:"What would you like to do?",
  choices:[["create","🎨 Make something"],["notice","🔎 Find something interesting"],["move","🙆 Move a little"],["unsure","❔ Give me an idea"]],
  activities:{
   create:["Make a tiny creation","Choose a colour and make a quick pattern, doodle or imaginary creature on paper. Give it a name.","It does not need to be perfect. Just experiment."],
   notice:["Become a curious explorer","Find one object you have never really noticed. What shapes, colours or tiny details can you spot?","Can you find one more interesting detail?"],
   move:["Try a movement break","If it is a suitable place and you feel well, stand up, stretch gently and take a short walk.","Come back when you are ready."],
   unsure:["Try a one-minute challenge","Name 5 animals, spot 4 things of the same colour, or invent a new use for an everyday object.","Pick whichever sounds fun."]
  }
 },
 "Disappointed":{
  question:"What would help you right now?",
  choices:[["pause","🌬️ Have a quiet moment"],["express","🎨 Show how I feel"],["next","🧩 Think of one next step"],["connect","🤝 Talk to someone"],["unsure","❔ I'm not sure"]],
  activities:{
   pause:["Give yourself a moment","It can be hard when something does not go the way you hoped. Sit comfortably and take 5 slow, comfortable breaths (about 30–45 seconds). Do not force or hold your breath.","You do not have to feel better straight away."],
   express:["Show your feeling","Draw the moment using colours, shapes or a few simple pictures. You do not need to write words.","You can keep it private or share it with someone you trust."],
   next:["Find one small next step","Ask yourself: “What is one small thing I can do next?” It might be trying again, asking for help or taking a break.","One small step is enough."],
   connect:["Share what happened","If you want to, tell someone you trust: “I'm disappointed because things didn't go as I hoped. Can you listen?”","You can choose how much you want to share."],
   unsure:["Start with a small pause","Take a quiet pause for 1 minute, have a sip of water or choose a quiet activity. You can ask a trusted adult to help you choose.","It is okay if you still feel disappointed."]
  }
 }
};
let currentBlueFeeling="";
function resetBlueSupport(){currentBlueFeeling="";blueSupportOptions.innerHTML="";blueSupportResult.hidden=true;blueSupportResult.textContent="";blueSupportProgress.textContent="";}
function addBlueButton(label,action){const b=document.createElement("button");b.type="button";b.className="blue-support-option";b.textContent=label;b.addEventListener("click",action);blueSupportOptions.appendChild(b);}
function showBlueSupport(feeling){
 const flow=blueSupportFlows[feeling];if(!flow)return;currentBlueFeeling=feeling;zoneFeelings.hidden=true;blueSupport.hidden=false;blueSupportResult.hidden=true;
 blueSupportProgress.textContent="A small step, at your own pace";blueSupportTitle.textContent=feeling+" — let's find something that might help";blueSupportQuestion.textContent=flow.question;blueSupportOptions.innerHTML="";
 flow.choices.forEach(choice=>addBlueButton(choice[1],()=>showBlueActivity(choice[0])));
}
function showBlueActivity(key){
 const item=blueSupportFlows[currentBlueFeeling].activities[key];if(!item)return;blueSupportProgress.textContent="An idea to try";blueSupportTitle.textContent=item[0];blueSupportQuestion.textContent=item[1];blueSupportResult.textContent=item[2];blueSupportResult.hidden=false;blueSupportOptions.innerHTML="";
 if(currentBlueFeeling==="Sad" && key==="express"){addDrawingPad();}
 addBlueButton("I've tried it — how do I feel?",showBlueCheckIn);
}

function addDrawingPad(){
 const wrap=document.createElement("div");wrap.className="feeling-drawing";
 const tools=document.createElement("div");tools.className="drawing-tools";
 const canvas=document.createElement("canvas");canvas.className="feeling-drawing-canvas";canvas.width=600;canvas.height=300;canvas.setAttribute("role","img");canvas.setAttribute("aria-label","A blank drawing area. Use your mouse, finger or stylus to draw.");
 const ctx=canvas.getContext("2d");ctx.fillStyle="#ffffff";ctx.fillRect(0,0,canvas.width,canvas.height);
 let colour="#315E8A",drawing=false,erase=false;
 const palette=[["#315E8A","Blue"],["#E58A9B","Pink"],["#E5B84B","Yellow"],["#5B9B72","Green"],["#8B72B8","Purple"],["#26364A","Dark"]];
 palette.forEach(([value,label])=>{const b=document.createElement("button");b.type="button";b.className="drawing-colour";b.style.backgroundColor=value;b.setAttribute("aria-label",label+" pencil");b.title=label;b.addEventListener("click",()=>{colour=value;erase=false;tools.querySelectorAll("button").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");});tools.appendChild(b);});
 const eraser=document.createElement("button");eraser.type="button";eraser.className="drawing-tool-button";eraser.textContent="Eraser";eraser.addEventListener("click",()=>{erase=true;tools.querySelectorAll("button").forEach(x=>x.classList.remove("selected"));eraser.classList.add("selected");});tools.appendChild(eraser);
 const clear=document.createElement("button");clear.type="button";clear.className="drawing-tool-button";clear.textContent="Clear";clear.addEventListener("click",()=>{ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle="#fff";ctx.fillRect(0,0,canvas.width,canvas.height);});tools.appendChild(clear);
 const hint=document.createElement("p");hint.className="drawing-hint";hint.textContent="Draw with your mouse, finger or stylus. Your picture stays on this screen and is not saved.";
 wrap.appendChild(tools);wrap.appendChild(canvas);wrap.appendChild(hint);blueSupportResult.appendChild(wrap);
 function point(e){const rect=canvas.getBoundingClientRect();return{x:(e.clientX-rect.left)*canvas.width/rect.width,y:(e.clientY-rect.top)*canvas.height/rect.height};}
 canvas.addEventListener("pointerdown",e=>{drawing=true;canvas.setPointerCapture(e.pointerId);const p=point(e);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineCap="round";ctx.lineJoin="round";ctx.lineWidth=erase?24:5;ctx.strokeStyle=erase?"#ffffff":colour;ctx.lineTo(p.x+0.1,p.y+0.1);ctx.stroke();});
 canvas.addEventListener("pointermove",e=>{if(!drawing)return;const p=point(e);ctx.lineWidth=erase?24:5;ctx.strokeStyle=erase?"#ffffff":colour;ctx.lineTo(p.x,p.y);ctx.stroke();});
 function stop(){drawing=false;ctx.beginPath();}
 canvas.addEventListener("pointerup",stop);canvas.addEventListener("pointercancel",stop);canvas.addEventListener("lostpointercapture",stop);
}
function showBlueCheckIn(){
 blueSupportProgress.textContent="Check in with yourself";blueSupportTitle.textContent="How are you feeling now?";blueSupportQuestion.textContent="There is no right or wrong answer. You do not have to feel better straight away.";blueSupportResult.hidden=true;blueSupportOptions.innerHTML="";
 [["better","🙂 A little better"],["same","😐 About the same"],["still","💙 I still feel this way"]].forEach(choice=>addBlueButton(choice[1],()=>showBlueNextStep(choice[0])));
}
function showBlueNextStep(answer){
 blueSupportOptions.innerHTML="";blueSupportResult.hidden=false;
 if(answer==="better"){blueSupportTitle.textContent="I'm glad you found something helpful 💙";blueSupportQuestion.textContent="You can go back to your day, or try another idea.";blueSupportResult.textContent="You can use a tool whenever you need it.";}
 else if(answer==="same"){blueSupportTitle.textContent="That's okay. Take your time.";blueSupportQuestion.textContent="Sometimes feelings need time. Would you like to try a different idea?";blueSupportResult.textContent="You can also talk to someone you trust.";}
 else{blueSupportTitle.textContent="You don't have to manage this alone.";blueSupportQuestion.textContent="Would you like to try another idea, or talk to a trusted adult?";blueSupportResult.textContent="You can say: “I'm still feeling this way. Can you help me?”";}
 addBlueButton("↻ Try a different idea",()=>showBlueSupport(currentBlueFeeling));
 addBlueButton("🤝 Talk to a trusted adult",()=>{blueSupportTitle.textContent="Find a trusted adult";blueSupportQuestion.textContent="Please speak to your teacher or another adult you trust. You can show them this screen.";blueSupportResult.textContent="If you feel unsafe or are hurt, tell a trusted adult immediately.";blueSupportOptions.innerHTML="";});
}


const greenSupportProgress = document.getElementById("green-support-progress");
const greenSupportTitle = document.getElementById("green-support-title");
const greenSupportQuestion = document.getElementById("green-support-question");
const greenSupportOptions = document.getElementById("green-support-options");
const greenSupportResult = document.getElementById("green-support-result");
const greenFeelings = {
 "Calm":"Enjoy this peaceful moment", "Happy":"Share or celebrate your happiness",
 "Focused":"Notice what helps you concentrate", "Content":"Appreciate this moment", "Proud":"Celebrate something you have done"
};
function greenButton(label, handler) {
 const b=document.createElement("button"); b.type="button"; b.className="blue-support-option"; b.textContent=label;
 b.addEventListener("click",handler); greenSupportOptions.appendChild(b);
}
function greenField(placeholder, multiline) {
 const field=document.createElement(multiline?"textarea":"input");
 field.className="green-writing-field"; field.placeholder=placeholder; field.maxLength=180;
 if(multiline) field.rows=2;
 return field;
}
function greenResult(title, lines, note) {
 greenSupportResult.replaceChildren();
 const heading=document.createElement("h4"); heading.textContent=title; greenSupportResult.appendChild(heading);
 lines.forEach(line=>{const p=document.createElement("p");p.textContent="✨ "+line;greenSupportResult.appendChild(p);});
 if(note){const small=document.createElement("p");small.textContent=note;greenSupportResult.appendChild(small);}
 greenSupportResult.hidden=false;
}
function showGreenSupport(feeling) {
 greenSupport.hidden=false; zoneFeelings.hidden=true; greenSupportOptions.replaceChildren(); greenSupportResult.hidden=true;
 greenSupportTitle.textContent=feeling+" — enjoy this moment";
 greenSupportQuestion.textContent=greenFeelings[feeling] || "Choose something positive to do.";
 greenSupportProgress.textContent="Choose an activity";
 ["🎨 Draw how I feel","✨ Three good things","🌟 My little achievement","💚 Spread some kindness","☁️ Imagine something wonderful","🎵 Celebrate your energy"].forEach((label,index)=>greenButton(label,()=>runGreenActivity(index)));
}
function runGreenActivity(index) {
 greenSupportOptions.replaceChildren(); greenSupportResult.hidden=true;
 const configs=[
  ["Draw how I feel","Use the drawing pad to show how you feel right now. Use colours, shapes or pictures. There is no right or wrong way."],
  ["Three good things","Write down three things that made you smile today. They can be little things!"],
  ["My little achievement","Write one thing you did well, learned, tried or did for someone. Every little achievement counts."],
  ["Spread some kindness","Choose one kind thing you can do or say to someone today."],
  ["Imagine something wonderful","Imagine a happy place for about 30–60 seconds. Then write or draw one thing you imagined."],
  ["Celebrate your energy","Choose a movement challenge and try it for about 1 minute. Stop if it feels uncomfortable."]
 ];
 const [title,instruction]=configs[index]; greenSupportTitle.textContent=title;greenSupportQuestion.textContent=instruction;greenSupportProgress.textContent="Your activity";
 if(index===0){addGreenDrawingPad();greenButton("I'm done drawing",()=>{greenResult("Your picture is your expression",["You can keep it on this screen or share it with someone you trust."],"Your picture is not saved.");greenSupportOptions.replaceChildren();greenButton("Choose another activity",()=>showGreenSupport(currentGreenFeeling));});return;}
 if(index===1){
  const fields=[greenField("1. Something that made me smile...",false),greenField("2. Another good thing...",false),greenField("3. One more thing...",false)];
  fields.forEach(f=>greenSupportOptions.appendChild(f));
  greenButton("Show my three good things",()=>{const values=fields.map(f=>f.value.trim());if(values.some(v=>!v)){greenSupportQuestion.textContent="Please fill in all three little moments first.";return;}greenResult("My happy moments ✨",values,"It's lovely to notice the good things in our day.");greenSupportOptions.replaceChildren();greenButton("Choose another activity",()=>showGreenSupport(currentGreenFeeling));});
  return;
 }
 if(index===2){
  const field=greenField("I am proud that I...",true);greenSupportOptions.appendChild(field);
  greenButton("Celebrate my achievement",()=>{if(!field.value.trim()){greenSupportQuestion.textContent="Write one little achievement first.";return;}greenResult("Well done! 🌟",[field.value.trim()],"Every little achievement counts.");greenSupportOptions.replaceChildren();greenButton("Choose another activity",()=>showGreenSupport(currentGreenFeeling));});
  return;
 }
 if(index===3){
  const choices=["Give someone a compliment","Ask someone if they need help","Invite someone to play with me","Say something kind to someone","Ask someone who looks sad if they would like company"];
  choices.forEach(value=>greenButton(value,()=>{greenSupportOptions.replaceChildren();greenResult("Your kindness mission 💚",[value],"Now go and do it! You can offer kindness, but you are not responsible for changing how someone else feels.");greenButton("Choose another activity",()=>showGreenSupport(currentGreenFeeling));}));
  return;
 }
 if(index===4){
  const field=greenField("One thing I imagined was...",false);
  greenSupportOptions.appendChild(field);
  greenButton("Show my idea",()=>{if(!field.value.trim()){greenSupportQuestion.textContent="Write or draw one detail from your happy place.";return;}greenResult("A little moment of imagination ☁️",[field.value.trim()],"You can share your idea or keep it just for yourself.");greenSupportOptions.replaceChildren();greenButton("Choose another activity",()=>showGreenSupport(currentGreenFeeling));});
  return;
 }
 ["Stretch your arms gently","Do 5 shoulder rolls","Stand and reach up high","Make up a happy dance"].forEach(value=>greenButton(value,()=>{greenSupportOptions.replaceChildren();greenResult("Your movement challenge 🎵",[value+" for about 1 minute."],"Move safely in your space and stop if anything feels uncomfortable.");greenButton("Choose another activity",()=>showGreenSupport(currentGreenFeeling));}));
}
let currentGreenFeeling="";
const originalShowGreenSupport=showGreenSupport;
showGreenSupport=function(feeling){currentGreenFeeling=feeling;originalShowGreenSupport(feeling);};
function addGreenDrawingPad(){
 const wrap=document.createElement("div");wrap.className="feeling-drawing";
 const tools=document.createElement("div");tools.className="drawing-tools";
 const canvas=document.createElement("canvas");canvas.className="feeling-drawing-canvas";canvas.width=600;canvas.height=300;canvas.setAttribute("aria-label","Drawing area");
 const ctx=canvas.getContext("2d");ctx.fillStyle="#fff";ctx.fillRect(0,0,600,300);
 let colour="#315E8A",drawing=false;
 [["#315E8A","Blue"],["#E58A9B","Pink"],["#E5B84B","Yellow"],["#5B9B72","Green"],["#8B72B8","Purple"],["#26364A","Dark"]].forEach(([c,n])=>{const b=document.createElement("button");b.type="button";b.className="drawing-colour";b.style.backgroundColor=c;b.title=n;b.addEventListener("click",()=>colour=c);tools.appendChild(b);});
 const clear=document.createElement("button");clear.type="button";clear.className="drawing-tool-button";clear.textContent="Clear";clear.addEventListener("click",()=>{ctx.clearRect(0,0,600,300);ctx.fillStyle="#fff";ctx.fillRect(0,0,600,300);});tools.appendChild(clear);
 function pos(e){const r=canvas.getBoundingClientRect();return{x:(e.clientX-r.left)*600/r.width,y:(e.clientY-r.top)*300/r.height};}
 canvas.addEventListener("pointerdown",e=>{drawing=true;canvas.setPointerCapture(e.pointerId);const p=pos(e);ctx.beginPath();ctx.moveTo(p.x,p.y);});
 canvas.addEventListener("pointermove",e=>{if(!drawing)return;const p=pos(e);ctx.lineWidth=5;ctx.lineCap="round";ctx.strokeStyle=colour;ctx.lineTo(p.x,p.y);ctx.stroke();});
 ["pointerup","pointercancel","lostpointercapture"].forEach(name=>canvas.addEventListener(name,()=>drawing=false));
 const hint=document.createElement("p");hint.className="drawing-hint";hint.textContent="Use your mouse, finger or stylus. Your picture stays on this screen and is not saved.";
 wrap.append(tools,canvas,hint);greenSupportResult.appendChild(wrap);greenSupportResult.hidden=false;
}


// Human connection is available in every zone, not only when an activity has not helped.
function showHumanConnection(title,question,result,options){
 title.textContent="You can talk to someone";
 question.textContent="Find your teacher or another trusted adult. You can tell them how you feel, ask them to listen, or simply ask them to stay with you.";
 result.textContent="You could say: “I would like some help. Can you talk with me?” You can also show them this screen.";
 result.hidden=false; options.replaceChildren();
}
document.getElementById("blue-human-connection").addEventListener("click",()=>showHumanConnection(blueSupportTitle,blueSupportQuestion,blueSupportResult,blueSupportOptions));
document.getElementById("green-human-connection").addEventListener("click",()=>showHumanConnection(greenSupportTitle,greenSupportQuestion,greenSupportResult,greenSupportOptions));
document.getElementById("yellow-human-connection").addEventListener("click",()=>showHumanConnection(yellowSupportTitle,yellowSupportQuestion,yellowSupportResult,yellowSupportOptions));
document.getElementById("red-human-connection").addEventListener("click",showRedHumanConnection);
function showRedSupport(){
 zoneFeelings.hidden=true;redSupport.hidden=false;redSupportProgress.textContent="Pause, notice, and choose";redSupportTitle.textContent="Your feelings are very strong right now";
 redSupportQuestion.textContent="You do not have to push your feelings away. Let's try one safe way to help your body settle a little. You can stop at any time.";
 redSupportResult.hidden=true;redSupportOptions.replaceChildren();
 redActivities.forEach((activity,index)=>redButton(activity.label,()=>runRedActivity(index)));
}
const redSupportProgress=document.getElementById("red-support-progress");
const redSupportTitle=document.getElementById("red-support-title");
const redSupportQuestion=document.getElementById("red-support-question");
const redSupportOptions=document.getElementById("red-support-options");
const redSupportResult=document.getElementById("red-support-result");
const redActivities=[
 {label:"🌬️ Slow breathing",title:"Slow breathing",instruction:"Sit somewhere comfortable. Breathe in gently, then breathe out slowly. Repeat at your own pace for about 30 seconds. Do not hold or force your breath.",note:"If breathing exercises do not feel comfortable, stop and choose another activity."},
 {label:"🤲 Squeeze and release",title:"Squeeze and release",instruction:"Gently squeeze your hands into fists for 3 seconds, then relax them. Repeat five times. You can squeeze a soft cushion or stress ball instead.",note:"Notice the difference between your hands feeling tense and relaxed. Keep the squeeze gentle."},
 {label:"🧱 Push the wall",title:"Push the wall",instruction:"Stand facing a wall and place both hands on it. Gently push for 5 seconds, then relax. Repeat three times. You can skip this activity or stop if uncomfortable.",note:"Only do this if there is a safe space and it feels okay for your body."},
 {label:"🌿 Find a quiet moment",title:"Find a quiet moment",instruction:"For about 1 minute, look around quietly and find five things you can see. Notice their colours, shapes or details. Or look at a peaceful picture and rest quietly.",note:"You do not have to think about what made you upset right now."}
];
function redButton(label,handler){const b=document.createElement("button");b.type="button";b.className="blue-support-option";b.textContent=label;b.addEventListener("click",handler);redSupportOptions.appendChild(b);}
function runRedActivity(index){
 const a=redActivities[index];redSupportProgress.textContent="A small step to help you settle";redSupportTitle.textContent=a.title;redSupportQuestion.textContent=a.instruction;redSupportResult.textContent=a.note;redSupportResult.hidden=false;redSupportOptions.replaceChildren();
 redButton("I've finished — check in",showRedCheckIn);
}
function showRedCheckIn(){
 redSupportProgress.textContent="Check in with yourself";redSupportTitle.textContent="How are you feeling now?";
 redSupportQuestion.textContent="You do not need to feel completely calm. Has the intensity changed a little?";
 redSupportResult.hidden=true;redSupportOptions.replaceChildren();
 [["🙂 A little calmer","calmer"],["😐 Still feeling very strong","same"],["😟 I need help now","help"]].forEach(([label,value])=>redButton(label,()=>showRedNextStep(value)));
}
function showRedNextStep(answer){
 redSupportOptions.replaceChildren();redSupportResult.hidden=false;
 if(answer==="calmer"){
  redSupportTitle.textContent="Thank you for checking in ❤️";
  redSupportQuestion.textContent="The feeling is allowed to be there. Would you like to try another activity, or talk to someone about what happened?";
  redSupportResult.textContent="You do not have to make the feeling disappear. Notice what you need next.";
  redButton("Try another activity",showRedSupport);
  redButton("Talk to a trusted adult",showRedHumanConnection);
 }else if(answer==="same"){
  redSupportTitle.textContent="You don't have to do this alone";
  redSupportQuestion.textContent="You can try one different activity, or ask a trusted adult to stay with you and help.";
  redSupportResult.textContent="It is okay if the feeling is still strong. You deserve support.";
  redButton("Try one more activity",showRedSupport);
  redButton("Talk to a trusted adult",showRedHumanConnection);
 }else{
  redSupportTitle.textContent="Let's find someone to help";
  redSupportQuestion.textContent="Please go to your teacher or another trusted adult now. You do not need to finish another activity first.";
  redSupportResult.textContent="You can say: “My feelings are still very strong. Can you stay with me and help me?” You can show them this screen.";
  redButton("Show me what I can say",showRedHumanConnection);
 }
}
function showRedHumanConnection(){
 redSupportProgress.textContent="Human connection";
 redSupportTitle.textContent="You don't have to manage big feelings alone";
 redSupportQuestion.textContent="Find your teacher or another trusted adult. Ask them to listen, stay with you, or help you decide what to do next.";
 redSupportResult.textContent="You could say: “I'm still feeling really angry/upset/scared. Can you help me?”";
 redSupportOptions.replaceChildren();
}

const yellowActivities=[
 ["🌬️ Breathing break","Follow this gentle pattern for about 30–45 seconds: breathe in comfortably, then breathe out slowly. Repeat at your own pace. Do not hold or force your breath.","Breathing is optional. If it does not feel comfortable, choose another activity."],
 ["🙆 Gentle movement","For about 1 minute: reach both arms up, lower them; roll your shoulders gently; stretch each arm across your body. Move slowly and stop if uncomfortable.","Choose only movements that feel safe for your body and space."],
 ["🔢 Count and reset","Tap each number from 10 down to 1, slowly. Take about 30–45 seconds. Let your shoulders soften as you count.","You can start again or choose another tool."],
 ["🧠 Brain Gym challenge","For about 1 minute, touch your right hand to your left knee, then your left hand to your right knee. Alternate slowly. You can do this seated too.","Go at your own pace. Stop if it feels uncomfortable."],
 ["💬 My Inner Coach","Choose a helpful coach thought, then finish the sentence below. Take about 1 minute.","A helpful thought does not have to make the feeling disappear. It can help you choose your next step."],
 ["🌿 Take a mental break","Pause for 1–2 minutes. Look quietly around you and find 5 things you can see. Notice their colours, shapes or details. Or sit quietly and rest your eyes.","If you would rather talk, you can choose the trusted adult button."]
];
function yellowButton(label,fn){const b=document.createElement("button");b.type="button";b.className="blue-support-option";b.textContent=label;b.addEventListener("click",fn);yellowSupportOptions.appendChild(b);}
function showYellowSupport(feeling){
 zoneFeelings.hidden=true;yellowSupport.hidden=false;yellowSupportOptions.replaceChildren();yellowSupportResult.hidden=true;
 yellowSupportProgress.textContent="Choose a tool to slow down and refocus";
 yellowSupportTitle.textContent=feeling+" — let's try a small reset";
 yellowSupportQuestion.textContent="Choose one activity. You can stop at any time or ask a trusted adult for help.";
 yellowActivities.forEach((a,i)=>yellowButton(a[0],()=>runYellowActivity(i)));
}
function runYellowActivity(index){
 const a=yellowActivities[index];yellowSupportOptions.replaceChildren();yellowSupportProgress.textContent="Your activity";yellowSupportTitle.textContent=a[0];yellowSupportQuestion.textContent=a[1];yellowSupportResult.textContent=a[2];yellowSupportResult.hidden=false;
 if(index===2){
  let n=10;yellowSupportQuestion.textContent="Tap the numbers in order, slowly. Take about 30–45 seconds.";
  const next=()=>{yellowSupportOptions.replaceChildren();if(n>0){yellowButton(String(n),()=>{n--;next();});}else{yellowSupportQuestion.textContent="You counted all the way down. Take one comfortable breath.";yellowButton("I've finished",showYellowCheckIn);}};
  next();return;
 }
 if(index===4){
  yellowSupportQuestion.textContent="Sometimes our first thought is unhelpful. Choose a kind, useful thought:";
  ["I can take one small step.","I can ask someone to help me.","I can try again when I'm ready.","This feeling will change."].forEach(v=>yellowButton(v,()=>{yellowSupportOptions.replaceChildren();const field=document.createElement("input");field.className="green-writing-field";field.placeholder="My next step could be...";yellowSupportOptions.appendChild(field);yellowButton("Save my next step",()=>{yellowSupportQuestion.textContent="My Inner Coach says: “"+v+"”";yellowSupportResult.textContent=field.value.trim()?"My next step: "+field.value.trim():"You can choose one small next step when you are ready.";yellowButton("I've finished",showYellowCheckIn);});}));
  return;
 }
 yellowButton("I've finished — check in",showYellowCheckIn);
}
function showYellowCheckIn(){
 yellowSupportProgress.textContent="Check in with yourself";yellowSupportTitle.textContent="How are you feeling now?";yellowSupportQuestion.textContent="There is no right or wrong answer. You do not have to feel calm straight away.";yellowSupportResult.hidden=true;yellowSupportOptions.replaceChildren();
 [["🙂 A little more settled","A little more settled"],["😐 About the same","About the same"],["😟 More overwhelmed","More overwhelmed"]].forEach(([label,value])=>yellowButton(label,()=>{
  yellowSupportOptions.replaceChildren();yellowSupportTitle.textContent=value==="A little more settled"?"I'm glad you checked in 💛":"Thank you for checking in.";
  yellowSupportQuestion.textContent=value==="More overwhelmed"?"Please find a trusted adult now. You do not have to manage this alone.":value==="About the same"?"Would you like to try a different tool or talk with someone?":"You can return to your day or choose another tool.";
  yellowButton("↻ Try another activity",()=>showYellowSupport("Yellow Zone"));
 }));
}

function showYearGroup(yearGroupId) {
    yearSections.forEach(function(section) {
        section.hidden = section.id !== yearGroupId;
    });

    yearGroupButtons.forEach(function(button) {
        button.classList.toggle("selected", button.dataset.yearGroup === yearGroupId);
    });

    renderActivities(yearGroupId);
}

yearGroupButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        showYearGroup(button.dataset.yearGroup);
    });
});

function createActivityCard(activity) {
    const card = document.createElement("a");
    card.className = "activity-card";
    card.href = activity.link;
    card.target = "_blank";
    card.rel = "noopener noreferrer";

    card.innerHTML = `
        <span class="activity-card-icon">${activity.icon}</span>
        <span class="activity-card-title">${activity.title}</span>
    `;

    return card;
}

function renderActivities(yearGroupId) {
    const section = document.getElementById(yearGroupId);

    if (!section) {
        return;
    }

    const categories = section.querySelectorAll(".activity-category");

    categories.forEach(function(categorySection) {
        const heading = categorySection.querySelector("h4");
        const list = categorySection.querySelector(".activity-grid");
        const placeholder = categorySection.querySelector(".year-placeholder");

        if (!heading || !list) {
            return;
        }

        const categoryName = heading.textContent.replace(/^\S+\s*/, "").trim();
        list.innerHTML = "";

        const matchingActivities = activities.filter(function(activity) {
            return activity.category === categoryName && activity.yearGroups.includes(yearGroupId);
        });

        if (categoryName === "Coding" && (yearGroupId === "years1-2" || yearGroupId === "years3-4")) {
            [1, 2, 3].forEach(function(level) {
                const levelActivities = matchingActivities.filter(function(activity) {
                    return activity.level === level;
                });

                if (levelActivities.length === 0) {
                    return;
                }

                const levelSection = document.createElement("div");
                levelSection.className = "coding-level level-" + level;

                const levelTitle = document.createElement("h5");
                levelTitle.textContent = "Level " + level;
                levelSection.appendChild(levelTitle);

                const levelGrid = document.createElement("div");
                levelGrid.className = "activity-grid";

                levelActivities.forEach(function(activity) {
                    levelGrid.appendChild(createActivityCard(activity));
                });

                levelSection.appendChild(levelGrid);
                list.appendChild(levelSection);
            });
        } else {
            matchingActivities.forEach(function(activity) {
                list.appendChild(createActivityCard(activity));
            });
        }

        if (placeholder) {
            placeholder.hidden = matchingActivities.length !== 0;
        }
    });
}

const activitiesButton = document.getElementById("activities-button");
const activitiesMenu = document.getElementById("activities-menu");
const closeActivitiesButton = document.getElementById("close-activities-button");

function openActivities() {
    activitiesMenu.hidden = false;
    activitiesButton.setAttribute("aria-expanded", "true");
}

function closeActivities() {
    activitiesMenu.hidden = true;
    activitiesButton.setAttribute("aria-expanded", "false");
}

activitiesButton.addEventListener("click", function() {
    if (activitiesMenu.hidden) {
        openActivities();
    } else {
        closeActivities();
    }
});

closeActivitiesButton.addEventListener("click", closeActivities);

const ticTacToeButton = document.getElementById("tic-tac-toe-button");
const chessButton = document.getElementById("chess-button");
const gameModal = document.getElementById("game-modal");
const gameContainer = document.getElementById("game-container");
const closeGameButton = document.getElementById("close-game-button");

let ticTacToeLoaded = false;
let chessLoaded = false;

function loadTicTacToe() {
    if (ticTacToeLoaded) {
        window.initTicTacToe(gameContainer);
        return;
    }

    const gameStyle = document.createElement("link");
    gameStyle.rel = "stylesheet";
    gameStyle.href = "games/tic-tac-toe/style.css";
    document.head.appendChild(gameStyle);

    const gameScript = document.createElement("script");
    gameScript.src = "games/tic-tac-toe/script.js";
    gameScript.onload = function() {
        ticTacToeLoaded = true;
        window.initTicTacToe(gameContainer);
    };

    gameContainer.innerHTML = "<p>Loading game...</p>";
    document.body.appendChild(gameScript);
}

function loadChess() {
    if (chessLoaded) {
        window.initChess(gameContainer);
        return;
    }

    const gameStyle = document.createElement("link");
    gameStyle.rel = "stylesheet";
    gameStyle.href = "games/chess/style.css";
    document.head.appendChild(gameStyle);

    const gameScript = document.createElement("script");
    gameScript.src = "games/chess/script.js";
    gameScript.onload = function() {
        chessLoaded = true;
        window.initChess(gameContainer);
    };

    gameContainer.innerHTML = "<p>Loading chess...</p>";
    document.body.appendChild(gameScript);
}

function openTicTacToe() {
    closeActivities();
    gameModal.hidden = false;
    loadTicTacToe();
}

function openChess() {
    closeActivities();
    gameModal.hidden = false;
    loadChess();
}

function closeGame() {
    gameModal.hidden = true;
}

ticTacToeButton.addEventListener("click", openTicTacToe);
chessButton.addEventListener("click", openChess);
closeGameButton.addEventListener("click", closeGame);

gameModal.addEventListener("click", function(event) {
    if (event.target === gameModal) {
        closeGame();
    }
});

function cleanQuestion(question) {
    return question
        .toLowerCase()
        .replace(/[?!.,:;'\"]/g, "")
        .trim();
}

// Some student questions are intentionally left unanswered, especially
// personal/romantic/gender questions and messages containing profanity.
// This prevents fuzzy matching from accidentally turning them into an
// unrelated answer.
function isIgnoredQuestion(question) {
    const cleaned = cleanQuestion(question);
    const ignoredTerms = [
        "are you gay", "are you lesbian", "are you bisexual", "are you trans",
        "are you transgender", "gay femboy", "femboy", "boyfriend", "girlfriend",
        "robo boyfriend", "robo girlfriend", "do you wanna be my boyfriend",
        "do you want to be my boyfriend", "do you wanna be my girlfriend",
        "do you want to be my girlfriend", "fuck", "fucking", "shit", "bitch",
        "asshole"
    ];

    return ignoredTerms.some(function(term) {
        return cleaned.includes(term);
    });
}

function solveCalculation(question) {
    let expression = question
        .toLowerCase()
        .replace(/what is|calculate|work out|solve|please|can you|could you/g, "")
        .replace(/divided by/g, "/")
        .replace(/divide by/g, "/")
        .replace(/multiplied by/g, "*")
        .replace(/times/g, "*")
        .replace(/plus/g, "+")
        .replace(/minus/g, "-")
        .replace(/x/g, "*")
        .replace(/÷/g, "/")
        .replace(/×/g, "*")
        .replace(/=/g, "")
        .replace(/\s+/g, "")
        .trim();

    if (!/^[0-9+*/().%\-]+$/.test(expression)) {
        return null;
    }

    if (!/[+*/%\-]/.test(expression)) {
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

        return "🧮 " + question.trim() + " = **" + roundedResult + "**";
    } catch (error) {
        return null;
    }
}

// Fuse.js is used as a second layer after the exact keyword matcher.
// This lets GeorgeBot recognise small spelling mistakes and different
// phrasings without changing the carefully programmed answers.
let knowledgeFuse = null;

function getKnowledgeFuse() {
    if (knowledgeFuse !== null) {
        return knowledgeFuse;
    }

    if (typeof Fuse === "undefined" || !Array.isArray(knowledge)) {
        return null;
    }

    knowledgeFuse = new Fuse(knowledge, {
        keys: ["keywords"],
        includeScore: true,
        threshold: 0.45,
        ignoreLocation: true,
        minMatchCharLength: 2
    });

    return knowledgeFuse;
}

function findKnowledgeMatch(question) {
    if (isIgnoredQuestion(question)) {
        return null;
    }

    const cleanedQuestion = cleanQuestion(question);
    let bestMatch = null;
    let bestScore = 0;

    // First keep the original exact keyword behaviour.
    for (const item of knowledge) {
        for (const keyword of item.keywords) {
            const cleanedKeyword = cleanQuestion(keyword);
            if (!cleanedQuestion.includes(cleanedKeyword)) {
                continue;
            }

            let score = cleanedKeyword.length;
            if (cleanedKeyword.includes(" ")) {
                score += 100;
            }
            score += cleanedKeyword.split(" ").length * 20;

            if (score > bestScore) {
                bestScore = score;
                bestMatch = item;
            }
        }
    }

    if (bestMatch !== null) {
        return bestMatch;
    }

    // If no exact keyword matched, try fuzzy matching.
    const fuse = getKnowledgeFuse();

    if (fuse === null) {
        return null;
    }

    const fuzzyResults = fuse.search(cleanedQuestion);

    if (fuzzyResults.length === 0) {
        return null;
    }

    const bestFuzzyResult = fuzzyResults[0];

    // Fuse scores closer to 0 are better. The threshold above keeps
    // unrelated questions from being treated as known questions.
    if (typeof bestFuzzyResult.score === "number" && bestFuzzyResult.score <= 0.45) {
        return bestFuzzyResult.item;
    }

    return null;
}

function findAnswer(question) {
    if (isIgnoredQuestion(question)) {
        return null;
    }

    if (window.isNumberGameRequest && window.isNumberGameRequest(question)) {
        return window.getNumberGameAnswer();
    }

    if (window.isCatQuestion && window.isCatQuestion(question)) {
        return window.getCatAnswer();
    }

    const calculationAnswer = solveCalculation(question);

    if (calculationAnswer !== null) {
        return calculationAnswer;
    }

    const match = findKnowledgeMatch(question);

    if (match !== null) {
        return match.answer;
    }

    return null;
}

// Keep track of consecutive questions GeorgeBot could not answer.
// The first two attempts encourage the student to rephrase or check spelling.
// Only after three unsuccessful attempts do we direct them to the teacher.
let unansweredAttempts = 0;

function getUnknownQuestionAnswer() {
    unansweredAttempts += 1;

    if (unansweredAttempts < 3) {
        return "🤔 I'm not quite sure what you mean. Try rephrasing your question or check the spelling, then ask me again!";
    }

    return "🤔 I still don't know this one. Please ask your teacher!";
}

const QUESTION_LOG_KEY = "georgebot-question-log";
const QUESTION_LOG_ENDPOINT = "https://script.google.com/macros/s/AKfycbzMnabJC4lyR65aO4KE9tvJWbAIICI_XxFtLoDO0PorOJVPPEDHEXmGWLGCFs2VLyjDYg/exec";

function getQuestionLog() {
    try {
        return JSON.parse(localStorage.getItem(QUESTION_LOG_KEY)) || [];
    } catch (error) {
        return [];
    }
}

function saveQuestionToLog(question, answer, topicOverride) {
    const match = findKnowledgeMatch(question);
    const calculationAnswer = solveCalculation(question);
    const entry = {
        date: new Date().toISOString(),
        question: question,
        answered: (topicOverride !== null && topicOverride !== undefined) || match !== null || calculationAnswer !== null,
        topic: topicOverride || (match ? match.topic : (calculationAnswer !== null ? "Calculator" : "Unknown"))
    };

    const log = getQuestionLog();
    log.push(entry);

    try {
        localStorage.setItem(QUESTION_LOG_KEY, JSON.stringify(log));
    } catch (error) {
        console.warn("GeorgeBot could not save the local question log.", error);
    }

    if (QUESTION_LOG_ENDPOINT) {
        fetch(QUESTION_LOG_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(entry),
            keepalive: true
        }).catch(function(error) {
            console.warn("GeorgeBot could not send the question to Google Sheets.", error);
        });
    }
}

// When a student offers to tell a joke, GeorgeBot invites them to share it.
// The next message is treated as their joke and gets an encouraging reaction.
let waitingForStudentJoke = false;

function isJokeInvitation(question) {
    const cleaned = cleanQuestion(question);
    return /\\b(i have a joke|ive got a joke|i've got a joke|can i tell you a joke|may i tell you a joke|let me tell you a joke|i want to tell you a joke|i wanna tell you a joke|i will tell you a joke|here is a joke|heres a joke|here's a joke|wanna hear a joke|want to hear a joke)\\b/.test(cleaned);
}

function getStudentJokeReaction() {
    const reactions = [
        "😂 HAHAHA! Thanks for sharing your joke! You've made my circuits giggle!",
        "🤣 That was a good one! Thanks for making me laugh!",
        "😄 Thanks for telling me a joke! My robot belly is shaking with laughter!",
        "😂 Brilliant! I love hearing jokes. Have you got another one?"
    ];
    return reactions[Math.floor(Math.random() * reactions.length)];
}

function addMessage(sender, text, className) {
    const message = document.createElement("div");
    message.classList.add("message", className);
    const name = document.createElement("strong");
    name.textContent = sender;
    const paragraph = document.createElement("p");

    // Student messages are always inserted as plain text, so typed jokes
    // cannot accidentally be interpreted as HTML.
    if (className === "user-message") {
        paragraph.textContent = text;
    } else {
        paragraph.innerHTML = text;
    }

    message.appendChild(name);
    message.appendChild(paragraph);
    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const question = input.value.trim();

    if (question === "") {
        return;
    }

    addMessage("You", question, "user-message");
    input.value = "";

    setTimeout(function() {
        let answer;
        let topicOverride = null;

        if (waitingForStudentJoke) {
            waitingForStudentJoke = false;
            answer = getStudentJokeReaction();
            topicOverride = "Fun — Student Joke";
            unansweredAttempts = 0;
        } else if (isJokeInvitation(question)) {
            waitingForStudentJoke = true;
            answer = "😃 Absolutely! I'm all ears. Tell me your best joke!";
            topicOverride = "Fun — Student Joke";
            unansweredAttempts = 0;
        } else {
            answer = findAnswer(question);

            if (answer === null) {
                answer = getUnknownQuestionAnswer();
            } else {
                unansweredAttempts = 0;
            }

            if (window.isNumberGameRequest && window.isNumberGameRequest(question)) {
                topicOverride = "Games — Missing Number";
            } else if (window.isCatQuestion && window.isCatQuestion(question)) {
                topicOverride = "Animals — Cats";
            }
        }

        saveQuestionToLog(question, answer, topicOverride);
        addMessage("GeorgeBot", answer, "bot-message");
    }, 600);
});
