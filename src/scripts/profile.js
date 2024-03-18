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

const inputs = document.querySelectorAll('#editProfileModal input');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        // Add the floating class to the label when input is focused
        const label = this.nextElementSibling;
        label.classList.add('floating');
    });
    input.addEventListener('blur', function() {
        // Remove the floating class from the label when input is blurred
        const label = this.nextElementSibling;
        if (this.value === '') {
            label.classList.remove('floating');
        }
    });
});
