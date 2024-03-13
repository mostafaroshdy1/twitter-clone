
function iconHomeClicked() {
    window.location.href = 'index.html';
}

function changeCursor(iconElement, cursorType) {
    iconElement.style.cursor = cursorType;
}

//Nav bar active class

function setActive(element) {
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    element.classList.add('active');
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        setActive(this);
    });
});

//Search bar message appearnce

function showSearchMessage() {
    document.getElementById("searchMessage").style.display = "block";
}

function hideSearcMessage() {
    document.getElementById("searchMessage").style.display = "none";
}

//Dummy Data
storeUserData("../../public/images/profileImg.jpg","Merna Gamal","Merna.Gamal");

// Function to store user data in local storage
function storeUserData(imageUrl, name, email) {
    localStorage.setItem('userImage', imageUrl);
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
}

// Function to retrieve user data from local storage and create user object
function getUserData() {
    const imageUrl = localStorage.getItem('userImage');
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');
    
    return {
        imageUrl: imageUrl,
        name: name,
        email: email
    };
}

// Function to update profile bar with user data
function updateProfileBar() {
    const userData = getUserData();
    if (userData) {
        document.querySelector('.profileImage').src = userData.imageUrl;
        document.getElementById('user_name').innerText = userData.name;
         // Extracting the username part from the email
        const emailParts = userData.email.split('@');
        const username = '@' + emailParts[0];
        document.getElementById('user_email').innerText = username;
    }
}

// Call the updateProfileBar function to fill the data initially
document.addEventListener("DOMContentLoaded", function() {
    updateProfileBar();
});

