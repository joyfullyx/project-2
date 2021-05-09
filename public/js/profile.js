// Get the modal
var modal = document.getElementById("createCardModal");

// Get the button that opens the modal
var btn = document.getElementById("createCard");

var postbtn = document.getElementById("newCardPost");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    console.log('click');
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

postbtn.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var myCard = document.getElementsByClassName("myCard")
console.log(myCard);

myCard.onclick = function() {
  console.log('click');
};

openCard = document.querySelectorAll(".myCard");
delCard = document.querySelectorAll(".myCardDelete");


openCard.forEach(button=> {
  button.addEventListener("click", (event) => {
      event.preventDefault();
      const idToOpen = button.getAttribute('id');
      location.replace(`/cards/${idToOpen}`);
  })
});

delCard.forEach(button=> {
  button.addEventListener("click", (event) => {
      event.preventDefault();
      // console.log(delCard);
      const idToDelete = button.getAttribute('id');
      console.log(idToDelete);
      // location.replace(`/cards/${idToOpen}`);

      
      fetch(`/api/cards/${idToDelete}`, {
          method: "DELETE"
      }).then(res => {
      if(!res.ok) {
          // alert("No card exists")
      } else {
          console.log(res)
          // alert("card deleted")
          location.reload();
      }
      })
  })
});