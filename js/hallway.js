var exitDoorClicked = false;
var acidFound = false;
var expanded = false;
var noteFound = false;
var compound1Isvalid = false;
var compound2Isvalid = false;
var compound3IsValid = false;


document.addEventListener('click', musicPlay);
function musicPlay() {

    // create amb audio object and play it
    //AMBIENCE AUDIO SOURCE: https://freesound.org/people/klankbeeld/sounds/173418/
    var amb = new Audio('audio/Hallway/ambience.mp3');
    amb.play();
    amb.loop();

    document.removeEventListener('click', musicPlay);
}

// runs on page load, prints text to the game text div
function onLoad() {

  var para = document.createElement("p");
  var text = document.createTextNode("[System] You've entered a dark hallway and can see a door at the other end, maybe you should look around for an exit before you are caught and dragged back to your cell ");
  var span = document.createElement("SPAN");
  span.style.fontWeight = 'bold';
  var player = document.createTextNode('['+playerName+']');
  para.appendChild(text);
  para.appendChild(span);
  var element = document.getElementById("gameText");
  element.appendChild(para);
  span.appendChild(player);
  lineBreak();


}



// runs whne the window in the hallway is clicked
function windowClick() {

  //create windowClick audio object and play it
  //WINDOW CLICK AUDIO SOURCE: https://www.zapsplat.com/music/chained-locked-industrial-metal-gate-attempt-to-open-movement-version-3/
  var windowClick = new Audio('audio/Hallway/window.mp3');
  windowClick.play();

  var para = document.createElement("p");
  var text = document.createTextNode("[System] You attempt to escape through the window and shake the bars loose but find that the gap is too small and the drop to far, better keep looking");
  para.appendChild(text);
  var element = document.getElementById("gameText");
  element.appendChild(para);
  document.getElementById('windowButton').style.display = 'none';
  lineBreak();
}



// runs when the side room leading to the morgue is clicked
function sideRoomClick() {

  // if the exit door has already been interacted with run this
  if (exitDoorClicked === true) {

    var para = document.createElement("p");
    var text = document.createTextNode("[System] A dark hallway that leads somewhere, maybe there you could find another exit down here. Enter the hallway? press y to enter the hallway ");
    var span = document.createElement("SPAN");
    span.style.fontWeight = 'bold';
    var player = document.createTextNode('['+playerName+']');
    para.appendChild(text);
    para.appendChild(span);
    var element = document.getElementById("gameText");
    element.appendChild(para);
    span.appendChild(player);
    lineBreak();



    // listener for user to key press and enter morgue
    document.addEventListener('keydown', function(e) {
      //  if (e.keyCode == 89)
      loadMorgue();
      morgueIntro();
    }, {
      once: true
    })

  }
  // else run this if exit door has not been interacted with
  else {

    var para = document.createElement("p");
    var text = document.createTextNode("[System] A dark hallway that leads somewhere, maybe there you could find another exit down here Enter the hallway? press y to enter the hallway " );
    var span = document.createElement("SPAN");
    span.style.fontWeight = 'bold';
    var player = document.createTextNode('['+playerName+']');
    para.appendChild(text);
    para.appendChild(span);
    var element = document.getElementById("gameText");
    element.appendChild(para);
    span.appendChild(player);
    lineBreak();


    document.addEventListener('keydown', function(e) {
      //  if (e.keyCode == 89)
      loadMorgue();
      morgueIntro();
    }, {
      once: true
    })

  }
}

// method called when the user clicks on the side door and loads morgue
function loadMorgue() {
  // chnages image to morgue
  var image = document.getElementById('img');
  // MORGUE IMAGE SOURCE: https://www.freepik.com/free-photo/abandoned-morgue-psychiatric-hospital_5600089.htm
  image.src = 'images/Hall/Morgue.png';
  image.alt = 'A dark cold Morgue with a atable and several Morgue lockers';
  // changes room name
  document.getElementById('roomName').innerHTML = 'Morgue';

  // disables hallway buttons
  document.getElementById('windowButton').style.display = 'none';
  document.getElementById('sideRoomButton').style.display = 'none';
  document.getElementById('exitDoorButton').style.display = 'none';

  // enables morgue buttons
  document.getElementById('chemicalButton').style.display = 'block';
  document.getElementById('noteButton').style.display = 'block';
}


