
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
