let comments = [];

function addComment() {
    const commentText = document.getElementById('comment').value;
    const date = new Date().toLocaleString();
    const comment = { text: commentText, date: date };
    comments.push(comment);
    displayComments();
document.getElementById('comment').value = '';
}

function sortComments(order) {
    const commentsContainer = document.getElementById('comments');

    const commentsArray = Array.from(commentsContainer.children);

    if (order == 'asc') {
        commentsArray.sort(function(a, b) {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return dateA - dateB;
        });
    } else {
        commentsArray.sort(function(a, b) {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return dateB - dateA;
        });
    }

    commentsArray.forEach(function(commentElement) {
        commentsContainer.appendChild(commentElement);
    });
}

function displayComments() {
    const commentsContainer = document.getElementById('comments');
    const date = new Date().toLocaleString();
    const comment = comments[comments.length - 1];
    const li = document.createElement('li');

    li.className = 'comment';
    li.dataset.date = date;  
    li.textContent = `${comment.text} - ${date}`;
    
    commentsContainer.appendChild(li);
}
