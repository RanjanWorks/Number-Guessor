// made by ranjan 2023

let nameshow = document.querySelector("h3");
let name = localStorage.getItem("name");
if (name) {
  let currentTime = new Date().getHours();
  if (currentTime < 12) {
    nameshow.innerText = "Good Morning " + name;
  } else if (currentTime < 17) {
    nameshow.innerText = "Good Afternoon " + name;
  } else {
    nameshow.innerText = "Good Evening " + name;
  }
}
if (name == null || name == "") {
  name = prompt("What is your Name ?");
  if (!name) {
    alert("You did not enter your name please restart website")

  } else {

    localStorage.setItem("name", name);
    nameshow.innerText = "Hi " + name;
  }
}
let min = 1;
let max = 100;
let guess;
let j;
let pass = new Audio("pass.mp3");
let typing = new Audio("typing.mp3");


let msg = [
  `Hello`,
  "I am simple ai program",
  "Think number between 1 to 100 i will try to guess that number",
  "Have you thought about number 50 ?",
  "Hurray i guessed Your number😍",
  "Made with ❤️ by Ranjan",
];
let randomsg = [
  "Opps",
  "Hm",
  "Ohh",
  "Oh sorry...",
  "🤔..",
  "Still Trying to guess",
  "कृपया धीरज रखे आपने जो नंबर सोचा है हम उसे पता लगाने की कोशिस कर रहे है 😂 । ",
  'सोच रहा हूँ... ',
];
let resutAr = [
  "Is That",
  "Are you thinking of ",
  "may be ",
  "👉 is it...",
  "it can be ",
  "क्या वह नंबर है ...",
];
let container = document.querySelector(".container");
let suggestion = document.querySelector(".suggestion");
let text;

function go(e) {
  text = e.innerText;
  setTimeout(() => {
    main(text);
  }, 100);
  e.preventDefault()
}

function appendNode(message, position) {

  let i = 0;
  let div = document.createElement("div");
  container.append(div);
  div.classList.add("message");
  div.classList.add(position);
  function typeWriter() {
    if (i < message.length) {
      typing.play()
      typing.currentTime = 0


      div.innerHTML += message.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
  typeWriter();
  container.scrollTo(0, container.scrollHeight);
}

function correct() {
  appendNode(msg[5], "left");
  suggestion.classList.remove("look");
}

function RunMsg(time) {
  setTimeout(() => {
    appendNode(`Hello ${name}`, "left");
    setTimeout(() => {
      appendNode(msg[1], "left");
      setTimeout(() => {
        appendNode(msg[2], "left");
        setTimeout(() => {
          suggestion.classList.add("look");
          setTimeout(() => {
            appendNode(msg[3], "left");
          }, 3000);
        }, time);
      }, 1000);
    }, time);
  }, time);
}

function main(text) {
  j = Math.floor(Math.random() * randomsg.length);
  let k = Math.floor(Math.random() * resutAr.length);
  guess = Math.floor((max + min) / 2);
  if (text == "Correct") {
    pass.play();
    appendNode(text, "right");

    setTimeout(() => {
      confetti.start();
      appendNode("Yes !", "left");
      suggestion.classList.remove("look");
      setTimeout(() => {
        appendNode(msg[4], "left");
        appendNode(msg[5], "left");
      }, 500);
    }, 500);
    setTimeout(() => {
      confetti.stop();
    }, 1500);
  } else if (text == "Lower") {
    appendNode(text, "right");
    setTimeout(() => {
      appendNode(randomsg[j], "left");
    }, 1000);
    max = guess - 1;
    main();
    setTimeout(() => {
      appendNode(`${resutAr[k]} ${guess} ?`, "left");
    }, 2000);
    // alert(guess)
  } else if (text == "Higher") {
    appendNode(text, "right");
    setTimeout(() => {
      appendNode(randomsg[j], "left");
    }, 1000);
    min = guess + 1;
    main();
    setTimeout(() => {
       appendNode(`${resutAr[k]} ${guess} ?`, "left");
    }, 2000);
  }
}

RunMsg(500);
