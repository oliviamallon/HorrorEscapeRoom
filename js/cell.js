// onLoad method that displays game text and plays ambience sound when room loads
function onLoad() {

  var para = document.createElement("p");
  var text = document.createTextNode("[System] You have just regained consciousness. You find yourself left alone in a cell. You are left badly shaken and confused. You better make an escape soon or become one of Doctor Friedrich's experiments. Make sure to hover your mouse around the room to find items and puzzles. ");
  var span = document.createElement("SPAN");
  span.style.fontWeight = 'bold';
  var player = document.createTextNode('['+playerName+']');
  para.appendChild(text);
  para.appendChild(span);
  var element = document.getElementById("col-left");
  element.appendChild(para);
  span.appendChild(player);
  lineBreak();
}
// Plays ambience music when user clicks on page
document.addEventListener('click', musicPlay);
function musicPlay() {
    var amb = new Audio('audio/Cell/cellAmbience.mp3');
    amb.play();
    document.removeEventListener('click', musicPlay);
}

var code; //lock safe code entered in by user to unlock safe 7412
var unlocked = false; //boolean checking if the safe has been unlocked
var lockPickFound = false; //boolean checking if the user collected the lock pick

// method that prints a line break where called to the gameText div
function lineBreak() {
  var lineBreak = document.createElement("br");
  var element = document.getElementById("col-left");
  element.appendChild(lineBreak);
}

// Lock pick click method that plays a sound and displays game text when the user clicks on the lock pick
function LockPickClick(background) {
  lockPickFound = true;

  // create pickupItem audio object and play it
  var pickupItemSound = new Audio('audio/Cell/pickupItem.wav');
  pickupItemSound.play();

  // Adds note modal button after clicked
  var lModal = document.getElementById("lockPickInv");
  lockPickInv.style.display = "block";

  // Removes button after clicked
  var nButton = document.getElementById("lockPickButton");
  lockPickButton.style.display = "none";

  // Displays text for the user (in left column)
    var para = document.createElement("p");
  var text = document.createTextNode("[System] You discovered a lock pick maybe you could use it to unlock the cell gate ");
  var span = document.createElement("SPAN");
  span.style.fontWeight = 'bold';
  var player = document.createTextNode('['+playerName+']');
  para.appendChild(text);
  para.appendChild(span);
  var element = document.getElementById("col-left");
  element.appendChild(para);
  span.appendChild(player);
  lineBreak();
}

//Expand the note image
function expand(){
  document.getElementById("myModal").style.display = "block";
  document.getElementById("expandedNote").src = "images/Cell/victimsDiary.png";
  document.getElementById("expandedNote").alt = "victim's Diary";
  document.getElementById("caption").innerHTML = "Dr Friedlich's victims diary";

  // create noteClickSound audio object and play it
  var noteClickSound = new Audio('audio/Cell/noteClick.wav');
  noteClickSound.play();
}

// When the user clicks on <span> (x), close the note
function closeNote() {
  document.getElementById("myModal").style.display = "none";

  // create noteCloseSound audio object and play it
  var noteCloseSound = new Audio('audio/Cell/noteClose.wav');
  noteCloseSound.play();

}

// arrow Click method that checks if the user has completed the room and if they have change the room layout and room image
function arrowClick(background) {
// If statement to check if the user hasn't completed the room
if (unlocked == false || lockPickFound == false){
  // Displays text for the user (in left column)
  var para = document.createElement("p");
var text = document.createTextNode("[System] Make sure you look around the room fully before turning around.");
para.appendChild(text);
var element = document.getElementById("col-left");
element.appendChild(para);

var lineBreak = document.createElement("br");
var element = document.getElementById("col-left");
element.appendChild(lineBreak);
}
else { // else if the user completed the room then change the room layout and image

  // Changes image on click
  image = document.getElementById('background');
  image.src = "images/Cell/cellDoorOpen.jpg";
  image.alt = 'Cells with a locked door at the end.';
  // Removes button after clicked
  var nButton = document.getElementById("arrowButton");
  arrowButton.style.display = "none";

  // Removes drawer button after clicked
  var nButton = document.getElementById("drawerButton");
  drawerButton.style.display = "none";

  // Adds cell door button after clicked
  var nButton = document.getElementById("cellGateButton");
  cellGateButton.style.display = "block";

  // Adds cell lock button after clicked
  var nButton = document.getElementById("gateLockButton");
  gateLockButton.style.display = "block";

  // Displays text for the user (in left column)
  var para = document.createElement("p");
  var text = document.createTextNode("[System] You turn around to discover you are locked in a cell. The only thing stopping you from getting closer to freedom is a locked cell door (Drag and Drop the lock pick onto the cell gate lock)");
  para.appendChild(text);
  var element = document.getElementById("col-left");
  element.appendChild(para);

  var lineBreak = document.createElement("br");
  var element = document.getElementById("col-left");
  element.appendChild(lineBreak);

    document.getElementById('cellGateButton').style.display = "block";
    document.getElementById('gateLockButton').style.display = "block";
  }
}

