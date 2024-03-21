
function iconHomeClicked() {
    window.location.href = 'home.html';
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

function hideSearchMessage() {
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
        document.getElementById('user_email_bookmark').innerText = username;
    }
}

// Call the updateProfileBar function to fill the data initially
document.addEventListener("DOMContentLoaded", function() {
    updateProfileBar();
});

//Create What's happening trends
// function createTrendDivs(count) {
//     var container = document.getElementById('trends-container');
//     var beforeElement = document.getElementById('show-more');
//     for (var i = 0; i < count; i++) {
//         var div = document.createElement('div');
//         div.className = 'trend';
//         div.innerHTML = `
//             <div class="d-flex justify-content-between align-items-center">
//                 <span>Trending in Egypt</span>
//                 <i class="fas fa-ellipsis-h rounded-circle p-1 w-2"></i>
//             </div>
//             <div class="text-end">
//                 <span>أحدث_الأخبار#</span>
//             </div>`;
//         container.insertBefore(div, beforeElement);
//         }
// }

Promise.all([
    fetchAndSelectRandomTrend('For You'),
    fetchAndSelectRandomTrend('Trending'),
    fetchAndSelectRandomTrend('News'),
    fetchAndSelectRandomTrend('Sports'),
    fetchAndSelectRandomTrend('Entertainment')
])
.then(results => {
    var container = document.getElementById('trends-container');
    var beforeElement = document.getElementById('show-more');
    results.forEach(trend => {
        var div = document.createElement('div');
        div.className = 'trend';
        div.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <span>Trending in ${trend.trend_location}</span>
            <i class="fas fa-ellipsis-h rounded-circle p-1 w-2"></i>
        </div>
        <div class="text-end">
            <span>${trend.trend_name} #</span>
        </div>`;
        container.insertBefore(div, beforeElement);
    });
})
.catch(error => {
    console.error('Error fetching Trends data:', error);
});

function fetchAndSelectRandomTrend(category) {

    return fetch(`../../public/json/explore.json`)
        .then(response => response.json())
        .then(data => {
            // Select a random trend from the data
            const randomIndex = Math.floor(Math.random() * data.length);
            return data[randomIndex];
        });
}

// Call the function to generate 5 instances of the HTML structure before a specific div with id "specificDiv"
createTrendDivs(5, "specificDiv");

