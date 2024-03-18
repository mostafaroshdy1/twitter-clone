"use strict";

import { User } from "../scripts/classes/User.js";
import { Post } from "../scripts/classes/Post.js";
const user = User.parse(localStorage.getItem('user'));
const postText = document.querySelector('.postText').value;
const postsSection = document.querySelector('.posts-section');
const postBtn = document.querySelector('.postBtn');



function addPost() {
    const post = new Post(user.name, postText);
    post.create();
    post.append(postsSection);
}


postBtn.addEventListener('click', addPost);
