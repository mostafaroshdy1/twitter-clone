import { Post } from "./classes/Post.js";
export { postId };
const postsSection = document.querySelector('.posts-section');
const postSection = document.querySelector('.post-section'); // used for the show page
let replyBtn;
let postId = null;
let restored = false;

document.addEventListener('click', (e) => {
    const commentBtn = document.querySelectorAll('.commentBtn');
    console.log(e.target);

    if (!Array.from(commentBtn).includes(e.target) || restored) {
        return;
    }
    commentBtn.forEach(btn => btn.classList.toggle('commentBtn'));
    const clickedCommentBtn = Array.from(commentBtn).find(btn => btn == e.target);
    postId = clickedCommentBtn.classList[0];
    console.log(postId);
    const posts = Post.parse(localStorage.getItem('posts'))
    // localStorage.setItem('locationY', window.scrollY);
    Post.show(posts, postId, postSection);
    window.scrollTo(0, 1);
    replyBtn = document.querySelector('.replyBtn');
    let post;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id == postId) {
            post = posts[i];
            break;
        }
    }

    Post.restoreComments(post.comments, postSection);
    restored = true;

});

document.addEventListener('click', (e) => {
    const backToPostsBtn = document.querySelector(".backToPosts");
    if (e.target === backToPostsBtn) {
        window.scrollTo(0, parseInt(JSON.parse(localStorage.getItem('locationY'))));
        window.location.reload();
        //     const posts = Post.parse(localStorage.getItem('posts'))
        //     console.log('Hello', posts);
        //     Post.restoreAll(posts, postSection);
        //     postSection.insertAdjacentHTML('afterbegin', `<div class="mt-4 border-bottom border-dark">
        //     <div class="row ">
        //         <div class="col-1">
        //             <img src="../../public/images/user4.jpg" class="img-fluid rounded-circle img-thumbnail"
        //                 style="max-width:50px;">
        //         </div>
        //         <div class="col-10 mt-3 border-bottom border-dark">
        //             <textarea class="postText form-control fs-5" placeholder="What is happening?!"
        //                 id="floatingTextarea2" style="height: 100px"></textarea>
        //         </div>
        //         <!-- Container for the image -->
        //         <div id="imageContainer" class="row mt-2 d-none">
        //             <div class="col-1"></div>
        //             <div class="col-10">
        //                 <img id="uploadedImage" class="img-fluid rounded" style="max-width: 100%;" src="">
        //             </div>
        //         </div>
        //     </div>
        //     <div class="row mt-2">
        //         <div class="col-1"></div>
        //         <div class="col-10">
        //             <div class="row">
        //                 <div class="col-10">
        //                     <div
        //                         class="d-flex flex-fill align-self-center flex-wrap gap-0 text-primary opacity-75">
        //                         <label for="fileUpload" class="rounded-circle me-3 uploadImgBtn"
        //                             style="width: 25px !important;">
        //                             <svg class="btn" viewBox="0 0 24 24" aria-hidden="true"
        //                                 style="color: #1fa5ff;">
        //                                 <g fill="#1fa5ff">
        //                                     <path
        //                                         d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z">
        //                                     </path>
        //                                 </g>
        //                             </svg>
        //                         </label>
        //                         <input type="file" id="fileUpload" style="display: none;" accept="image/*">

        //                         <div class=" rounded-circle me-3" style="width: 25px !important;">
        //                             <svg viewBox="0 0 24 24" aria-hidden="true" class="btn"
        //                                 style="color: rgb(29, 155, 240);">
        //                                 <g fill='#1fa5ff'>
        //                                     <path
        //                                         d="M6 3V2h2v1h6V2h2v1h1.5C18.88 3 20 4.119 20 5.5v2h-2v-2c0-.276-.22-.5-.5-.5H16v1h-2V5H8v1H6V5H4.5c-.28 0-.5.224-.5.5v12c0 .276.22.5.5.5h3v2h-3C3.12 20 2 18.881 2 17.5v-12C2 4.119 3.12 3 4.5 3H6zm9.5 8c-2.49 0-4.5 2.015-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.01-4.5-4.5-4.5zM9 15.5C9 11.91 11.91 9 15.5 9s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5S9 19.09 9 15.5zm5.5-2.5h2v2.086l1.71 1.707-1.42 1.414-2.29-2.293V13z">
        //                                     </path>
        //                                 </g>
        //                             </svg>
        //                         </div>

        //                         <div class=" rounded-circle me-3" style="width: 25px !important;">
        //                             <svg viewBox="0 0 24 24" aria-hidden="true" class="btn"
        //                                 style="color: rgb(29, 155, 240);">
        //                                 <g fill='#1fa5ff'>
        //                                     <path
        //                                         d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z">
        //                                     </path>
        //                                 </g>
        //                             </svg>
        //                         </div>
        //                         <div class=" rounded-circle me-3" style="width: 25px !important;">
        //                             <svg class="btn" viewBox="0 0 24 24" aria-hidden="true"
        //                                 class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03"
        //                                 style="color: #1fa5ff;">
        //                                 <g fill='#1fa5ff'>
        //                                     <path
        //                                         d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z">
        //                                     </path>
        //                                 </g>
        //                             </svg>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div class="col-2 mb-2 ">
        //                     <div class="btn btn-primary rounded-pill postBtn" style="width: 100%;">
        //                         Post
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>`)
    }

})



document.addEventListener('click', (e) => {
    if (replyBtn.id !== e.target.id) {
        return
    }
    const commentText = document.querySelector(".commentText")

    const posts = Post.parse(localStorage.getItem('posts'));
    let post;
    let i = 0;
    for (; i < posts.length; i++) {
        if (posts[i].id == postId) {
            post = posts[i]
            break;
        }
    }
    post.comment(commentText.value, JSON.parse(localStorage.getItem('user')).name);
    posts[i] = post;
    localStorage.setItem('posts', JSON.stringify(posts));
    // console.log([post.comments[post.comments.length - 1]]);
    Post.restoreComments([post.comments[post.comments.length - 1]], postSection);
    commentText.value = "";

})
