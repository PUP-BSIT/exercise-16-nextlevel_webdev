function enableCommentButton() {
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;
    document.getElementById('comment_button').disabled = 
        !(name && comment);
}

document.getElementById('comment_form').addEventListener('input', 
    enableCommentButton);

function addComment(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;
    const timestamp = new Date().getTime();
    const commentList = document.getElementById('comment_list');

    const listItem = document.createElement('li');
    listItem.setAttribute('data-timestamp', timestamp);
    listItem.textContent = `Name: ${name}, Comment: ${comment}`;
    commentList.appendChild(listItem);

document.getElementById('comment_form').reset();
    }

document.getElementById('comment_form').addEventListener('submit', 
    addComment);

function sortComments(event) {
    const commentList = document.getElementById('comment_list');
    const comments = Array.from(commentList.children);

    comments.sort(function(a, b) {
        const timestampA = parseInt(a.getAttribute('data-timestamp'));
        const timestampB = parseInt(b.getAttribute('data-timestamp'));
    
        if (event.target.id == 'sort_asc') {
            return timestampA - timestampB;
        } else {
            return timestampB - timestampA;
        }
    });
    
    comments.forEach(function(comment) {
        commentList.appendChild(comment);
    });
}

document.getElementById('sort_asc').addEventListener('click', sortComments);
document.getElementById('sort_desc').addEventListener('click', sortComments);