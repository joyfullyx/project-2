// const { json } = require("sequelize/types");
const newComment = document.querySelector('#newCommentForm');
const delComBtns = document.querySelectorAll(".commentDelBtn");
const delCardBtns = document.querySelectorAll(".cardDelBtn");
const editComBtns = document.querySelectorAll(".editComBtn");
const commitEditBtn = document.querySelector('.editComBtnCommit');

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
delComBtns.forEach(button=> {
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
delCardBtns.forEach(button=> {
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

editComBtns.forEach(button => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const textarea = document.querySelector('#editComment');
        const postedComments = document.querySelector('#commentContainer');
        const editBlock = document.querySelector('#editCommentBlock');
        const idToEdit = button.getAttribute('data-id');
        const editBtn = document.querySelector('.editComBtn');

        
        console.log(idToEdit);
        postedComments.setAttribute("style", "display: none");
        editBlock.setAttribute("style", "display: flex");
        editBtn.setAttribute('style', "display: none");
        commitEditBtn.setAttribute('style', "display: flex");

        axios.get(`/api/comments/${idToEdit}`)
        .then((data) => {
            const commentText = data.data.content;
            textarea.value += commentText;
            console.log(data);
            console.log(data.data.content);
        }).catch(console.log)
    })
});


commitEditBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const textarea = document.querySelector('#editComment');
        const postedComments = document.querySelector('#commentContainer');
        const editBlock = document.querySelector('#editCommentBlock');
        const editBtn = document.querySelector('.editComBtn');
        const idToEdit = editBtn.getAttribute('data-id');

        console.log(idToEdit);
        postedComments.setAttribute("style", "display: flex");
        editBlock.setAttribute("style", "display: none");
        editBtn.setAttribute('style', "display: flex");
        commitEditBtn.setAttribute('style', "display: none");

        const fetchObj = {
            content: textarea.value,
        }
        console.log("this be da fetch", fetchObj);
        axios.put(`/api/comments/${idToEdit}`, fetchObj)
        .then((data) => {
            console.log("this be the data", data);
            location.reload();
        }).catch(console.log)
    })
