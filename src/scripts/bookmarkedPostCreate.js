"use strict";

import { Post } from "./classes/Post.js";

const bookmarksSection = document.querySelector('.bookmarks-section');

if (localStorage.getItem('user')) {
    const parsedUser = JSON.parse(localStorage.getItem('user'));
    if (parsedUser.hasOwnProperty('bookmarks')) {
        const bookmarkedPosts = parsedUser['bookmarks']; 
        Post.restoreAll(bookmarkedPosts, bookmarksSection); 
    } else {
        console.log('User object does not contain bookmarks.');
    }
}