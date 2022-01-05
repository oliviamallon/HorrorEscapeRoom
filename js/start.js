document.addEventListener('click', musicPlay);
function musicPlay() {
    var amb = new Audio('audio/Lab/Ambience.mp3');
    amb.play();
    document.removeEventListener('click', musicPlay);
}

function saveData() {

  if(document.getElementById("subject").value.length == 0)
  {
    alert('You must enter a subject name');
  }
  else{

  var nameInput = document.getElementById("subject").value;
  var text = document.getElementById("cTrait").value;

  sessionStorage.setItem("subject", nameInput);
  sessionStorage.setItem("cTrait", text);

  window.location.href = 'cell.html';
}

}
