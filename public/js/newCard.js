document.querySelector('#newCardForm').addEventListener("submit", event => {
    event.preventDefault();
    const fetchObj = {
        event_name: document.querySelector('#newCardName').value,
        event_des: document.querySelector('#newCardDescription').value,
    }
    fetch('/api/cards', {
        method: "POST",
        body: JSON.stringify(fetchObj),
        header: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        console.log(res);
        if(res.ok) {
            console.log("Created a new card!")
            location.reload();
        } else {
            alert('Failed to create card.')
        }
    })
});

delBtns.forEach(button=> {
    button.addEventListener("click", () => {
        const idToDel = button.getAttribute('data-id');
        console.log(idToDel)
        fetch(`/api/cards/${idToDel}`, {
            method: "DELETE"
        }).then(res => {
            console.log(res);
        if(!res.ok) {
            alert("No card to delete")
        } else {
            alert("Card Annihilation Commenced.")
        }
        location.reload();
        })
    })
})