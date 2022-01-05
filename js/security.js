  //Game text variables
  var gameDialog = "<p> Seems like this is the room Dr Friedrich used this room to monitor his subjects </p>";
  var cluesFound = 0;
  var cluesText = " <br> -Clues found(" + cluesFound + "/3) Part of the door unlocks-";

  //Clues fixed boolean
  var wiresFixed = false;
  var comboLock = false;
  var passcode = false;

  var light ="on";
  var torch = false;
  var currentClues;
  var first = true;
  var wrongTimes = 0;
  var colour = 0 //0 = dark 1 = light

  //Player name
  var playerName = sessionStorage.getItem("subject");
//Ambience
  document.addEventListener('click', musicPlay);
  function musicPlay() {
      var amb = new Audio('audio/Security/ambience.mp3');
      amb.play();
      document.removeEventListener('click', musicPlay);
      torch = true;

  }

  //When the wires are clicked
  function wiresClick(){
    var wiresButton = document.getElementById("leftWire");
    wiresButton.style.display = "none";
    cluesFound++;
    var electricSound = new Audio('audio/Security/wires.wav');
    electricSound.play();

    //Switch to display diffferent door mechanism unlock message depending on clues found
    switch (cluesFound) {
      case 1:
        cluesText = " <br> -Clues found(" + cluesFound + "/3) 1 of the door's locks have been disabled-";
        break;
      case 2:
        cluesText = " <br> -Clues found(" + cluesFound + "/3) You hear another mechanism shifting behind the wall...-";
        break;
      case 3:
        cluesText = " <br> -Clues found(" + cluesFound + "/3) The last lock has been disabled-";
        break;
      default:
        alert("Error in clues found switch JS WiresClick");
        break;
    }
        wiresFixed = true;

        writeText('<span style = font-weight:bold;> [' +  playerName +'] </span>' +'The wire seems to be reconnected properly',cluesText);
        var mechSound = new Audio('audio/Security/doorMech.wav');
        mechSound.play();
  }

  //Function to output text in the game speech part
  function writeText(text,cluesText){
    if(text == "" && cluesText == ""){
      document.getElementById('gameText').innerHTML = (gameDialog);
    }
    else{
      gameDialog = document.getElementById('gameText').innerHTML;
      gameDialog += "<p> <br>"+ text + "<span style = font-weight: bold;>" + cluesText+ "</span>" + "</p>";
      document.getElementById('gameText').innerHTML = (gameDialog);
    }
  }

  //When the exit door is clicked
  function exit(){
    var lockedSound = new Audio('audio/Security/doorLocked.wav');

    if(cluesFound >= 3){

      writeText("You have escaped the security room!","");
      sessionStorage.setItem("securityTime", timePassed);
      if(timePassed>60){
        sessionStorage.setItem("timeleft", 0);
      } else{
        sessionStorage.setItem("timeleft", 60-timePassed);
      }
      stopTimer();
      window.location.href = "exit.html";
    }
    else if(cluesFound == 2){
      writeText('<span style = font-weight:bold;> [' +  playerName +'] </span>' + "Door still seems to be locked <br> 2/3 Locks are disabled","");
      lockedSound.play();
      doorbutton.style.display = "none";
    }
    else if(cluesFound == 1){
      writeText('<span style = font-weight:bold;> [' +  playerName +'] </span>' + "Door still seems to be locked <br> 1/3 Locks are disabled","");
      lockedSound.play();
      doorbutton.style.display = "none";
    }
    else if(cluesFound == 0){
      writeText('<span style = font-weight:bold;> [' +  playerName +'] </span>' + "The door seems to have a 3 layer lock. <br> 0/3 Locks are disabled","");
      lockedSound.play();
      doorbutton.style.display = "none";
    }
  }

  //Unlock 3 passcode lock
  var buttonsPressed = 0;
  var lockCode = "132";
  var enteredCode = "";
  var firstTime = true;
  var gameTextWithoutButtons;
    function unlock(number){

      //Prompt for buttons to be pressed in an order
      if((buttonsPressed == 0)&&(firstTime)){
        writeText('<span style = font-weight:bold;> [' +  playerName +'] </span>' + "There are 3 buttons here. Maybe I need to press them in a certain order...","")
      }
      //Remove repetitive button presses text
      if(buttonsPressed ==0){
        gameTextWithoutButtons = gameDialog;
      }
      var buttonSound= new Audio("audio/Security/button.wav");
      buttonSound.play();
      firstTime = false;
      //Make buttons disappear when pressed
      switch(number){
        case 1:
          document.getElementById("firstbutton").style.display="none";
          enteredCode += number;
          buttonsPressed++;
          break;
        case 2:
          document.getElementById("secondbutton").style.display="none";
          enteredCode += number;
          buttonsPressed++;
          break;
        case 3:
          document.getElementById("thirdbutton").style.display="none";
          enteredCode += number;
          buttonsPressed++;
          break;
        default:
          alert("Error in switch of button locks");
          break;
      }



      writeText('<span style = font-weight:bold;> [' +  playerName +'] </span>' + "Presses Button " + number + "...","");
      //Reset if its been pressed 3 times
      if(buttonsPressed >= 3){
        //Correct order of button press

          if(enteredCode == lockCode){
            cluesFound++;
            var mechSound = new Audio('audio/Security/doorMech.wav');
            mechSound.play();
            comboLock = true;
            //Switch to display diffferent door mechanism unlock message depending on clues found
            switch (cluesFound) {
              case 1:
                cluesText = " <br> -Clues found(" + cluesFound + "/3) 1 of the door's locks have been disabled-";
                break;
              case 2:
                cluesText = " <br> -Clues found(" + cluesFound + "/3) You hear another mechanism shifting behind the wall...-";
                break;
              case 3:
                cluesText = " <br> -Clues found(" + cluesFound + "/3) The last lock has been disabled-";
                break;
              default:
                alert("Error in clues found switch JS WiresClick");
                break;
            }

            //Hide buttons
            document.getElementById("firstbutton").style.display="none";
            document.getElementById("secondbutton").style.display="none";
            document.getElementById("thirdbutton").style.display="none";

            doorbutton.style.display = "block";

            var correctButtonText = '<span style = font-weight:bold;> [' +  playerName +'] </span>' + "It seems that the buttons were pressed in the correct order... ";
            gameTextWithoutButtons += "<p> <br>" + correctButtonText + "</p>";
            gameDialog = gameTextWithoutButtons;
            writeText("","");
            writeText("",cluesText);
          }
          else{ //Incorrect order of button press
            var errorSound = new Audio('audio/Security/error.wav');
            errorSound.play();

            var wrongButtonText = '<span style = font-weight:bold;> ['+  playerName +'] </span>' + "Seems like I pressed the buttons in the wrong order. Maybe there is a clue somewhere... ";
            gameTextWithoutButtons += "<p> <br>" + wrongButtonText + "</p>";
            gameDialog = gameTextWithoutButtons;
            writeText("","");

            document.getElementById("firstbutton").style.display="initial";
            document.getElementById("secondbutton").style.display="initial";
            document.getElementById("thirdbutton").style.display="initial";
          }
          enteredCode = "";
          buttonsPressed = 0;
        }

    }

    //Expand the note image
    function expand(){
      var paperSound = new Audio('audio/Security/note.wav');
      paperSound.play();

      document.getElementById("myModal").style.display = "block";
      document.getElementById("expandedNote").src = "images/Security/BloodNoteForTim.jpg";
      document.getElementById("caption").innerHTML = "Dr Friedlich's Notes";
    }

    //Expand the note image
    function expandMel(){
      var paperSound = new Audio('audio/Security/note.wav');
      paperSound.play();

      document.getElementById("melModal").style.display = "block";
      document.getElementById("expandedMel").src = "images/Security/MelNote.png";
      document.getElementById("melCaption").innerHTML = "Mel...";
    }


    // When the user clicks on <span> (x), close the note
    function closeNote() {
      document.getElementById("myModal").style.display = "none";
      document.getElementById("melModal").style.display = "none";
    }

    // When the user clicks on <span> (x), close the note
    function closeMel() {
      document.getElementById("melModal").style.display = "none";
    }

    //Expand the note image
    function expandWires(){

      currentClues = cluesFound;
      var boxSound = new Audio("audio/Security/wiresBox.wav");
      boxSound.play();

      writeText('<span style = font-weight:bold;> ['+  playerName +'] </span>' + "An electrical cabinet. That wire seems to be loose... ","")

      var image = document.getElementById("roomImg");
      image.src="images/Security/Wires.png";
      image.alt="Inside the electrical cabinet. Broken wires and a password lock";
      //image.Width = "600px";
      //room = "wires";

      //Hide all bootons
      document.getElementById("doorbutton").style.display = "none";
      document.getElementById("firstbutton").style.display = "none";
      document.getElementById("secondbutton").style.display = "none";
      document.getElementById("thirdbutton").style.display = "none";
      document.getElementById("wiresbutton").style.display = "none";
      document.getElementById("noteModal").style.display = "none";

      //Show Wires Elements
      document.getElementById("backButton").style.display = "block";
      document.getElementById("passcodeLock").style.display = "block";
      document.getElementById("melModalButton").style.display="block";
      if(!wiresFixed){
        document.getElementById("leftWire").style.display = "block";
      }
    }

    // When the user clicks on <span> (x), close the note
    function closeNote() {
      document.getElementById("myModal").style.display = "none";
      document.getElementById("wiresModal").style.display = "none";

    }


    function moveTorch() {
      if(torch){

        if(first){
          writeText('<span style = font-weight:bold;> ['+  playerName +'] </span>'+"It seems like the power went off... I'll have to use my torch for now","")
          //Show buttons when torch on
          document.getElementById("wiresbutton").style.display="block";
        }
        first = false;
      document.getElementById("light").style.display="block";

      var pos = document.documentElement;

      var test = document.getElementById("imageDiv");
      var rect = test.getBoundingClientRect();

      var viewportLeft = rect.left;
      var viewportTop = rect.top;

      var x = event.clientX; // x co-ord of Window
      var y = event.clientY; // y co-ord of Window

      pos.style.setProperty('--x', (x - viewportLeft) + 'px');
      pos.style.setProperty('--y', (y - viewportTop) + 'px');

      if(light == "on"){
        light = "off";

        var fuseSound = new Audio("audio/Security/fuseSound.wav");
        fuseSound.play();

      }
    }
    }


    //When returning from wires back to main room
    function backToSecurity(){
      var boxSound = new Audio("audio/Security/wiresBox.wav");
      boxSound.play();

      if((cluesFound > currentClues) || (cluesFound = 3)){
        doorbutton.style.display = "block";
      }
      var image = document.getElementById("roomImg");
      image.src="images/Security/ControlRoom (WIP).jpg";
      image.alt="Main Security Room";

      //Show all main buttons

      if(comboLock == false){
      document.getElementById("firstbutton").style.display = "block";
      document.getElementById("secondbutton").style.display = "block";
      document.getElementById("thirdbutton").style.display = "block";
    }

      document.getElementById("wiresbutton").style.display = "block";
      document.getElementById("noteModal").style.display = "block";


      //Hide Wires Elements
      document.getElementById("backButton").style.display = "none";
      document.getElementById("leftWire").style.display = "none";
      document.getElementById("passcodeLock").style.display="none";
      document.getElementById("melModalButton").style.display="none";

    }

    //Everytime a key is entered in passcode
    function passwordEntered(){
      var textbox = document.getElementById("passcodeLock");
      var currentPassword = textbox.value.toUpperCase();
      if (currentPassword.length >= 3 && passcode == false){
        if(currentPassword.toUpperCase().trim() == "MEL"){
          passcode = true;
          cluesFound++;

          textbox.readOnly = true;
          switch (cluesFound) {
            case 1:
              cluesText = " <br> -Clues found(" + cluesFound + "/3) 1 of the door's locks have been disabled-";
              break;
            case 2:
              cluesText = " <br> -Clues found(" + cluesFound + "/3) You hear another mechanism shifting behind the wall...-";
              break;
            case 3:
              cluesText = " <br> -Clues found(" + cluesFound + "/3) The last lock has been disabled-";
              break;
            default:
              alert("Error in clues found switch JS password Entered");
              break;
          }
          //Play door noise and display correct message
          writeText('<span style = font-weight:bold;> ['+  playerName +'] </span>' + "That password was correct...", cluesText);
          var mechSound = new Audio('audio/Security/doorMech.wav');
          mechSound.play();
        }
        //When the password is incorrect
        else{
          //Clear Textbox
          textbox.value = "";
          wrongTimes++;
          //Play error sound
          var errorSound = new Audio('audio/Security/error.wav');
          errorSound.play();
          var isSquare = Number.isInteger(Math.sqrt(wrongTimes));

          //Output wrong password only once every square number
          if(isSquare){
            if(Math.sqrt(wrongTimes)%2 === 1)
            writeText('<span style = font-weight:bold;> ['+  playerName +'] </span>' + "That password was incorrect. Maybe there is a clue somewhere...", "");
          }


        }
      }
  }

  //Change button border to be easier to see once toggle theme is entered
  function buttonBorder(){
    if(colour == 0){
      colour = 1;
      document.getElementById("firstbutton").style.border = "black 1px solid";
      document.getElementById("secondbutton").style.border = "black 1px solid";
      document.getElementById("thirdbutton").style.border = "black 1px solid";
      document.getElementById("wiresbutton").style.border = "black 1px solid";
      document.getElementById("noteModal").style.border = "black 1px solid";
      document.getElementById("backButton").style.border = "black 1px solid";
      document.getElementById("leftWire").style.border = "black 1px solid";
      document.getElementById("passcodeLock").style.border = "black 1px solid";
      document.getElementById("doorbutton").style.border = "black 1px solid";
      document.getElementById("melModalButton").style.border = "black 1px solid";
    }
    else{
      colour = 0;
      document.getElementById("firstbutton").style.border = "none";
      document.getElementById("secondbutton").style.border = "none";
      document.getElementById("thirdbutton").style.border = "none";
      document.getElementById("wiresbutton").style.border = "none";
      document.getElementById("noteModal").style.border = "none";
      document.getElementById("backButton").style.border = "none";
      document.getElementById("leftWire").style.border = "none";
      document.getElementById("passcodeLock").style.border = "none";
      document.getElementById("doorbutton").style.border = "none";
      document.getElementById("melModalButton").style.border = "none";

    }
  }