// codeClick method that displays the code in the game text for accessibility
function codeClick(background) {

// Displays text for the user (in left column)
  var para = document.createElement("p");
var text = document.createTextNode("[System] You spot a code on the wall: 7412. Mabye this code could be used to unlock the safe ");
var span = document.createElement("SPAN");
span.style.fontWeight = 'bold';
var player = document.createTextNode('['+playerName+']');
para.appendChild(text);
para.appendChild(span);
var element = document.getElementById("col-left");
element.appendChild(para);
span.appendChild(player);
lineBreak();

}

//  gateLockPicked method that unlocks the gate and loads the next rooms puzzles
function gateLockPicked(background) {

  // create gateOpening audio object and play it
  var gateOpening = new Audio('audio/Cell/gateOpen.wav');
  gateOpening.play();

  // Removes button after clicked
  var nButton = document.getElementById("arrowButton");
  arrowButton.style.display = "none";

  // Removes gate Lock button after clicked
  var nButton = document.getElementById("gateLockButton");
  gateLockButton.style.display = "none";

  // Removes cell gate button after clicked
  var nButton = document.getElementById("cellGateButton");
  cellGateButton.style.display = "none";

  // Removes lock pick inventory button after clicked
  var nButton = document.getElementById("lockPickInv");
  lockPickInv.style.display = "none";

  // Adds cell door button after clicked
  var nButton = document.getElementById("lockedDoorButton");
  lockedDoorButton.style.display = "block";

  // Displays text for the user (in left column)
    var para = document.createElement("p");
  var text = document.createTextNode("[System] You have successfully picked the lock on the cell gate! The only thing stopping you from escaping the cell room is a locked door ");
  var span = document.createElement("SPAN");
  span.style.fontWeight = 'bold';
  var player = document.createTextNode('['+playerName+']');
  para.appendChild(text);
  para.appendChild(span);
  var element = document.getElementById("col-left");
  element.appendChild(para);
  span.appendChild(player);
  lineBreak();
}
// doorContrClick method that plays a sound and displays the combination button when user clicks on door
function doorContrClick(background) {

  // create metalDoorClick audio object and play it
  var metalDoorClick = new Audio('audio/Cell/doorLockedClick.flac');
  metalDoorClick.play();

  // Remove locked door button
  var nButton = document.getElementById("lockedDoorButton");
  lockedDoorButton.style.display = "none";

  // Adds combination buttons after clicked
  var nButton = document.getElementById("doorControButtonTri");
  doorControButtonTri.style.display = "block";

  var nButton = document.getElementById("doorControButtonX");
  doorControButtonX.style.display = "block";

  var nButton = document.getElementById("doorControButtonSqu");
  doorControButtonSqu.style.display = "block";

  var nButton = document.getElementById("doorControButtonCir");
  doorControButtonCir.style.display = "block";

  // Displays text for the user (in left column)
    var para = document.createElement("p");
  var text = document.createTextNode("[System] This door appears to be locked! Click on the buttons to the left of this door in the correct order to unlock the door ");
  var span = document.createElement("SPAN");
  span.style.fontWeight = 'bold';
  var player = document.createTextNode('['+playerName+']');
  para.appendChild(text);
  para.appendChild(span);
  var element = document.getElementById("col-left");
  element.appendChild(para);
  span.appendChild(player);
  lineBreak();
}

