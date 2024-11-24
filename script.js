let users = []; // This will hold user account data
let userStatuses = {}; // Stores the status (banned/terminated) of users
const ADMIN_USERNAME = "CountryballMations";
const ADMIN_SECRET_CODE = "1006";

document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if(userStatuses[username] === 'terminated') {
        alert("Your account has been terminated. You cannot sign up again.");
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

    // Check user status
    if (userStatuses[username] === 'terminated') {
        alert("Your account has been terminated. You cannot login.");
        return;
    } else if (userStatuses[username] === 'banned') {
        alert("Your account is banned. You cannot login for 3 days.");
        return;
    }

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        alert(`Welcome back, ${username}!`);
        document.getElementById('loginForm').reset();
        document.getElementById('postSection').style.display = 'block'; // Show post section
        
        // Show admin verification if the logged in user is the admin
        if (username === ADMIN_USERNAME) {
            document.getElementById('adminVerification').style.display = 'block';
        }
    } else {
        alert("Invalid username or password.");
    }
});

// Post creation logic
document.getElementById('postButton').addEventListener('click', function() {
    const content = document.getElementById('postContent').value;

    if (content) {
        addPost(content);
        document.getElementById('postContent').value = ''; // Clear post input
    } else {
        alert("You must write something.");
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

// Function to add a post to the feed
function addPost(content) {
    const postsContainer = document.getElementById('posts-container');
    const post = document.createElement('div');
    post.className = 'post';
    post.textContent = content;
    postsContainer.appendChild(post);
}

// Simulating a ban and termination for demonstration purposes
function banUser(username) {
    userStatuses[username] = 'banned';
    setTimeout(() => { userStatuses[username] = 'active'; }, 3 * 24 * 60 * 60 * 1000); // Unban after 3 days
}

function terminateUser(username) {
    userStatuses[username] = 'terminated';
}

// Example usage
banUser("exampleUser"); // Temporarily ban the user for demonstration
// terminateUser("anotherUser"); // Terminate account for demonstration