// runs whent he exit door in hallway is clicked
function exitClick() {
  // if the acid has been found in morgue run this
  if (acidFound) {
    // print some text
    var para = document.createElement("p");
    var text = document.createTextNode('[System] You pour the acid over the lock on the door, it corrodes it and makes it weak enough for you to pull open, Better get out of here quickly ');
    var span = document.createElement("SPAN");
    span.style.fontWeight = 'bold';
    var player = document.createTextNode('['+playerName+']');
    para.appendChild(text);
    para.appendChild(span);
    var element = document.getElementById("gameText");
    element.appendChild(para);
    span.appendChild(player);
    lineBreak();



    // create acidLock audio object and play it
    //ACID LOCK AUDIO SOURCE: https://www.zapsplat.com/music/acid-burn-sizzle-1-2/
    var acidLock = new Audio('audio/Hallway/acidLock.mp3');
    acidLock.play();

    // ask for user input using listener and load next room
    document.addEventListener('keydown', function(e) {
      if (e.keyCode == 89)
        // create gateOpening audio object and play it
        var gateOpening = new Audio('audio/Hallway/gateOpening.wav');
      gateOpening.play();
      if (timePassed > 60) {
        sessionStorage.setItem("timeleft", 0);
      } else {
        sessionStorage.setItem("timeleft", 60 - timePassed);
      }
      sessionStorage.setItem("hallwayTime", timePassed);
      setTimeout(function() {
        stopTimer();
        location = 'security.html';
      }, 1000);



    })

  } else {

    //create gateLocked audio object and play it
    //GATE LOCKED SOUND SOURCE: https://www.zapsplat.com/music/chained-locked-industrial-metal-gate-attempt-to-open-movement-version-1/
    var gateLocked = new Audio('audio/Hallway/gateLocked.mp3');
    gateLocked.play();

    // if acid has not been gotten print some text
    exitDoorClicked = true;
    var para = document.createElement("p");
    var text = document.createTextNode("A exit but it is barred by a locked steel gate, it looks old, I may be able to break the lock with the right tool");
    para.appendChild(text);
    var element = document.getElementById("gameText");
    element.appendChild(para);
    lineBreak();
  }
}






// prints morgue intro text when morgue loads
function morgueIntro() {
  morgueIntro = function() {};
  var para = document.createElement("p");
  var text = document.createTextNode('[System] The hallway lead you to a morgue, this must be where Dr Friedrich disposes of his subjects. Maybe you should look around, for anything to help you unlock the gate in the hallway ');
  var span = document.createElement("SPAN");
  span.style.fontWeight = 'bold';
  var player = document.createTextNode( '['+playerName+']');
  para.appendChild(text);
  para.appendChild(span);
  var element = document.getElementById("gameText");
  element.appendChild(para);
  span.appendChild(player);
  lineBreak();
}


// function chemicalEvent() {
//   showSelection();
// }

