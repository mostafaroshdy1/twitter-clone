import { User } from './classes/User.js';
import { Post } from './classes/Post.js';
import { Image } from './classes/Image.js';


const postsSection = document.getElementById('posts');



if (localStorage.getItem('posts')) {
    const posts = Post.parse(localStorage.getItem('posts'))
    Post.restoreAll(posts, postsSection);
}

const user = User.parse(localStorage.getItem('user'));

document.getElementById('imageUpload').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    const img = new Image(file);
    await img.upload();
    user.img = img.url;
    localStorage.setItem('user', JSON.stringify(user.toJSON()));
    localStorage.setItem('imageUrl', img.url);
});

if (localStorage.getItem('posts')) {
    const posts = Post.parse(localStorage.getItem('posts'));
    Post.restoreAll(posts, postsSection);
}