const apiURL = "http://localhost:3000/api";

const historyContainer = document.querySelector('#history_container');
const customerInfo = document.querySelector('#customer_info');
const totalAmount = document.querySelector('#totalAmount');
const header = document.querySelector("#header");
const nav = document.querySelector("#nav");
const customerName = document.querySelector('#name');
const customerPurchases = document.querySelector('#totalPur');
const customerUsername = document.querySelector('#user_username');

let loggedInUser, items;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadCommonElements();
        await loadUsers();
        await loadUserTransactions();
        await showItems();
        getTotalAmount();
        completeCustomerInfo();
    } catch (error) {
        console.error("Failed to initialize:", error);
    }
});

async function loadCommonElements() {
    const headerResponse = await fetch("/public/html/common/header.html");
    header.innerHTML = await headerResponse.text();
    const navResponse = await fetch("/public/html/common/nav.html");
    nav.innerHTML = await navResponse.text();
}

async function loadUsers() {
    const response = await fetch(`${apiURL}/customers`);
    const users = await response.json();
    loggedInUser = users.find(u => u.isLoggedIn === true);
}

async function loadUserTransactions() {
    if (!loggedInUser) {
        console.error("No logged in user found.");
        return;
    }
    const response = await fetch(`${apiURL}/customers/${loggedInUser.id}/transactions`);
    items = await response.json();
}

async function showItems() {
    if (!items || items.length === 0) {
        historyContainer.innerHTML = "<p class='message'>You didn't buy any items yet!</p>";
    } else {
        // Resolve all promises from itemsToHTML
        const itemsHTML = await Promise.all(items.map(item => itemsToHTML(item)));
        // Join the resulting HTML strings and update the container
        historyContainer.innerHTML = itemsHTML.join('');
    }
}


async function itemsToHTML(transactionItem) {
    const response = await fetch(`${apiURL}/items/${transactionItem.itemId}`);
    const item = await response.json();
    const artistResponse = await fetch(`${apiURL}/artists/${item.artistID}`);
    const artist = await artistResponse.json();

    return `
        <div class="card">
            <img src="${item.image_url}">
            <div class="content">
              <h3>${item.title}</h3>
              <p><b>Artist:</b> ${artist.name}</p>
              <p><b>Quantity Bought:</b> ${transactionItem.quantity}</p>
              <p><b>Date:</b> ${transactionItem.date}</p>
              <p><b>Total Price Paid:</b> ${transactionItem.totalPrice}</p>
              <p><b>Location:</b> ${transactionItem.location}</p>
            </div>
        </div>`;
}

function getTotalAmount() {
    let sum = items && items.reduce((acc, item) => acc + (item.totalPrice), 0);
    totalAmount.value = `${sum} QAR`;
}

function completeCustomerInfo() {
    if (loggedInUser) {
        customerUsername.textContent = loggedInUser.username;
        customerName.value = loggedInUser.name;
        customerPurchases.value = items.length;
        getTotalAmount()
    }
}
