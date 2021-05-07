// const { json } = require("sequelize/types");
const newComment = document.querySelector('#newCommentForm');
const delBtns = document.querySelectorAll(".commentDelBtn");
const delBtns2 = document.querySelectorAll(".cardDelBtn");


newComment.addEventListener("submit", event => {
    event.preventDefault();
    const textarea = document.querySelector("#newComment");
    const fetchObj = {
        content: textarea.value,
    }
    const dataid = textarea.getAttribute("data-id");
    axios.post(`/api/comments/${dataid}`, fetchObj)
    .then((data) => {
        console.log(data);
        location.reload();
    }).catch(console.log)
});
//Buttons for deleting comments
delBtns.forEach(button=> {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const idToDel = button.getAttribute('data-id');
        console.log(idToDel)
        fetch(`/api/comments/${idToDel}`, {
            method: "DELETE"
        }).then(res => {
            console.log(res);
            console.log(idToDel)
        if(!res.ok) {
            alert("No comment to delete")
            console.log(res)
        } else {
            alert("Congrats you played yaself")
        }
        location.reload();
        })
    })
});

//Buttons for deleting cards
delBtns2.forEach(button=> {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const idToDel = button.getAttribute('data-id');
        console.log(idToDel)
        fetch(`/api/cards/${idToDel}`, {
            method: "DELETE"
        }).then(res => {
        if(!res.ok) {
            alert("No card to delete")
        } else {
            console.log(res)
            location.replace('/profile');
            alert("Congrats you played yaself")
        }
        })
    })
});
//     fetch(`/api/comments/:id`, {
//         method: "POST",
//         body: JSON.stringify(fetchObj),
//         // header: {
//         //     "Content-Type": "application/json"
//         // }
//     }).then(res => {
//         console.log(res);
//         if(res.ok) {
//             console.log("Added comment!")
//         } 
//         if(err) {
//             console.log(err);
//         }
//         else {
//             alert('Failed to add comment.')
//         }
//     })
