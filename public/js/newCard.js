document.querySelector('#newCardForm').addEventListener("submit", event => {
    event.preventDefault();
    const eventName = document.querySelector('#newCardName');
    const eventDescription = document.querySelector('#newCardDescription');
    const eventTime = document.querySelector('#newCardTime');
    const cardImg = document.querySelector('#uploadedImageUrl')
    
    const fetchObj = {     
        event_name: eventName.value,
        event_description: eventDescription.value,
        event_time: eventTime.value,
        image_path: cardImg.value,
    }

    console.log('fetchObj: ',fetchObj)

    axios.post(`/api/cards/`, fetchObj)
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