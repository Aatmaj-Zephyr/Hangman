//Style constants
var TurnsleftStyle = "font-size: 65px; font-family: Brush Script MT, cursive;border-radius: 50%; transition-duration: 0.5s;";
var style = "box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);transition-duration: 0.8s;cursor: pointer;border-radius: 8px;";

var ArrayOfWords = data; //array of data
//Array containing the words.
var Word,WordLength,WordLetters,TurnsLeft,Letters,id;

start();
function start(){
  //PascalCase followed.
 id=Math.floor(Math.random() * (ArrayOfWords.length));
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

document.getElementById("Word").style = "color:blue;transition-duration: 0.8s;";
document.getElementById("Word").innerHTML = WordLetters.join(" ");
//Display the word in the HTML file

 TurnsLeft = Math.floor(WordLength * 0.8);
//Number of turns left. Modify the formula in the later versions.
document.getElementById("TurnsLeft").innerHTML = TurnsLeft;
SetTurnsLeftStyle();
//Display the number of turns left
 Letters = []; //Array to store the Letters
//Setting the Letters

for (var k of Word) {
    if (!(Letters.includes(k)) & k != Word.charAt(0)) {
        Letters.push(k.toString());
        //Push the letters of word into the "Letters" array without repetition
    }
}
while (Letters.length < 16) {
    r = Math.floor(Math.random() * (122 - 97 + 1)) + 97; //Character set from unicode.
    v = String.fromCharCode(r);
    if (!(Letters.includes(v))) {
        Letters.push(v);
        //Push random characters into the "Letters" array without repetition.
    }
}
Letters.sort(() => 0.5 - Math.random()); //Random shuffling of Letters.
Letters.push(Letters[0]); //Ignore the card at 0th position.
for (var f = 1; f <= 16; f++) {
    document.getElementById("button" + f).innerHTML = Letters[f];
    document.getElementById("button" + f).style = style;
    document.getElementById("button" + f).disabled="";
    document.getElementById("button" + f).display="";
    //Dispay the letters into the indivisual buttons.
}
}

function ButtonClicked(a) {
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

        document.getElementById("button" + a).style = "transition-duration: 0.8s;background-color:lime;color:Blue;cursor: not-allowed";
        //Set the background to green for sucessfull match.
        document.getElementById("Word").innerHTML = WordLetters.join(" ");
    } else {
        document.getElementById("button" + a).style = "transition-duration: 0.8s;background-color:Tomato;color:White;cursor: not-allowed";
        //Set the background to red for unsucessfull match.
        TurnsLeft = TurnsLeft - 1;
        //reduce the number of tunrns left.
    }
    document.getElementById("TurnsLeft").innerHTML = TurnsLeft;
    if (WordLetters.join("") == Word) {
        GameWon(); //Game won if all letters correctly guessed.
    }
    if (TurnsLeft == 0) {
        //Game lost if turns over.
        GameOver(); //game over.
    }

    SetTurnsLeftStyle();

}

function SetTurnsLeftStyle() {
    //Set the colour of the turns left according to the theme
    if (TurnsLeft <= 4 && TurnsLeft > 2) {
        document.getElementById("TurnsLeft").style = TurnsleftStyle + "color:green; border: 4px solid #008CBA; background-color:Yellow";
    } else if (TurnsLeft <= 2) {
        document.getElementById("TurnsLeft").style = TurnsleftStyle + "color:white; border: 4px solid #4CAF50; background-color:Red";
    } else {
        document.getElementById("TurnsLeft").style = TurnsleftStyle + "color:voilet;background-color:lime; border: 3px solid #f44336;";
    }
}

function GameOver() {
    for (var counter_gameover = 1; counter_gameover <= 16; counter_gameover++) {
    document.getElementById("button" + counter_gameover).style.visibility="hidden";

    //Dispay the letters into the indivisual buttons.
}
    window.setTimeout(function() {
        //Alert that the game is over after a delay
        let TryAgain = confirm(" Game Over, you lost Try again?");

    if(TryAgain==true){
        start();
    }
    }, 2000);
    document.getElementById("Word").innerHTML = Word;
    document.getElementById("Word").style = "text-shadow: 2px 2px black;color:Red;transition-duration: 1.0s;font-size:150px";
    //Show message first, then letter
    
}

function GameWon() {
    for (var counter_gamewon = 1; counter_gamewon <= 16; counter_gamewon++) {
    document.getElementById("button" + counter_gamewon).style.visibility="hidden";

    //Dispay the letters into the indivisual buttons.
}
    document.getElementById("Word").innerHTML = Word;
    document.getElementById("Word").style = "text-shadow: 2px 2px black;color:lime;transition-duration: 1.0s;font-size:150px";
    //Show word first, then message with delay
    window.setTimeout(function() {

        alert("Game Over, you Won!");
        //Alert that the game is over after a delay
    }, 2000);
   
}
