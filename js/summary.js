//restart - sets al session storage times to 0
function restart(){

  sessionStorage.setItem("cellTime", 0);
  sessionStorage.setItem("labTime", 0);
  sessionStorage.setItem("hallwayTime", 0);
  sessionStorage.setItem("securityTime", 0);
  sessionStorage.setItem("exitTime", 0);

  sessionStorage.setItem("timeleft", 0);
  window.location.href = 'start.html';
}

//indicates the game stats to be displayed to the user
function gameMode(){
  //gets the personalisation of user data
  var winGame = sessionStorage.getItem("winGame");
  //used for win/lose to be displayed
  var roomName = document.getElementById('roomName');
  var traitOutput = document.getElementById('trait');
  //resets time passed
  sessionStorage.setItem("timePassed", 0);
  var playerName = sessionStorage.getItem("subject");
  var trait = sessionStorage.getItem("cTrait");

  if(winGame=="win"){
    document.getElementById("doctor").src = "images/Summary/YouWinExit.jpg";
    roomName.innerHTML = 'You Won! Well done <span class="player">' + playerName + '</span>!';
    traitOutput.innerHTML = 'Well done <span class="player">' + playerName + '</span>. You won thanks to your incredible display of ';

    //outputs user's selected trait for personalisation
    switch(trait) {
      case 'intelligent':
        traitOutput.innerHTML += "intelligence.";
      break;
      case 'cautious':
        traitOutput.innerHTML += "cautiousness.";
      break;
      case 'courageous':
        traitOutput.innerHTML += "courage.";
      break;
      default:
      traitOutput.innerHTML +='wit';
    }

  }else{

    //outputs user's selected trait for personalisation
    switch(trait) {
      case 'intelligent':
        traitOutput.innerHTML += "Thinking through all the possibilities has costed you too much time.";
      break;
      case 'cautious':
        traitOutput.innerHTML += "Being too cautious has costed too much of your time.";
      break;
      case 'courageous':
        traitOutput.innerHTML += "You were courageous but the lack of forward planning costed you time you couldn't afford to lose.";
      break;
      default:
      traitOutput.innerHTML +='You have lost due your wit';
    }

    document.getElementById("doctor").src="images/Summary/Doctor.jpg";
    roomName.innerHTML = 'You Lost! Better luck next time <span class="player">' + playerName + '</span>!';
  }

  //gets times spent in each room from the session storage
  var cellTime = sessionStorage.getItem("cellTime");
  var labTime = sessionStorage.getItem("labTime");
  var hallwayTime = sessionStorage.getItem("hallwayTime");
  var securityTime =   sessionStorage.getItem("securityTime");
  var exitTime = sessionStorage.getItem("exitTime");
  var subjectName = sessionStorage.getItem("subject");

  var tbl = document.getElementById('stats');

  var rows = tbl.rows.length;

  //checks through each time spent in roomItem
  //checks if null or 0 - then user has died in that room - output which room they died inspect
  //it will display the user's time spent in the rooms before as they must complete the first room to get to the second (etc)
  if(cellTime!=0 && cellTime!=null){
    //if user has passed the first room the table is displayed to the user
    tbl.style.display="block";

    //inserts data via rows into the table to be displayed
    var row = tbl.insertRow(rows);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "Cell Time";
    cell2.innerHTML = cellTime;

    rows = tbl.rows.length;
    if(labTime!=0 && labTime!=null){
      var row = tbl.insertRow(rows);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = "Lab Time";
      cell2.innerHTML = labTime;

      rows = tbl.rows.length;
      if(hallwayTime!=0 && hallwayTime!=null){
        var row = tbl.insertRow(rows);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = "Hallway Time";
        cell2.innerHTML = hallwayTime;

        rows = tbl.rows.length;
        if(securityTime!=0 && securityTime!=null){
          var row = tbl.insertRow(rows);
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          cell1.innerHTML = "Security Time";
          cell2.innerHTML = securityTime;
          rows = tbl.rows.length;

          if(exitTime!=0 && exitTime!=null){
            var row = tbl.insertRow(rows);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = "Exit Time";
            cell2.innerHTML = exitTime;

            var totalTimeTaken = Number(cellTime)+Number(labTime)+Number(hallwayTime)+ Number(securityTime)+Number(exitTime) + ' seconds';
            document.getElementById('totalTime').innerHTML = 'The total time you took was: ' + totalTimeTaken;

          }else{
            document.getElementById('noTimes').innerHTML="You lost in the Final Room!"
          }
        }else{
          document.getElementById('noTimes').innerHTML="You lost in Security (4th Room)!"
        }
      }else{
        document.getElementById('noTimes').innerHTML="You lost in the Hallway (3rd Room)!"
      }
    }else{
      document.getElementById('noTimes').innerHTML="You lost in the Laboratory (2nd Room)!"
    }
  }else{
    document.getElementById('noTimes').innerHTML="You lost in the Cell (1st Room)!"
  }
}

//Event listener so user can click on the screen and sound is played to indicate win/lose.
window.addEventListener("click", function(event) {
  var winGame = sessionStorage.getItem("winGame");
  if(winGame=="win"){
    sound = document.getElementById('youWin');
  }else{
    sound = document.getElementById('youLose');
  }

  let play = document.getElementById('play')

  sound.play();
});


function summaryTheme(){
toggleColours();

var x = document.getElementById("stats");
if (roomName.style.color === 'black') {
  for (let row of x.rows)
  {
      for(let cell of row.cells)
      {
        cell.style.borderColor="black";
      }
  }
} else {
  for (let row of x.rows)
  {
      for(let cell of row.cells)
      {
        cell.style.borderColor="white";
      }
  }
}

}
