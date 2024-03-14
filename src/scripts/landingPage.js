"use strict";
// Get the modal elements
const createAccountModal = document.getElementById('createAccountModal');
const loginModal = document.getElementById('loginModal');

// Get the button that opens the modal
const createAccountBtn = document.querySelector('.createAccount');
const loginBtn = document.querySelector('.login');

// Function to open the modal
function openModal(modal) {
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
    document.body.classList.toggle('bg-black');
    document.body.classList.toggle('bodyModalColor');

}

// Function to close the modal
function closeModal(modal) {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.classList.toggle('bg-black');
    document.body.classList.toggle('bodyModalColor');


}

// Event listeners to open modals
createAccountBtn.addEventListener('click', () => openModal(createAccountModal));
loginBtn.addEventListener('click', () => openModal(loginModal));

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === createAccountModal) {
        closeModal(createAccountModal);
    } else if (e.target === loginModal) {
        closeModal(loginModal);
    }
});

// Close modal when clicking close button
document.querySelectorAll('.btn-close').forEach((btnClose) => {
    btnClose.addEventListener('click', () => {
        const modal = btnClose.closest('.modal');
        closeModal(modal);
    });
});

const registrationForm = document.getElementById('registrationForm');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const passwordError = document.getElementById('passwordError');
const congratsModal = document.getElementById('congratsModal');

registrationForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        passwordError.textContent = 'Passwords do not match!';
        passwordError.style.display = 'block';
    } else {
        passwordError.textContent = '';

        try {
            const user = new User(name, password, email);
            console.log(user);
            localStorage.setItem("user", JSON.stringify(user));
        } catch (e) {
            console.log(e);
        }

        congratsModal.style.display = 'block';
    }
});

// Function to hide the congratulatory modal and redirect to another page
function hideCongratsModal() {
    congratsModal.style.display = 'none';
    window.location.href = '/';
}


// Clear the error message when the password field changes
passwordInput.addEventListener('input', function () {
    passwordError.textContent = '';
});


// Function to check user credentials from local storage
const loginError = document.getElementById('loginError');
function checkCredentials(email, password) {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
        window.location.href = '/home.html';

    } else {

        loginError.textContent = 'Invalid email or password.';
    }
}

// Event listener for login form submission
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    checkCredentials(email, password);
});
const loginPassword = document.getElementById('loginPassword');

loginPassword.addEventListener('input', function () {
    loginError.textContent = '';
});




class User {
    #name
    #password
    #email

    constructor(name, password, email) {
        this.name = name;
        this.password = password;
        this.email = email;
    }

    get name() {
        return this.#name;
    }

    get password() {
        return this.#password;
    }

    get email() {
        return this.#email;
    }

    set name(name) {
        this.#name = name;
    }

    set password(password) {
        // Check if the password meets the condition before setting it
        if (/(?=.*[a-zA-Z]).{9,}/.test(password)) {
            this.#password = password;
        } else {
            throw new Error('Password must contain at least one letter and be at least 9 characters long');
        }
    }

    set email(email) {
        // Check if the email is valid before setting it
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            this.#email = email;
        } else {
            throw new Error('Invalid email address');
        }
    }
    toJSON() {
        return {
            name: this.name,
            password: this.password,
            email: this.email
        };
    }

    // use User.parse to parse the user from localStorage instead of JSON.parse
    static parse(json) {
        const data = JSON.parse(json);
        return new User(data.name, data.password, data.email);
    }
}