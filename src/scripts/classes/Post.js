export { Post };

// import { User } from "./classes/User.js";

class Post {
    post;
    username;
    postText;
    imgUrl;
    id;
    comments;

    constructor(username, postText, id) {
        this.id = id++;
        this.username = username;
        this.postText = postText
        this.post = document.createElement('div');
        this.comments = [];
    }
    create() {
        this.post.classList.add(this.id);
        this.post.classList.add('post');
        // this.post.classList.add('border-top');
        this.post.classList.add('border-bottom');
        this.post.classList.add('border-dark');
        // this.post.classList.add('clickable');
        this.post.innerHTML = ` <div>
        <div class="row mt-4">
        <div class="col-1">
            <img src="../../public/images/user4.jpg" class="img-fluid rounded-circle img-thumbnail" style="max-width:40px;">
        </div>
        <div class="col-10 mt-3">
            <p class="fw-bold">${this.username}</p>
        </div>
    </div>
    <div class="row ">
        <div class="col-1"></div>
        <div class="col-10 d-flex justify-content-center flex-column">
            <p>${this.postText}</p>
            <img class="img-fluid rounded-5 ms-4 post-img" src="${this.imgUrl}" style="max-width: 600px; max-height: 600px;" alt="">
        </div>
    </div>
    </div>
    <div class="row interactions">
        <div class="d-flex mb-1 flex-column">
            <div class="d-flex w-100 sm my-2 justify-content-between">
                <div></div>
                <div class="${this.id} bi bi-chat btn commentBtn"></div>
                <div class=" bi bi-arrow-repeat btn"></div>
                <div class=" bi bi-heart btn"></div>
                <div class="bi bi-bookmark btn"></div>
                <div></div>
            </div>
        </div>
    </div>`;

        const bookmarkButton = this.post.querySelector('.bi-bookmark');
        bookmarkButton.addEventListener('click', () => {
            const currentUserJSON = localStorage.getItem('user');
            //console.log(currentUserJSON);
            if (currentUserJSON) {
                const currentUser = JSON.parse(currentUserJSON); // Parse JSON to get currentUser object
                const clickedPost = {
                    username: this.username,
                    postText: this.postText,
                    imgUrl: this.imgUrl
                };

                // console.log('clickedPost',clickedPost);
                //console.log('currentUser.bookmarks()',currentUser.bookmarks);

                const isBookmarked = currentUser.bookmarks.some(bookmarkedPost => {
                    return bookmarkedPost.username === clickedPost.username && bookmarkedPost.postText === clickedPost.postText;
                });


                if (isBookmarked) {
                    currentUser.bookmarks = currentUser.bookmarks.filter(bookmarkedPost => {
                        return !(bookmarkedPost.username === clickedPost.username && bookmarkedPost.postText === clickedPost.postText);
                    });
                    bookmarkButton.classList.add('bookmarked');
                    // bookmarkButton.classList.add('btn-primary');
                } else {
                    currentUser.bookmarks.push(clickedPost);
                    bookmarkButton.classList.remove('bookmarked');
                    // bookmarkButton.classList.remove('btn-primary');
                }

                localStorage.setItem('user', JSON.stringify(currentUser));
            } else {
                console.log('No user logged in.');
            }

            // Add a key to the posts object indicating whether the post is bookmarked or not
            const currentPostsJSON = localStorage.getItem('posts');

            if (currentPostsJSON && currentUserJSON) {
                const currentPosts = JSON.parse(currentPostsJSON);
                const currentUser = JSON.parse(currentUserJSON);
                const currentUserBookmarks = currentUser.bookmarks;

                console.log('bookmark', currentUserBookmarks);
                console.log('post', currentPosts);

                // Loop through each post in currentPosts
                Object.keys(currentPosts).forEach(postKey => {
                    const post = currentPosts[postKey];

                    // Check if the post matches any bookmark in currentUserBookmarks
                    const isBookmarked = currentUserBookmarks.some(bookmarkedPost => {
                        return bookmarkedPost.username === post.username && bookmarkedPost.postText === post.postText;
                    });

                    // If the post is bookmarked, add an extra key to mark it
                    if (isBookmarked) {
                        post.isBookmarked = true;
                    } else {
                        post.isBookmarked = false;
                    }
                });

                // Update the posts in local storage
                localStorage.setItem('posts', JSON.stringify(currentPosts));
                // localStorage.setItem('user', JSON.stringify(currentUser));
                // console.log(currentPosts);
            }
        });
    }

    prepend(element) {
        // console.log(this.post);
        // console.log(element);

        element.prepend(this.post);
    }

    static parse(json) {
        const data = JSON.parse(json);
        // console.log(data);
        const posts = []
        for (let i = 0; i < data.length; i++) {
            const post = new Post(data[i].username, data[i].postText, data[i].id)
            post.imgUrl = data[i].imgUrl;
            post.comments = data[i].comments;
            posts.push(post)
        }
        return posts;
    }

    static restoreAll(posts, postsSection) {
        for (let i = 0; i < posts.length; i++) {
            const post = new Post(posts[i].username, posts[i].postText);
            post.imgUrl = posts[i].imgUrl;
            post.id = posts[i].id;
            post.create();
            post.prepend(postsSection);
        }
    }
    static show(posts, id, postSection) {

        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id == id) {
                postSection.innerHTML = "";
                Post.restoreAll([posts[i]], postSection);
                postSection.insertAdjacentHTML('afterbegin', `
                <div class="container mb-3">
                    <div class="back-button mt-3">
                        <div>
                            <i class="material-icons-outlined ms-2 clickable backToPosts">arrow_back</i>
                            <h3 class="d-inline ms-3">Post</h3>
                        </div>
                    </div>
                </div>
            `);
                postSection.innerHTML += `
                <div class="row mt-3 border-bottom border-dark">
                <div class="col-9"> <!-- Adjust the width of the column accordingly -->
                    <div class="mb-3 d-flex align-items-start">
                        <img src="../../public/images/user4.jpg"
                            class="img-fluid rounded-circle img-thumbnail mr-3" style="max-width:40px;">
                        <div class="flex-grow-1">
                            <textarea class="form-control commentText fs-5" placeholder="Post your Reply"
                                id="floatingTextarea2" style="height: 40px;"></textarea>
                        </div>
                    </div>
                </div>
                <div class="col-3"> <!-- Adjust the width of the column accordingly -->
                    <button type="button" id="replied" class="btn btn-primary rounded-pill replyBtn">Reply</button>
                </div>
            </div>
        `;
            }
        }

    }
    comment(comment, username) {
        const commentTemp = `<div class="ms-0 p-0 border-bottom border-dark border-top">
        <div class="row mt-4">
            <div class="col-1">
                <img src="../../public/images/user4.jpg"
                    class="img-fluid rounded-circle img-thumbnail" style="max-width:40px;">
            </div>
            <div class="col-10 mt-3">
                <p class="fw-bold">${username}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
                <p>
                    ${comment}
                </p>
            </div>

        </div>
    </div>`
        this.comments.push(commentTemp);
    }
    static restoreComments(comments, postSection) {
        for (let i = 0; i < comments.length; i++) {
            postSection.insertAdjacentHTML("afterend", comments[i]);
        }
    }
}