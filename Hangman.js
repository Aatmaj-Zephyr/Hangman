//Style constants
var score = 0;
var style =
  "box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);  font-size: 25px;transition-duration: 0.8s;cursor: pointer;border-radius: 8px;";
const SpriteLink = "https://img.pokemondb.net/artwork/large/";
const InfoHyperLink = "https://bulbapedia.bulbagarden.net/wiki/";

// Audio constants
const music = new Audio("./audio/hgss-kanto-trainer.mp3");
const lost = new Audio("./audio/evil-laugh.ogg");
const win = new Audio("./audio/cries-pikachu.mp3");
const incorrect = new Audio("./audio/cries-litwick.mp3");
const correct = new Audio("./audio/cries-chimecho.mp3");

var ArrayOfWords = data; //array of data
//Array containing the words.
var Word, WordLength, WordLetters, TurnsLeft, Letters, id;

//HTML DOM constants

const WelcomeText = document.getElementById("welcome");
const word = document.getElementById("word");
const PlayBtn = document.getElementById("play");
const TurnsLeftCounter = document.getElementById("turns-left-counter");
const PokemonImg = document.getElementById("pokemon-image");


function play() {
  WelcomeText.style = "Display:none";
  PlayBtn.style = "Display:none";

  start();
}

function start() {
  music.play();
  music.loop = "loop";
  music.volume = 0.1;
  body.style =
    "text-align:center;opacity:0.95;transition-duration:1.0s;background-blend-mode: screen;background-image: url('./images/gameplay-wallpaper.jpg');background-color: rgba(255,255,255,0.8);";
  //PascalCase followed.
  id = Math.floor(Math.random() * ArrayOfWords.length);
  Word = ArrayOfWords[id];
  //One random word from the Array.
  WordLength = Word.length;
  //Length of the word.
  WordLetters = [];
  //Array to store the letters of the Word.
  WordLetters.push(Word.charAt(0)); //Push the First letter.
  //In the current version, only the first letter is visible at a hint.
  //Modify it further to include random letters, but be careful of the capital letter.

  for (let i = WordLength - 1; i > 0; i--) {
    WordLetters.push("_");
    //Push blank underscores in the rest of the array according to the length of the word.
  }

  word.classList.add("word-start");
  word.classList.remove("word-won", "word-game-over");
  word.innerHTML = WordLetters.join(" ");
  //Display the word in the HTML file

  TurnsLeft = Math.floor(WordLength * 0.8);
  //Number of turns left. Modify the formula in the later versions.
  TurnsLeftCounter.innerHTML = TurnsLeft;
  TurnsLeftCounter.style.display = "";
  SetTurnsLeftStyle();
  //Display the number of turns left
  Letters = []; //Array to store the Letters
  //Setting the Letters

  for (var k of Word) {
    if (!Letters.includes(k) & (k != Word.charAt(0))) {
      Letters.push(k.toString());
      //Push the letters of word into the "Letters" array without repetition
    }
  }
  while (Letters.length < 16) {
    r = Math.floor(Math.random() * (122 - 97 + 1)) + 97; //Character set from unicode.
    v = String.fromCharCode(r);
    if (!Letters.includes(v)) {
      Letters.push(v);
      //Push random characters into the "Letters" array without repetition.
    }
  }
  Letters.sort(() => 0.5 - Math.random()); //Random shuffling of Letters.
  Letters.push(Letters[0]); //Ignore the card at 0th position.
  for (var f = 1; f <= 16; f++) {
    document.getElementById("button" + f).innerHTML = Letters[f];
    document.getElementById("button" + f).style = style;
    document.getElementById("button" + f).disabled = "";
    document.getElementById("button" + f).display = "";
    //Dispay the letters into the individual buttons.
  }
  PokemonImg.style = "display:none;width:5%";
  PokemonImg.src =
    SpriteLink + Word.toLowerCase() + ".jpg"; //to load image beforehand;
  document.getElementById("hyperlink").href = InfoHyperLink + Word; //Camelcase word and not lowercade
}

function ButtonClicked(a) {
  win.pause();
  win.currentTime = 0;
  lost.pause();
  lost.currentTime = 0;
  correct.pause();
  correct.currentTime = 0;
  incorrect.pause();
  incorrect.currentTime = 0;
  //The trailinng muist Stop

  //Function to be executed once button is clicked.
  //a is the parameter which tells which button is clicked.
  document.getElementById("button" + a).disabled = "disabled";
  //Disable clicking the same button after it has ben clicked.
  checkscore(a);
  //Check if it matches or not.
}