function showSelection() {

  if (noteFound === true) {

    // create chemicals audio object and play it
    // CHEMICAL FIND NO NOTE SOUND SOURCE: https://www.zapsplat.com/music/beer-bottles-slide-into-each-other-2/
    var chemicals = new Audio('audio/Hallway/chemicalFindNoNote.mp3');
    chemicals.play();

    var para = document.createElement("p");
    var text = document.createTextNode('These seem to be the chemicals Dr Friedrich mentioned in his note, each bottle has a letter on it with the word "RIGHT" written on it, strange. I should be able to make something useful to use on the gate in the hallway. Maybe the note I found earlier could help here, it said something about acid that may be useful...');
    para.appendChild(text);
    var element = document.getElementById("gameText");
    element.appendChild(para);
    lineBreak();

    var compound1Array = ["X", "H", "N", "C"];

    var compoundLabel1 = document.createElement("LABEL");
    compoundLabel1.innerHTML = 'Select your first compound: '
    element.appendChild(compoundLabel1);

    //Create and append select list for compound 1
    var selectList1 = document.createElement("select");

    selectList1.id = "compound1";
    element.appendChild(selectList1);

    //Create and append the options for compound 1
    for (var i = 0; i < compound1Array.length; i++) {
      var option = document.createElement("option");
      option.value = compound1Array[i];
      option.text = compound1Array[i];
      option.id = compound1Array[i];
      selectList1.appendChild(option);
    }



    lineBreak();
    lineBreak();

    var compound2Array = ["C", "A", "M", "C"];

    var compoundLabel2 = document.createElement("LABEL");
    compoundLabel2.innerHTML = 'Select your second compound: '
    element.appendChild(compoundLabel2);

    //Create and append select list for compound 2
    var selectList2 = document.createElement("select");
    selectList2.id = "compound2";
    element.appendChild(selectList2);

    //Create and append the options for compound 2
    for (var i = 0; i < compound2Array.length; i++) {
      var option = document.createElement("option");
      option.value = compound2Array[i];
      option.text = compound2Array[i];
      option.id = compound2Array[i];
      selectList2.appendChild(option);
    }

    lineBreak();
    lineBreak();

    var compound3Array = ["3", "6", "7", "1"];

    var compoundLabel3 = document.createElement("LABEL");
    compoundLabel3.innerHTML = 'Select your third compound: '
    element.appendChild(compoundLabel3);

    //Create and append select list for compound 3
    var selectList3 = document.createElement("select");

    selectList3.id = "compound3";
    element.appendChild(selectList3);

    //Create and append the options for compound 3
    for (var i = 0; i < compound3Array.length; i++) {
      var option = document.createElement("option");
      option.value = compound3Array[i];
      option.text = compound3Array[i];
      option.id = compound3Array[i];
      selectList3.appendChild(option);
    }

    lineBreak();
    lineBreak();

    // create submit button for chemical event
    var submit = document.createElement("BUTTON");
    submit.id = "submitButton";
    submit.innerHTML = "Submit";
    submit.title = 'Submit button';
    element.appendChild(submit);
    lineBreak();

    // attach on click event to button
    document.getElementById("submitButton").addEventListener("click", checkSelections);

lineBreak();

  } else {

    // create chemicals audio object and play it
    // CHEMICAL FIND NO NOTE SOUND SOURCE: https://www.zapsplat.com/music/beer-bottles-slide-into-each-other-2/
    var chemicals = new Audio('audio/Hallway/chemicalFindNoNote.mp3');
    chemicals.play();

    var para = document.createElement("p");
    var text = document.createTextNode('You find a tray of what seems like chemicals, although they are not labeled in any obvious way that you can see, just a letter or number on the front of each bottle and the word "RIGHT", maybe there is a clue somehwere that can help me tell which chemical is which.');
    para.appendChild(text);
    var element = document.getElementById("gameText");
    element.appendChild(para);
    lineBreak();
  }
}

