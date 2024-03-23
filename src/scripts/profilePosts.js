import { User } from './classes/User.js';
import { Post } from './classes/Post.js';
import { Image } from './classes/Image.js';

const postsSection = document.getElementById('posts');

function getUserData() {
    const imageUrl = localStorage.getItem("userImage");
    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    var posts = [];
    if (localStorage.getItem('posts')) {
        posts = Post.parse(localStorage.getItem('posts'))
    }

    return {
        imageUrl: imageUrl,
        name: name,
        email: email,
        posts: posts
    };
}

// Function to update profile bar with user data
function updateProfile() {
    const userData = getUserData();
    if (userData) {
        document.querySelector(".profileImage").src = userData.imageUrl;
        document.getElementById("user_name").innerText = userData.name;
        document.getElementById("imgprofile").src = userData.imageUrl;
        document.getElementById("profileImg").src = userData.imageUrl;
        Post.restoreAll(userData.posts, postsSection);

        // Extracting the username part from the email
        const emailParts = userData.email.split("@");
        const username = "@" + emailParts[0];
        document.getElementById("user_email").innerText = username;
        document.getElementById("email").innerText = username;
        document.getElementById("username-header").innerText = userData.name;
        document.getElementById("username-main").innerText = userData.name;
        document.getElementById("no-posts").innerText = `${userData.posts.length} Posts`;
        document.querySelector('input[name="name"]').value = userData.name;
        document.querySelector('input[name="location"]').value = "Alexandria, Egypt";
    }
}

// Call the updateProfile function to fill the data initially
document.addEventListener("DOMContentLoaded", function () {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const atIndex = userEmail.indexOf("@");
    const email = userEmail.substring(0, atIndex);
    const userImage = localStorage.getItem('userImage');
    const posts = localStorage.getItem('posts');

    updateProfile();

    document.getElementById('imageUpload').addEventListener('change', async (event) => {
        const file = event.target.files[0];
        const img = new Image(file);
        await img.upload();
        user.img = img.url;
        localStorage.setItem('user', JSON.stringify(user.toJSON()));
        localStorage.setItem('userImage', img.url);
    });

    if (localStorage.getItem('posts')) {
        const posts = Post.parse(localStorage.getItem('posts'));
        Post.restoreAll(posts, postsSection);
    }
    document.getElementById('username-main').innerText = userName;
    document.getElementById('user-details-main').children[1].innerText = email;
    document.getElementById('profileImageUser').src = userImage;
    document.querySelector('.profile-image img').src = userImage;
    document.querySelector('.modal .profile-image img').src = userImage;
    document.getElementById('no-posts').innerText = `${posts.length} Posts`;
    document.getElementById('username-header').innerText = userName;
});
