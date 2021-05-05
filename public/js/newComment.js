// const { json } = require("sequelize/types");

document.querySelector('#newCommentForm').addEventListener("submit", event => {
    event.preventDefault();
    const textarea = document.querySelector("#newComment");
    const fetchObj = {
        content: textarea.value,
    }
    axios.post(`/api/comments/${textarea.getAttribute("data-id")}`, fetchObj)
    .then((data) => {
        console.log(data);
        location.reload();
    }).catch(console.log)
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
});
