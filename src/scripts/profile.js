document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');

            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));

            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
});

var modal = document.getElementById('editProfileModal');

var btn = document.getElementById('openModal');
var span = document.getElementsByClassName('close')[0];

btn.onclick = function () {
    modal.style.display = 'block';
}

span.onclick = function () {
    modal.style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.form-floating input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.nextElementSibling.classList.add('active');
        });
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.nextElementSibling.classList.remove('active');
            }
        });
    });
});

const fileInput = document.getElementById('imageUpload');
const profileImg = document.getElementById('profileImg');

fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) { 
        const reader = new FileReader(); 
        reader.onload = function(e) {
            profileImg.src = e.target.result;
        }
        reader.readAsDataURL(file); 
    }
});

const BgInput = document.getElementById('imagebgUpload');
const BgeImg = document.querySelector('form .profile-header');

BgInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) { 
        const reader = new FileReader(); 
        reader.onload = function(e) {
            BgeImg.style.backgroundImage = `url(${e.target.result})`;
        }
        reader.readAsDataURL(file); 
    }
});
//Edit Form 
document.addEventListener('DOMContentLoaded', function() {
    const locationSpan = document.querySelector('#user-details-main > div:nth-child(1) > span:nth-child(2)');
    const nameSpan = document.querySelector('#username-main');

    const locationInput = document.querySelector('input[name="location"]');
    const nameInput = document.querySelector('input[name="name"]');

    locationInput.value = locationSpan.textContent;
    nameInput.value = nameSpan.textContent;
});

document.addEventListener("DOMContentLoaded", function () {
    // Get elements
    const saveBtn = document.querySelector("#editProfileModal .modal-content button");
    const usernameInput = document.querySelector("#editProfileModal input[name='name']");
    const locationInput = document.querySelector("#editProfileModal input[name='location']");
    const profileHeader = document.querySelector("#user-details-main .profile-header");
    const profileImage = document.querySelector("#editProfileModal .profile-image img");
    const userDetailsUsername = document.querySelector("#user-details-main #username-main");
    const userDetailsLocation = document.querySelector("#user-details-main .row .col-4:first-child span:last-child");

    // Save button click event
   // Save button click event
    saveBtn.addEventListener("click", function (e) {
        e.preventDefault();
        // Update username
        userDetailsUsername.textContent = usernameInput.value;
        // Update location
        userDetailsLocation.textContent = locationInput.value;
        
        // Delay updating the image to allow time for the new image to load
        setTimeout(() => {
            // Update background
            profileHeader.style.backgroundImage = `url(${profileImage.src})`;
        }, 1000); // 1 second delay
    });

});

