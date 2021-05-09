

document.querySelector('#editCardForm').addEventListener("submit", event => {
    event.preventDefault();
    const eventName = document.querySelector('#editCardName');
    const eventDescription = document.querySelector('#editCardDescription');
    const eventTime = document.querySelector('#editCardTime');
    const thisPost = document.querySelector('.sideCard')
    // console.log(thisPost.id);
    // let cardImg = document.querySelector('#uploadedImageUrl')
    // if (cardImg === null) {
    //     cardImg = "";
    // } 
    const fetchObj = {
        event_name: eventName.value,
        event_description: eventDescription.value,
        event_time: eventTime.value,
        // image_path: cardImg?.value,
    }
    console.log('fetchObj: ',fetchObj)

    axios.put(`/api/cards/${thisPost.id}`, fetchObj)
    .then((data) => {
        console.log(data);
        // location.reload();
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