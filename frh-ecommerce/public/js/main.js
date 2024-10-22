const apiURL = "http://localhost:3000/api"

const header = document.querySelector("#header")
const nav = document.querySelector("#nav")
const categoriesDIV = document.querySelector("#categoriesDivs")

const categoryLINK = document.querySelector("#categories")
const loginLINK = document.querySelector("#login")
const categoryDD = document.querySelector("#dropdown-content")
const profileB = document.querySelector('#profile');

const searchText = document.querySelector('#searchBar');

categoryLINK.addEventListener("click", showCategoriesDROPDOWN)
profileB.addEventListener('click', profileCheck)



let categories =[]
let users =[]
let loggedInUser
let userEndpoint
let isAdmin = false


// Add event listener to load the items
document.addEventListener('DOMContentLoaded', async () => {
    try {

        await loadCategories()
        await loadUsers()
        await updateLoginLink()

        showCategories(categories)
        

    } catch (error) {
        console.error("Failed to load categories", error)
    }
})

// =======================================================Loading Functions================================================

// Function to load categories
async function loadCategories() {
    try{
        const response = await fetch(`${apiURL}/categories`)
        if (!response.ok) {
            throw new Error("Failed to fetch: " + response.statusText);
        }
        categories = await response.json()
    }catch(error){
        console.error("Error fetching categories:", error);
    }
    showCategories(categories)
}

async function loadUsers() {
    try {
        const responses = await Promise.all([
            fetch(`${apiURL}/customers`),
            fetch(`${apiURL}/artists`),
            fetch(`${apiURL}/admin`)
        ]);

        responses.forEach(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch data from ${response.url}: ${response.statusText}`);
            }
        });

        const [customers, artists, admins] = await Promise.all(responses.map(res => res.json()));
        users = [...customers, ...artists, admins];
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}



// ============================================================================================================================


function showCategories(categories){
    const mappedCategories = categories.map(
        category => 
        `
        <div onclick="navigateToFilteredItems(${category.id})">
            <img src="${category.image}" alt="${category.name}">
            <p>${category.name}</p>
        </div>
        `
    ).join('\n')
    
    categoriesDIV.innerHTML = mappedCategories
}

function navigateToFilteredItems(categoryId){
    window.location.href = `/public/html/all_Items.html?id=${categoryId}`
}

// ======================================================= User and Login Management ======================================================
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

// ======================================================= Event Handlers ======================================================

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

function handleLogin() {
    window.location.href = "/public/html/login.html"
}

function showCategoriesDROPDOWN(){  
    const mappedCategories = categories.map(c => `
        <a onclick="navigateToFilteredItems(${c.id})">${c.name}</a>
    `).join('\n')
    categoryDD.innerHTML = mappedCategories
    categoryDD.classList.toggle('show-dropdown')
}

function navigateToFilteredItems(categoryId){
    window.location.href = `/public/html/all_Items.html?id=${categoryId}`
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