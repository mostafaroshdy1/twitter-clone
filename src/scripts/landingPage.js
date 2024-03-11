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

registrationForm.addEventListener('submit', function (event) {

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Perform further form validation or submission logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
});