// Method that moves the user onto the next room and records the time to be carried over
function doorOpenClick(background) {

  // Remove open door button
  var nButton = document.getElementById("openDoorButton");
  openDoorButton.style.display = "none";
  sessionStorage.setItem("cellTime", timePassed);
  if(timePassed>60){
    sessionStorage.setItem("timeleft", 0);
  } else{
    sessionStorage.setItem("timeleft", 60-timePassed);
  }

  stopTimer();
  window.location.href = "laboratory.html";
}

  // safeCode method that displays a insert box and a message for the user to enter in the 4 digit safe code
  function safeCode() {
    var gameArea = document.getElementById('col-left');
    var txt = "";

    // Removes button after clicked
    var nButton = document.getElementById("drawerButton");
    drawerButton.style.display = "none";

    txt = '<p>[System] You found a locked safe box - Please enter a 4 digit code to unlock it</p><br>';
    txt += '<label for= "safeCode" id="codeLabel" >Code: </label>';
    txt += '<input type= "text" id="SafeCode" name= "SafeCode"></input><input type="submit" value = "Submit" id = "submitCode" onclick="safeSubmit();"/><br>';
    gameArea.innerHTML += txt + "<br>";
  }

// Once the user submits this method is called to check if the user entered in the correct code
  function safeSubmit() {

    var x = document.getElementById("SafeCode").value;
    document.getElementById('gameText').innerHTML = "";
    //If the user enteres in the correct code
    if(x=="7412"){
      // create safeopening audio object and play it
      var safeopening = new Audio('audio/Cell/safeOpen.flac');
      safeopening.play();

      // Adds note modal button after clicked
      var nModal = document.getElementById("noteModal");
      noteModal.style.display = "block";

      // Displays text for the user (in left column)
      var para = document.createElement("p");
      var text = document.createTextNode("[System] You have unlocked the safe and found a note and a flash light within it.");
      para.appendChild(text);
      var element = document.getElementById("col-left");
      element.appendChild(para);

      var lineBreak = document.createElement("br");
      var element = document.getElementById("col-left");
      element.appendChild(lineBreak);

      // Removes button after clicked
      var nButton = document.getElementById("drawerButton");
      drawerButton.style.display = "none";

      // removes the insert box and message
      document.getElementById("SafeCode").remove();
      document.getElementById("codeLabel").remove();
      document.getElementById("submitCode").remove();
      // sets unlocked boolean to true
      unlocked = true;
    //else the user is told the code is incorrect
    }else{
      // create safeCodeWrong audio object and play it
      var safeCodeWrongSound = new Audio('audio/Cell/safeCodeWrong.mp3');
      safeCodeWrongSound.play();

      // Displays text for the user (in left column)
      var para = document.createElement("p");
      var text = document.createTextNode("[System]:That code is incorrect - Hint: Look around the room.");
      para.appendChild(text);
      var element = document.getElementById("col-left");
      element.appendChild(para);

      var lineBreak = document.createElement("br");
      var element = document.getElementById("col-left");
      element.appendChild(lineBreak);
    }

  }

  // combination success method that removes the buttons and changes the background image and displays a method once called
  function combinationSuccess(background) {

    // create doorOpen audio object and play it
    var doorOpen = new Audio('audio/Cell/doorOpening.wav');
    doorOpen.play();

    // Adds open door button after clicked
    var nButton = document.getElementById("openDoorButton");
    openDoorButton.style.display = "block";

    // Changes background image
    image = document.getElementById('background');
    image.src = "images/Cell/CellRoomsDoorOpen.png";
    image.alt = 'Cells with the door at end open';

    // removes combination buttons
    var nButton = document.getElementById("doorControButtonTri");
    doorControButtonTri.style.display = "none";

    var nButton = document.getElementById("doorControButtonX");
    doorControButtonX.style.display = "none";

    var nButton = document.getElementById("doorControButtonSqu");
    doorControButtonSqu.style.display = "none";

    var nButton = document.getElementById("doorControButtonCir");
    doorControButtonCir.style.display = "none";

    // Removes victims dairy
    var nButton = document.getElementById("noteModal");
    noteModal.style.display = "none";

    // Displays text for the user (in left column)
      var para = document.createElement("p");
    var text = document.createTextNode("[System] You have successfully entered the correct combination! ");
    var span = document.createElement("SPAN");
    span.style.fontWeight = 'bold';
    var player = document.createTextNode('['+playerName+']');
    para.appendChild(text);
    para.appendChild(span);
    var element = document.getElementById("col-left");
    element.appendChild(para);
    span.appendChild(player);
    lineBreak();
  }

  //Symbol combination lock method
  var buttonsPressed = 0;
  var lockCode = "TriangleSquareCircleCross";
  var enteredCode = "";
    function combinationDoorUnlock(symbol){

      // create combinationClickSound audio object and play it
      var combinationClickSound = new Audio('audio/Cell/combinationClick.wav');

      //Make buttons disappear when pressed and play sound and record pressed button
      switch(symbol){
        case "Triangle" :
          document.getElementById("doorControButtonTri").style.display="none";
          enteredCode += symbol;
          buttonsPressed++;
          combinationClickSound.play();
          break;
        case "Circle":
          document.getElementById("doorControButtonCir").style.display="none";
          enteredCode += symbol;
          buttonsPressed++;
          combinationClickSound.play();
          break;
        case "Square":
          document.getElementById("doorControButtonSqu").style.display="none";
          enteredCode += symbol;
          buttonsPressed++;
          combinationClickSound.play();
          break;
        case "Cross":
          document.getElementById("doorControButtonX").style.display="none";
          enteredCode += symbol;
          buttonsPressed++;
          combinationClickSound.play();
          break;
        default:
          alert("Error in combination button locks");
          break;
      }

      // Displays text for the user (in left column)
      var para = document.createElement("p");
      var text = document.createTextNode("[System] "+symbol + " button pressed...","");
      para.appendChild(text);
      var element = document.getElementById("col-left");
      element.appendChild(para);

      var lineBreak = document.createElement("br");
      var element = document.getElementById("col-left");
      element.appendChild(lineBreak);

      //Reset if all 4 buttons have been pressed
      if(buttonsPressed >= 4){
        //Correct order of button press
        if(enteredCode == lockCode){
           // Call the combinationSuccess method
           combinationSuccess();

            //Hide buttons
            document.getElementById("doorControButtonTri").style.display="none";
            document.getElementById("doorControButtonSqu").style.display="none";
            document.getElementById("doorControButtonCir").style.display="none";
            document.getElementById("doorControButtonX").style.display="none";

          }
          else{ //Incorrect order of button press

            // create combinationWrongSound audio object and play it
            var combinationWrongSound = new Audio('audio/Cell/combinationWrong.mp3');
            combinationWrongSound.play();

            // Displays text for the user (in left column)
            var para = document.createElement("p");
            var text = document.createTextNode("[System] Buttons were pressed in the wrong order. No locks were disabled - Hint: Read bottom of victims note");
            para.appendChild(text);
            var element = document.getElementById("col-left");
            element.appendChild(para);

            var lineBreak = document.createElement("br");
            var element = document.getElementById("col-left");
            element.appendChild(lineBreak);

            // Loads the buttons back again
            document.getElementById("doorControButtonTri").style.display="initial";
            document.getElementById("doorControButtonSqu").style.display="initial";
            document.getElementById("doorControButtonCir").style.display="initial";
            document.getElementById("doorControButtonX").style.display="initial";
          }
          // Reset the values
          enteredCode = "";
          buttonsPressed = 0;
        }
}

// Drag Functions
function onDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
  event.currentTarget.style.backgroundColor = '#E7E0B6';
}

function onDragOver(event) {
event.preventDefault();
}

function onDrop(event) {
event.preventDefault();
gateLockPicked();

const id = event.dataTransfer.getData('text');

const draggableElement = document.getElementById(id);
const dropzone = event.target;

dropzone.appendChild(draggableElement);
draggableElement.style.backgroundColor = "#C2E8BA";

event.dataTransfer.clearData();

document.getElementById('lockPickInv').style.top = '50%';
document.getElementById('lockPickInv').style.right = '50%';
document.getElementById('lockPickInv').style.height = '4vh';
document.getElementById('lockPickInv').style.width = '10vh';
}
