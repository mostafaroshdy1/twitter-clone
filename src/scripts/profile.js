// Existing code...

class TabManager {
    constructor() {
        this.tabs = document.querySelectorAll('.nav-link');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.setupTabs();
    }

    setupTabs() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const target = tab.getAttribute('data-target');
                this.hideAllTabs();
                tab.classList.add('active');
                document.getElementById(target).classList.add('active');
            });
        });
    }

    hideAllTabs() {
        this.tabs.forEach(tab => tab.classList.remove('active'));
        this.tabContents.forEach(tc => tc.classList.remove('active'));
    }
}

class Modal {
    constructor() {
        this.modal = document.getElementById('editProfileModal');
        this.openButton = document.getElementById('openModal');
        this.closeButton = document.querySelector('.close');
        this.saveButton = document.querySelector('.modal-content button');
        this.setupModal();
    }

    setupModal() {
        this.openButton.addEventListener('click', () => {
            this.modal.style.display = 'block';
        });

        this.closeButton.addEventListener('click', () => {
            this.modal.style.display = 'none';
        });

        this.saveButton.addEventListener('click', () => {
            const form = document.querySelector('form');
            const formData = new FormData(form);
            const name = formData.get('name');
            const bio = formData.get('bio');
            const location = formData.get('location');
            const website = formData.get('website');

            // Update the local storage with the form data
            localStorage.setItem('userName', name);
            localStorage.setItem('userBio', bio);
            localStorage.setItem('userLocation', location);
            localStorage.setItem('userWebsite', website);

            // You can also save the form data to localStorage or perform other actions as needed

            this.modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.modal.style.display = 'none';
            }
        });
    }
}

class FormManager {
    constructor() {
        this.inputs = document.querySelectorAll('.form-floating input');
        this.setupInputs();
    }

    setupInputs() {
        this.inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.nextElementSibling.classList.add('active');
            });

            input.addEventListener('blur', () => {
                if (input.value === '') {
                    input.nextElementSibling.classList.remove('active');
                }
            });
        });
    }
}

class ImageUploader {
    constructor(inputId, targetElement) {
        this.fileInput = document.getElementById(inputId);
        this.targetElement = document.getElementById(targetElement);
        this.setupUploader();
    }

    setupUploader() {
        this.fileInput.addEventListener('change', () => {
            const file = this.fileInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.targetElement.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}


const tabManager = new TabManager();
const modal = new Modal();
const formManager = new FormManager();
const profileImgUploader = new ImageUploader('imageUpload', 'profileImg');
const bgImgUploader = new ImageUploader('imagebgUpload', 'profile-header');

// Update profile information
const userName = localStorage.getItem('userName');
const userEmail = localStorage.getItem('userEmail');
const atIndex = emailString.indexOf("@");
const email = emailString.substring(0, atIndex);
const userImage = localStorage.getItem('userImage');
const posts = localStorage.getItem('posts');

// document.getElementById('username-main').innerText = userName;
// document.getElementById('user-details-main').children[1].innerText = email;
document.getElementById('profileImageUser').src= userImage;
document.querySelector('.profile-image img').src = userImage;
document.querySelector('.modal .profile-image img').src = userImage;
document.getElementById('no-posts').innerText = `${posts.length} Posts`;
document.getElementById('username-header').innerText = userName;
