//Style constants
var score = 0;
var TurnsleftStyle =
  "cursor: url('./pokeball-hover.png'), pointer;font-size: 55px; border-radius: 7%; font-family: Brush Script MT, cursive; transition-duration: 0.5s;";
var style =
  "box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);  font-size: 25px;transition-duration: 0.8s;cursor: url('./pokeball-hover.png'), pointer;border-radius: 8px;";
const SpriteLink = "https://img.pokemondb.net/artwork/large/";
const InfoHyperLink = "https://bulbapedia.bulbagarden.net/wiki/";
var music = new Audio(
  "http://play.pokemonshowdown.com/audio/hgss-kanto-trainer.mp3"
);
var lost = new Audio(
  "http://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg"
);
var win = new Audio("http://play.pokemonshowdown.com/audio/cries/pikachu.mp3");
var incorrect = new Audio(
  "http://play.pokemonshowdown.com/audio/cries/litwick.mp3"
);
var correct = new Audio(
  "http://play.pokemonshowdown.com/audio/cries/chimecho.mp3"
);
var ArrayOfWords = data; //array of data
//Array containing the words.
var Word, WordLength, WordLetters, TurnsLeft, Letters, id;

function play() {
  document.getElementById("welcome").style.cssText = `Display:none;`;
  document.getElementById("play").style.cssText = `Display:none;`;
  document.getElementById("pica-pic").style.cssText = `Display:none;`;
  document.querySelector(".catch-phrase").style = `Display:none`;
  document.getElementById("logo").style.cssText = `Display:none`;
  document.querySelector("main").style = `Display:flex; 
  flex-direction:column;`;

  start();
}

function start() {
  music.play();
  music.loop = "loop";
  music.volume = 0.1;
  document.getElementById("body").style = null;
  document.getElementById("body").className = ("gameBodyBackground");
  // document.getElementById("body").style =
  //   "text-align:center;opacity:0.95;transition-duration:1.0s;background-blend-mode: screen;background-image: url('https://raw.githubusercontent.com/Aatmaj-Zephyr/Hangman/main/WallpaperDog-743770.jpg');background-color: rgba(255,255,255,0.8);";
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
  document.getElementById("Word").style= null;
  document.getElementById("Word").className = ("wordProgress");
  document.getElementById("Word").innerHTML = WordLetters.join(" ");
  //Display the word in the HTML file

  TurnsLeft = Math.floor(WordLength * 0.8);
  //Number of turns left. Modify the formula in the later versions.
  document.getElementById("TurnsLeft").innerHTML = TurnsLeft;
  document.getElementById("TurnsLeft").style.display = "";
  SetTurnsLeftStyle();
  //Display the number of turns left
  Letters = []; //Array to store the Letters
  //Setting the Letters

  for (var k of Word) {
    if (!Letters.includes(k) && k !== Word.charAt(0)) {
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
  document.getElementById("image").style = "display:none;width:5%";
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
  //Disable clicking the same button after it has been clicked.
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
    document.getElementById("Word").innerHTML = WordLetters.join(" ");
  } else {
    document.getElementById("button" + a).style =
      "transition-duration: 0.8s;background-color:Red;font-size: 25px;animation-name: effect; animation-duration: 0.1s;   animation-iteration-count: 7;color:White;cursor: not-allowed;opacity:0.8;";
    incorrect.play();
    //Set the background to red for unsucessfull match.
    TurnsLeft = TurnsLeft - 1;
    //reduce the number of tunrns left.
  }
  document.getElementById("TurnsLeft").innerHTML = TurnsLeft;

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
    document.getElementById("TurnsLeft").style =
      TurnsleftStyle +
      "color:green; border: 4px solid #008CBA; background-color:Yellow";
  } else if (TurnsLeft <= 2) {
    document.getElementById("TurnsLeft").style =
      TurnsleftStyle +
      "color:white; border: 4px solid #4CAF50; animation: effect 0.2s infinite; background-color:Red";
  } else {
    document.getElementById("TurnsLeft").style =
      TurnsleftStyle +
      "color:voilet;background-color:lime; border: 3px solid #f44336;";
  }
  if (TurnsLeft == 0) {
    document.getElementById("TurnsLeft").style.display = "none";
  }
}

function GameOver() {
  resetValuesEndGame()
  lost.play();
  lost.volume = 0.2;

  document.getElementById("Word").className = "gameLostPokemonName";
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

    document.getElementById("welcome").innerHTML =
      "Game over! Total score is " + score;
    score = 0;
    document.getElementById("welcome").style =
      "color:Tomato;font-size:30px;animation: slideMe .70s ease-in;";
    document.getElementById("play").innerHTML = "Retry";
    document.getElementById("play").style = null;
    document.getElementById("play").className = "retryButton";
  }, 7000);
  //Show message first, then letter
  imshow();
}

function GameWon() {
  resetValuesEndGame()
  music.pause();
  music.currentTime = 0;
  win.play();
  document.getElementById("Word").className = "winText";

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
    document.getElementById("welcome").innerHTML =
      "Round passed! Current score is " + score;
    document.getElementById("welcome").style = null;
    document.getElementById("welcome").className = "roundPassed";
    document.getElementById("play").innerHTML = "Next Round";
    document.getElementById("play").style = null;
    document.getElementById("play").className = "winButton";
    correct.pause();
    correct.currentTime = 0;
    //pause trailing sounds
  }, 7000);
  imshow();
}

function resetValuesEndGame(){

  document.getElementById("image").src = SpriteLink + Word.toLowerCase() + ".jpg"; //to load image beforehand;
  document.getElementById("hyperlink").href = InfoHyperLink + Word; //Camelcase word and not lowercade

  win.pause();
  win.currentTime = 0;
  lost.pause();
  lost.currentTime = 0;
  correct.pause();
  correct.currentTime = 0;
  incorrect.pause();
  incorrect.currentTime = 0;

  document.getElementById("Word").innerHTML = Word;
  document.getElementById("Word").style = null;

}

function imshow() {
  music.pause();
  music.currentTime = 0;
  document.getElementById("TurnsLeft").style.display = "none";
  for (var counter_gameover = 1; counter_gameover <= 16; counter_gameover++) {
    document.getElementById("button" + counter_gameover).style.display = "none";

    //Dispay the letters into the indivisual buttons.
  }

  //show the image
  document.getElementById("body").style = null;
  document.getElementById("body").className = ("bodyImshow");
  document.getElementById("image").style = null;
  document.getElementById("image").className = ("imageImshow");
}

window.addEventListener(
  "beforeunload",
  function (event) {
    window.alert("Exit?");
  },
  false
);
