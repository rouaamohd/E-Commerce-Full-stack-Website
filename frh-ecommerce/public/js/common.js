// const apiURL = "http://localhost:3000/api"
let loginLINK;
let profileB;

let users =[]
let loggedInUser
let userEndpoint
let isAdmin = false

document.addEventListener('DOMContentLoaded', async function() {
    await insertCommonElements();
    bindEventListeners();
});

function bindEventListeners() {
    document.body.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'profile') {
            profileCheck();
        }
        if (e.target && e.target.id === 'loggedIn') {
            e.preventDefault();
            handleLogout();
        }
        if (e.target && e.target.id === 'loggedOut') {
            e.preventDefault();
            handleLogin();
        }
    });
}

async function insertCommonElements() {
    await loadElement("header", "/public/html/common/header.html");
    await loadElement("nav", "/public/html/common/nav.html");
    loginLINK = document.querySelector("#login")
    await updateLoginLink();
}

// Function to load HTML content into a specified element by its ID
async function loadElement(elementId, url) {
    const element = document.getElementById(elementId);
    if (element) {
        const response = await fetch(url);
        element.innerHTML = await response.text();
    }
}

async function getLoggedInUser(){

    const customersResponse = await fetch(`${apiURL}/customers`);
    const customers = await customersResponse.json();
    const loggedInCustomer = customers.find(u => u.isLoggedIn === true);

    const artistsResponse = await fetch(`${apiURL}/artists`);
    const artists = await artistsResponse.json();
    const loggedInArtist = artists.find(u => u.isLoggedIn === true);

    const adminResponse = await fetch(`${apiURL}/admin`);
    const admin = await adminResponse.json();
    const loggedInAdmin = admin.isLoggedIn ? admin : null;

    // Determine if the logged-in user is a customer or an artist
    if (loggedInCustomer) {
        userEndpoint = `${apiURL}/customers/${loggedInCustomer.id}`;
        loggedInUser = loggedInCustomer;
    } else if (loggedInArtist) {
        userEndpoint = `${apiURL}/artists/${loggedInArtist.id}`;
        loggedInUser = loggedInArtist;
    } else if(loggedInAdmin){
        userEndpoint = `${apiURL}/admin/${loggedInAdmin.id}`;
        loggedInUser = admin;
        isAdmin = true
        console.log("IS ADMIN");
    }
}

async function updateLoginLink() {
    try {
        await getLoggedInUser();

        if (loggedInUser) {
            loginLINK.innerHTML = `<a href="#" id="loggedIn" class="login">Logout</a>`;
            document.querySelector("#loggedIn").addEventListener('click', (e) => {
                e.preventDefault();
                handleLogout(loggedInUser);
            });

            if (isAdmin) {
                addAdminTab();
                removeProfileTab();
            } else {
                addProfileTab();
            }
        } else {
            loginLINK.innerHTML = `<a href="#" id="loggedOut" class="login">Login</a>`;
            document.querySelector("#loggedOut").addEventListener('click', (e) => {
                e.preventDefault();
                handleLogin();
            });
            removeAdminTab();
            addProfileTab();
        }
    } catch (error) {
        console.error("Failed to update login link:", error);
    }
}


function removeProfileTab() {
    const profileTab = document.querySelector('#profile');
    if (profileTab) {
        profileTab.style.display = 'none'; 
    }
}


function addProfileTab() {
    const profileTab = document.querySelector('#profile');
    if (profileTab) {
        profileTab.style.display = '';
    }
}

function addAdminTab() {
    const navList = document.querySelector('.nav ul');
    let statsTab = document.querySelector('a[href="/path-to-stats-page"]');
    if (!statsTab) {
        statsTab = document.createElement('li');
        statsTab.innerHTML = `<a href="http://localhost:3000/">Stats</a>`;
        navList.appendChild(statsTab);
    }
}

function removeAdminTab() {
    const existingStatsTab = document.querySelector('.nav ul li a[href="/path-to-stats-page"]');
    if (existingStatsTab) {
        existingStatsTab.parentElement.remove();
    }
}

function handleLogout() {

    if (loggedInUser) {
        loggedInUser.isLoggedIn = false; // Modify the user object
        fetch(userEndpoint, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loggedInUser)
        }).then(response => {
            if (response.ok) {
                alert("You have been successfully logged out.");
                updateLoginLink();
            } else {
                console.error("Failed to logout:", response.statusText);
            }
        });
    }
}


// Function to redirect the user to the login page
function handleLogin() {
    window.location.href = "/public/html/login.html";
}

async function profileCheck() {

    // Fetch customers and artists
    const response1 = await fetch(`${apiURL}/customers`);
    const customers = await response1.json();
    
    const response2 = await fetch(`${apiURL}/artists`);
    const artists = await response2.json();

    // Find the logged-in user in both lists
    const loggedInCustomer = customers.find(u => u.isLoggedIn === true);
    console.log(loggedInCustomer);
    const loggedInArtist = artists.find(u => u.isLoggedIn === true);
    console.log(loggedInArtist);

    // Redirect based on the type of logged-in user
    if (loggedInCustomer) {
        window.location.href = "/public/html/history.html"; // Redirect for customers
    } else if (loggedInArtist) {
        window.location.href = "/public/html/historySeller.html"; // Redirect for artists
    } else {
        // If no user is logged in, prompt login and redirect to the login page
        alert("Login before proceeding.");
        window.location.href ="/public/html/login.html";
    }
}

