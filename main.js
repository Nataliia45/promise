function searchPost() {
    const postId = document.getElementById('postId').value;
    if (!postId || postId < 1 || postId > 100) {
        alert("Please enter a valid post ID (1-100).");
        return;
    }

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch post.');
            }
            return response.json();
        })
        .then(post => {
            const postContainer = document.getElementById('postContainer');
            postContainer.innerHTML = `
                <div>
                    <h2>Post Title: ${post.title}</h2>
                    <p>${post.body}</p>
                    <button onclick="fetchComments(${postId})">Get Comments</button>
                    <div id="commentsContainer"></div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch post. Please try again.');
        });
}

function fetchComments(postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch comments.');
            }
            return response.json();
        })
        .then(comments => {
            const commentsContainer = document.getElementById('commentsContainer');
            commentsContainer.innerHTML = `
                <h3>Comments:</h3>
                <ul>
                    ${comments.map(comment => `<li>${comment.body}</li>`).join('')}
                </ul>
            `;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch comments. Please try again.');
        });
}