// checks if the chemical compunds chosen by the player are correct when they hit the submit button
function checkSelections() {

   var select1 = document.getElementById('compound1');
   var select2 = document.getElementById('compound2');
   var select3 = document.getElementById('compound3');

  // if the selection is correct print Success and run code to go back to hallway
  if (select1.options[compound1.selectedIndex].text == 'H' && select2.options[compound2.selectedIndex].text == 'M' && select3.options[compound3.selectedIndex].text == '6') {

    // create acidAudio audio object and play it
    // ACID PUZZLE SUCCESS SOUND SOURCE: https://freesound.org/people/spookymodem/sounds/202094/
    var acidAudio = new Audio('audio/Hallway/acidSuccess.wav');
    acidAudio.play();

    acidFound = true;

     var para = document.createElement("p");
     var text = document.createTextNode('[System] Success! This seems to have made some acid that is more than corossive enough, you can use it to break down the lock in the hallway, better get going! Hit y to go back to the Hallway ');
     var span = document.createElement("SPAN");
     span.style.fontWeight = 'bold';
     var player = document.createTextNode('['+ playerName+']');
     para.appendChild(text);
     para.appendChild(span);
     var element = document.getElementById("gameText");
     element.appendChild(para);
     span.appendChild(player);
     lineBreak();

    document.addEventListener('keydown', function(e) {
      var image = document.getElementById('img');
      // HALLWAY IMAGE SORUCE: https://pixabay.com/photos/gang-dark-gloomy-creepy-lost-776297/
      image.src = 'images/Hall/Hallway.png';
      image.alt = 'A dark hallway with a gate leading to an exit at one end, a window on the right leading outside, and a path leading to a corridor on the left';
      document.getElementById('roomName').innerHTML = 'Hallway';
      document.getElementById('exitDoorButton').style.display = 'block';
      document.getElementById('chemicalButton').style.display = 'none';
      document.getElementById('noteButton').style.display = 'none';


    })

  } else {

    //play puzzle failure sound
    // ACID PUZZLE FAILURE SOUND SOURCE: https://www.soundjay.com/button/sounds/button-18.mp3
    var acidFailure = new Audio('audio/Hallway/acidFailure.mp3');
    acidFailure.play();
    // selection was not correct print some text
    var para = document.createElement("p");
    var text = document.createTextNode("This combonation doesn't seem to be what I need, I should try making something to dissolve the lock in the hallway, maybe some acid would do? I should double check the note I found, it mentioned acid and some sort of key");
    para.appendChild(text);
    var element = document.getElementById("gameText");
    element.appendChild(para);
    lineBreak();



  }
}

// method that prints a line break where called to the gameText div
function lineBreak() {
  var lineBreak = document.createElement("br");
  var element = document.getElementById("gameText");
  element.appendChild(lineBreak);

}

// code is run when the note buttin in morgue is clicked
function expandNote() {
    // NOTE SOUND SOURCE: https://www.zapsplat.com/music/a4-paper-notepad-thin-page-turn-6/
  var noteOpen = new Audio('audio/Hallway/noteOpen.mp3');
  noteOpen.play();

  noteFound = true;

  document.getElementById("myModalDiv").style.display = "block";
  // NOTE IMAGE SOURCE: https://www.pexels.com/photo/empty-brown-canvas-235985/
  document.getElementById("expandedNote").src = "images/Hall/ChemicalNote.jpg";
  document.getElementById("expandedNote").alt = "A old note with chemical formula and a note from Dr Friedrich on it, a formula for ACID  is on it with the code 'CH1'";
  document.getElementById("caption").innerHTML = "An old note belongning to Dr Friedrich, he seems to have mentioned some sort of cipher on it";

  var isblock = document.getElementById("myModalDiv");

  // closes note using escape key
  document.addEventListener('keydown', function(e) {
    if (e.key == 'Escape' && isblock.style.display === "block")
    // NOTE SOUND SOURCE: https://www.zapsplat.com/music/a4-paper-notepad-thin-page-turn-6/
    var noteOpen = new Audio('audio/Hallway/noteOpen.mp3');
    noteOpen.play();
    document.getElementById("myModalDiv").style.display = "none";
    document.getElementById("wiresModal").style.display = "none";
  })

}

// code to close using x button
function closeNote() {

  // NOTE SOUND SOURCE: https://www.zapsplat.com/music/a4-paper-notepad-thin-page-turn-6/
  var noteOpen = new Audio('audio/Hallway/noteOpen.mp3');
  noteOpen.play();

  document.getElementById("myModalDiv").style.display = "none";
  document.getElementById("wiresModal").style.display = "none";
}
