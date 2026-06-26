const API = "http://localhost:5000";

// ====================
// CREATE USER
// ====================

async function createUser() {

    const username =
    document.getElementById("username").value;

    const profilePic =
    document.getElementById("profilePic").value;

    if (!username) {
        alert("Enter Username");
        return;
    }

    await fetch(API + "/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username,
            profilePic
        })

    });

    document.getElementById("username").value = "";
    document.getElementById("profilePic").value = "";

    loadUsers();
}


// ====================
// LOAD USERS
// ====================

async function loadUsers() {

    const res =
    await fetch(API + "/users");

    const users =
    await res.json();

    let html = "";

    users.forEach(user => {

        html += `
        <div class="user-card">

            <img src="${user.profilePic}" alt="profile">

            <h3>${user.username}</h3>

            <p>Followers: ${user.followers}</p>

            <button onclick="followUser('${user._id}')">
                Follow
            </button>

        </div>
        `;
    });

    document.getElementById("users").innerHTML = html;
}


// ====================
// FOLLOW USER
// ====================

async function followUser(id) {

    await fetch(API + "/follow/" + id, {
        method: "PUT"
    });

    loadUsers();
}


// ====================
// CREATE POST
// ====================

async function createPost() {

    const username =
    document.getElementById("postUser").value;

    const content =
    document.getElementById("postContent").value;

    if (!username || !content) {
        alert("Fill all fields");
        return;
    }

    await fetch(API + "/post", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username,
            content
        })

    });

    document.getElementById("postContent").value = "";

    loadPosts();
}


// ====================
// LOAD POSTS
// ====================

async function loadPosts() {

    const res =
    await fetch(API + "/posts");

    const posts =
    await res.json();

    let html = "";

    posts.forEach(post => {

        html += `
        <div class="post-card">

            <h3>${post.username}</h3>

            <p>${post.content}</p>

            <p class="time">
                ${new Date(post.createdAt)
                    .toLocaleString()}
            </p>

            <div class="actions">

                <button onclick="likePost('${post._id}')">
                    ❤️ ${post.likes}
                </button>

                <button onclick="commentPost('${post._id}')">
                    💬 Comment
                </button>

            </div>

            <div class="comment-box">

                ${post.comments.map(
                    c => `<div class="comment">${c.text}</div>`
                ).join("")}

            </div>

        </div>
        `;
    });

    document.getElementById("posts").innerHTML = html;
}


// ====================
// LIKE POST
// ====================

async function likePost(id) {

    await fetch(API + "/like/" + id, {
        method: "PUT"
    });

    loadPosts();
}


// ====================
// COMMENT POST
// ====================

async function commentPost(id) {

    const text =
    prompt("Enter Comment");

    if (!text) return;

    await fetch(API + "/comment/" + id, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            text
        })

    });

    loadPosts();
}


// ====================
// INITIAL LOAD
// ====================

loadUsers();
loadPosts();