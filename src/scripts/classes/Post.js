export { Post };

class Post {
    post;
    username;
    postText;
    constructor(username, postText) {
        this.username = username;
        this.postText = postText
        this.post = document.createElement('div');
    }
    create() {
        this.post.classList.add('post');
        this.post.classList.add('border-top');
        this.post.classList.add('border-bottom');
        this.post.classList.add('border-dark');
        this.post.innerHTML = ` <div class="row mt-4">
        <div class="col-1">
            <img src="../../public/images/user4.jpg" class="img-fluid rounded-circle img-thumbnail"
                style="max-width:40px;">
        </div>
        <div class="col-10 mt-3">
            <p class="fw-bold">${this.username}</p>
        </div>
    </div>
    <div class="row">
        <div class="col-1"></div>
        <div class="col-10">
            <p>
                ${this.postText}
            </p>
        </div>
    </div>
    <div class="row">
        <div class="d-flex mb-1 flex-column">
            <div class="d-flex w-100 sm my-2 justify-content-between">
                <div></div>
                <div class="bi bi-chat btn">
                </div>
                <div class=" bi bi-arrow-repeat btn">
                </div>
                <div class=" bi bi-heart btn">
                </div>
                <div></div>
            </div>
        </div>
    </div>`;
    }
    append(element) {
        element.appendChild(this.post);
    }

    static parse(json) {
        const data = JSON.parse(json);
        // console.log(data);
        const posts = []
        for (let i = 0; i < data.length; i++) {
            posts.push(new Post(data[i].username, data[i].postText))
        }
        return posts;
    }

    static restoreAll(posts, postsSection) {
        for (let i = 0; i < posts.length; i++) {
            const post = new Post(posts[i].username, posts[i].postText);
            post.create();
            post.append(postsSection);
        }
    }
}