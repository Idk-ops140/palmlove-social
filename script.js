document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    alert(`Welcome, ${username}! Your account has been created.`);

    // Clear the form
    document.getElementById('signupForm').reset();
});

// Placeholder function to simulate posts
function addPost(content) {
    const postsContainer = document.getElementById('posts-container');
    const post = document.createElement('div');
    post.className = 'post';
    post.textContent = content;
    postsContainer.appendChild(post);
}

// Example post addition, this would be replaced with actual feed logic
addPost("Just finished my latest digital art timelapser! 🎨");
addPost("Exploring hidden gems in Tokyo! 🗼✨");
