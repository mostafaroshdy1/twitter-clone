"use strict";

import { User } from "./classes/User.js";
import { Post } from "./classes/Post.js";
import { Image } from "./classes/Image.js";

let postImage = null;
const user = User.parse(localStorage.getItem('user'));
const postsSection = document.querySelector('.posts-section');
const postBtn = document.querySelector('.postBtn');
const imageContainer = document.getElementById('imageContainer');
if (localStorage.getItem('posts')) {
    const posts = Post.parse(localStorage.getItem('posts'))
    console.log('Hello', posts);
    Post.restoreAll(posts, postsSection);
}

async function addPost() {
    const postText = document.querySelector('.postText').value;
    if (postText == "") {
        return;
    }
    const id = JSON.parse(localStorage.getItem('posts')) ? JSON.parse(localStorage.getItem('posts')).length++ : 0;
    const post = new Post(user.name, postText, id);
    if (postImage) {
        post.imgUrl = await uploadImage(postImage);
        imageContainer.classList.toggle('d-none'); // to hide the image

    }
    post.create();
    post.prepend(postsSection);
    if (!localStorage.getItem('posts')) {
        localStorage.setItem('posts', JSON.stringify([post]));
        return;
    }
    const postsJson = localStorage.getItem('posts');
    const postsArray = JSON.parse(postsJson);
    postsArray.push(post);
    localStorage.setItem('posts', JSON.stringify(postsArray));
    document.querySelector('.postText').value = ''; // to clear the text

}

postBtn.addEventListener('click', addPost);

document.getElementById('fileUpload').addEventListener('change', async (event) => {
    postImage = event.target.files[0];
});

async function uploadImage(postImage) {
    const img = new Image(postImage);
    await img.upload();
    return img.url;
}

document.getElementById('fileUpload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) return; // No file selected

    const uploadedImage = document.getElementById('uploadedImage');
    // Read the selected file as a data URL
    const reader = new FileReader();
    reader.onload = function (event) {
        // Set the src attribute of the image to the data URL
        uploadedImage.src = event.target.result;
        imageContainer.classList.toggle('d-none'); // Show the image container
    };
    reader.readAsDataURL(file);
});
