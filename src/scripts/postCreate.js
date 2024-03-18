"use strict";

import { User } from "../scripts/classes/User.js";
import { Post } from "../scripts/classes/Post.js";
const user = User.parse(localStorage.getItem('user'));
const postsSection = document.querySelector('.posts-section');
const postBtn = document.querySelector('.postBtn');
const posts = Post.parse(localStorage.getItem('posts'))

Post.restoreAll(posts, postsSection);

function addPost() {
    const postText = document.querySelector('.postText').value;
    const post = new Post(user.name, postText);
    post.create();
    post.append(postsSection);
    if (!localStorage.getItem('posts')) {
        localStorage.setItem('posts', JSON.stringify([post]));
        return;
    }
    const postsJson = localStorage.getItem('posts');
    const postsArray = JSON.parse(postsJson);
    postsArray.push(post);
    localStorage.setItem('posts', JSON.stringify(postsArray));
}


postBtn.addEventListener('click', addPost);