function checkscore(a) {
  if (Word.includes(Letters[a])) {
    //If the letter matches......
    for (let i = Word.length; i >= 0; i--) {
      if (Word.charAt(i) == Letters[a]) {
        WordLetters[i] = Letters[a];
        //Put the letter in the WordLetters array at all positions.
        //This means even repeated letters are put in all the positions.
      }
    }

    document.getElementById("button" + a).style =
      "transition-duration: 0.8s;background-color:lime;font-size: 25px;color:white;cursor: not-allowed;opacity:0.95";
    correct.play();
    //Set the background to green for sucessfull match.
    word.innerHTML = WordLetters.join(" ");
  } else {
    document.getElementById("button" + a).style =
      "transition-duration: 0.8s;background-color:Red;font-size: 25px;animation-name: effect; animation-duration: 0.1s;   animation-iteration-count: 7;color:White;cursor: not-allowed;opacity:0.8;";
    incorrect.play();
    //Set the background to red for unsucessfull match.
    TurnsLeft = TurnsLeft - 1;
    //reduce the number of tunrns left.
  }
  TurnsLeftCounter.innerHTML = TurnsLeft;

  SetTurnsLeftStyle(); //this must be before game over or game won.
  if (WordLetters.join("") == Word) {
    GameWon(); //Game won if all letters correctly guessed.
  }
  if (TurnsLeft == 0) {
    //Game lost if turns over.
    GameOver(); //game over.
  }
}

function SetTurnsLeftStyle() {
  //Set the colour of the turns left according to the theme
  if (TurnsLeft <= 4 && TurnsLeft > 2) {
    TurnsLeftCounter.classList.add("yellow-counter");
    TurnsLeftCounter.classList.remove("green-counter", "red-counter");
  } else if (TurnsLeft <= 2) {
    TurnsLeftCounter.classList.add("red-counter");
    TurnsLeftCounter.classList.remove("green-counter", "yellow-counter");
  } else {
    TurnsLeftCounter.classList.add("green-counter");
    TurnsLeftCounter.classList.remove("red-counter", "yellow-counter");
  }
  if (TurnsLeft == 0) {
    TurnsLeftCounter.style.display = "none";
  }
}

function GameOver() {
  win.pause();
  win.currentTime = 0;
  lost.pause();
  lost.currentTime = 0;
  correct.pause();
  correct.currentTime = 0;
  incorrect.pause();
  incorrect.currentTime = 0;
  lost.play();
  lost.volume = 0.2;
  word.innerHTML = Word;
  word.classList.add("word-game-over");
  word.classList.remove("word-won", "word-start");

  // Pokemon name speech synthesis
  if ("speechSynthesis" in window) {
    console.log("Web Speech API supported!");
  } else {
    console.log("Web Speech API not supported :-(");
  }
  const synth = window.speechSynthesis;
  let ourText = "This Pokemon is named";
  const utterThis = new SpeechSynthesisUtterance(ourText + Word);

  synth.speak(utterThis);
  // End of speech synth

  window.setTimeout(function () {
    //Alert that the game is over after a delay

    WelcomeText.innerHTML =
      "Game over! Total score is " + score;
    score = 0;
    WelcomeText.style = "color:Tomato;font-size:30px";
    PlayBtn.innerHTML = "Retry";
    PlayBtn.style =
      "color:red;font-size:25px;background-color:aqua";
  }, 3500);
  //Show message first, then letter
  imshow();
}

function GameWon() {
  win.pause();
  win.currentTime = 0;
  lost.pause();
  lost.currentTime = 0;
  correct.pause();
  correct.currentTime = 0;
  incorrect.pause();
  incorrect.currentTime = 0;
  music.pause();
  music.currentTime = 0;
  win.play();
  word.innerHTML = Word;
  word.classList.add("word-won");
  word.classList.remove("word-start", "word-game-over");

  // Pokemon name speech synthesis
  if ("speechSynthesis" in window) {
    console.log("Web Speech API supported!");
  } else {
    console.log("Web Speech API not supported :-(");
  }
  const synth = window.speechSynthesis;
  let ourText = "This Pokemon is named";
  const utterThis = new SpeechSynthesisUtterance(ourText + Word);

  synth.speak(utterThis);
  // End of speech synth

  //Show word first, then message with delay
  window.setTimeout(function () {
    score = score + TurnsLeft;
    //Alert that the game is over after a delay
    WelcomeText.innerHTML = "Round passed! Current score is " + score;
    WelcomeText.style = "color:lime;font-size:30px";
    PlayBtn.innerHTML = "Next Round";
    PlayBtn.style = "color:lime;font-size:25px;background-color:yellow";
    correct.pause();
    correct.currentTime = 0;
    //pause trailing sounds
  }, 3500);
  imshow();
}

function imshow() {
  music.pause();
  music.currentTime = 0;
  TurnsLeftCounter.style.display = "none";
  for (var counter_gameover = 1; counter_gameover <= 16; counter_gameover++) {
    document.getElementById("button" + counter_gameover).style.display = "none";

    //Dispay the letters into the indivisual buttons.
  }

  //show the image
  body.style =
    "text-align:center; background-color: white; transition-duration:2.0s;";
    PokemonImg.style =
    "width:15%; animation: appear 1.5s 1";
}

window.addEventListener(
  "beforeunload",
  function (event) {
    window.alert("Exit?");
  },
  false
);
