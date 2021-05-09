var cardId;

editCardBtns.forEach((button) => {
  button.onclick = function() {
    const editName = document.querySelector('#editCardName');
    const textarea = document.querySelector('#editCardDescription');
    const idToEdit = button.getAttribute('data-id');

    console.log(this);
    console.log(idToEdit);
    editCardModal.style.display = "block";

    axios.get(`/api/cards/${idToEdit}`)
    .then((data) => {
      const cardName = data.data.event_name;
      const cardText = data.data.event_description;
      cardId = data.data.id;
      editName.value = cardName;
      textarea.value = cardText;
      console.log(cardId);  
    })
  }
})


document.querySelector('#editCardForm').addEventListener("submit", event => {
    event.preventDefault();
    const eventName = document.querySelector('#editCardName');
    const eventDescription = document.querySelector('#editCardDescription');
    const eventTime = document.querySelector('#editCardTime');
    const thisPost = document.querySelectorAll('.sideCard');

    thisPost.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            console.log(this);
        })
    })
    // console.log(thisPost.id);
    // let cardImg = document.querySelector('#uploadedImageUrl')
    // if (cardImg === null) {
    //     cardImg = "";
    // } 
    const fetchObj = {
        event_name: eventName.value,
        event_description: eventDescription.value,
    }
    console.log('fetchObj: ',fetchObj)
    console.log(thisPost);
    console.log(cardId);
    axios.put(`/api/cards/${cardId}`, fetchObj)
    .then((data) => {
        console.log(data);
        location.reload();
    }).catch(console.log)
    // fetch('/api/cards', {
    //     method: "POST",
    //     body: fetchObj,
    //     header: {
    //         "Content-Type": "application/json"
    //     }
    // }).then(res => {
    //     console.log(res);
    //     if(res.ok) {
    //         console.log("Created a new card!")
    //         location.reload();
    //     } else {
    //         alert('Failed to create card.')
    //         console.log(res);
    //     }
    // })
});

// delBtns.forEach(button=> {
//     button.addEventListener("click", () => {
//         const idToDel = button.getAttribute('data-id');
//         console.log(idToDel)
//         fetch(`/api/cards/${idToDel}`, {
//             method: "DELETE"
//         }).then(res => {
//             console.log(res);
//         if(!res.ok) {
//             alert("No card to delete")
//         } else {
//             alert("Card Annihilation Commenced.")
//         }
//         location.reload();
//         })
//     })
// })