document.querySelector('#newCommentForm').addEventListener("submit", event => {
    event.preventDefault();
    const fetchObj = {
        content: document.querySelector('#newComment').value,
    }
    fetch('/api/comments', {
        method: "POST",
        body: JSON.stringify(fetchObj),
        header: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        console.log(res);
        if(res.ok) {
            console.log("Added comment!")
            location.reload();
        } else {
            alert('Failed to add comment.')
        }
    })
});

delBtns.forEach(button=> {
    button.addEventListener("click", () => {
        const idToDel = button.getAttribute('data-id');
        console.log(idToDel)
        fetch(`/api/comments/${idToDel}`, {
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