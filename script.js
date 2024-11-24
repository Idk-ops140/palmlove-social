let users = []; // This will hold user account data
let userStatuses = {}; // Stores the status (banned/terminated) of users
let posts = []; // Tracks posts created by users
const ADMIN_USERNAME = "CountryballMations";
const ADMIN_SECRET_CODE = "1006";
let currentUser = null;

function loadCurrentUser() {
    const rememberedUsername = localStorage.getItem("rememberedUsername");
    if (rememberedUsername) {
        loginUser(rememberedUsername);
    }
}

// Simulates user login
function loginUser(username) {
    const user = users.find(u => u.username === username);
    if (user) {
        currentUser = user.username;
        document.getElementById("currentUsername").textContent = currentUser;
        document.getElementById("userDisplay").style.display = "block";
        document.getElementById("login").style.display = "none";
        document.getElementById("postSection").style.display = "block";
        displayPosts();

        if (document.getElementById("rememberMe").checked) {
            localStorage.setItem("rememberedUsername", currentUser);
        }
        alert(`Welcome back, ${currentUser}!`);
        return true;
    }
    alert("Login failed.");
    return false;
}

function logoutUser() {
    currentUser = null;
    document.getElementById("userDisplay").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("postSection").style.display = "none";
    localStorage.removeItem("rememberedUsername");
    alert("You have logged out.");
}

document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if(userStatuses[username] === 'terminated') {
        alert("Your account has been terminated. You cannot sign up again.");
        return;
    }
    
    if (users.find(u => u.username === username)) {
        alert("Username already exists. Please choose a different one.");
        return;
    }

    users.push({ username, email, password }); // Simulate user storage
    userStatuses[username] = 'active'; // Set user status to active
    alert(`Welcome, ${username}! Your account has been created.`);
    document.getElementById('signupForm').reset();
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (userStatuses[username] === 'terminated') {
        alert("Your account has been terminated. You cannot login.");
        return;
    } else if (userStatuses[username] === 'banned') {
        alert("Your account is banned. You cannot login for 3 days.");
        return;
    }

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        currentUser = username;
        document.getElementById("currentUsername").textContent = currentUser;
        document.getElementById("userDisplay").style.display = "block";
        document.getElementById("login").style.display = "none";
        document.getElementById("postSection").style.display = "block";
        displayPosts();

        if (document.getElementById("rememberMe").checked) {
            localStorage.setItem("rememberedUsername", currentUser);
        }
        alert(`Welcome back, ${currentUser}!`);
        return true;
    } else {
        alert("Invalid username or password.");
    }
});

// Handle logout
document.getElementById("logoutButton").addEventListener("click", logoutUser);

// Post creation logic
document.getElementById('postButton').addEventListener('click', function() {
    const content = document.getElementById('postContent').value;

    if (content) {
        const newPost = { content, author: currentUser, likes: 0 };
        posts.push(newPost);
        displayPosts();
        document.getElementById('postContent').value = ''; // Clear post input
    } else {
        alert("You must write something.");
    }
});

// Function to display posts
function displayPosts() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <p>${post.content} <strong>by ${post.author}</strong></p>
            <button class="like-button" data-index="${index}">Like (${post.likes})</button>
            ${post.author === currentUser ? `<button class="delete-button" data-index="${index}">Delete</button>` : ''}
        `;
        postsContainer.appendChild(postDiv);
    });
}

// Handle post likes
document.getElementById('posts-container').addEventListener('click', function(e) {
    if (e.target.classList.contains('like-button')) {
        const index = e.target.dataset.index;
        posts[index].likes += 1; // Increment like count
        displayPosts(); // Refresh the post display
    }

    if (e.target.classList.contains('delete-button')) {
        const index = e.target.dataset.index;
        posts.splice(index, 1); // Remove the post from the array
        displayPosts(); // Refresh the post display
    }
});

// Admin secret code verification
document.getElementById('verifyAdmin').addEventListener('click', function() {
    const enteredCode = document.getElementById('secretCode').value;
    if (enteredCode === ADMIN_SECRET_CODE) {
        alert("Admin access granted.");
        // Add any admin-specific logic here, e.g., deleting posts or managing users
    } else {
        alert("Invalid secret code.");
    }
});

// Load the current user on page load
loadCurrentUser();
