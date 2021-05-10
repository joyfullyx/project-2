// Get and open modal for new card
var modal = document.getElementById("createCardModal");
var btn = document.getElementById("createCard");
var postbtn = document.getElementById("newCardPost");

var allBtn = document.getElementById("all");
var eventBtn = document.getElementById("1");
var volunteerBtn = document.getElementById("2");
var serviceBtn = document.getElementById("3");
var tradeBtn = document.getElementById("4");

allBtn.onclick = function() {
  allBtn.id = "test";
}


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var editSpan = document.getElementsByClassName("editClose")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
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

// -------------------------------------------------------------------------------------------

// Get and open modal for new card
var editCardModal = document.getElementById("editCardModal");
var editCardBtns = document.querySelectorAll("#editCardBtn");
var editCardPut = document.querySelector("#editCardPut");

// var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal

// let cardId = 0;
// editCardBtns.forEach((button) => {
//   button.onclick = function() {
//     const editName = document.querySelector('#editCardName');
//     const textarea = document.querySelector('#editCardDescription');
//     const idToEdit = button.getAttribute('data-id');

//     console.log(this);
//     console.log(idToEdit);
//     editCardModal.style.display = "block";

//     axios.get(`/api/cards/${idToEdit}`)
//     .then((data) => {
//       const cardName = data.data.event_name;
//       const cardText = data.data.event_description;
//       let cardId = data.data.id;
//       editName.value = cardName;
//       textarea.value = cardText;
//       console.log(cardId);  
//     })
//   }
// })


// When the user clicks on <span> (x), close the modal
editSpan.onclick = function() {
  console.log('edit close click');
  editCardModal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

// -------------------------------------------------------------------------------------------

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