import { User } from './classes/User.js';
import { Post } from './classes/Post.js';


const postsJson = localStorage.getItem('posts');
// const user = User.parse(postsJson);

const posts = Post.parse(postsJson);
var postsSection = document.getElementById('posts');
console.log(posts);
posts.restoreAll(posts, postsSection);
