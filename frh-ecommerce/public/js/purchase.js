const apiURL = "http://localhost:3000/api"
let currentItem
let items

const itemDetailsDIV = document.querySelector("#itemdetails")
const quantity = document.querySelector("#quantity")
const header = document.querySelector("#header")
const nav = document.querySelector("#nav")
const purchaseFORM = document.querySelector("#purchase-form")

purchaseFORM.addEventListener('submit', onPurchase)

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id'); // Get the 'id' query parameter.

    if (itemId) {
        // const items = JSON.parse(localStorage.getItem('items'));
        const response = await fetch(`${apiURL}/items/`)
        items = await response.json()

        currentItem = items.find(i => i.id== itemId);
        console.log(currentItem);
        if (currentItem) {
            displayItemInfo();
        } else {
            console.error('Item not found');
        }
    }
});

function displayItemInfo() {
    itemDetailsDIV.innerHTML=`
            <section class="item-details info">
                <p class="info-title">Information</p>
                <p class="item-title">Title: ${currentItem.title}</p>
                <p class="item-quantity">Number of Items Available: ${currentItem.available_quantity}</p>
                <p class="item-price">Price: ${currentItem.price}</p> 
                <p>Category: ${currentItem.category}</p>
                <p>ID: ${currentItem.id}</p>
                <p>Artist: ${currentItem.artist}</p>
                
            </section>
            `
    quantity.innerHTML =`
        <button id="decreaseQuantity" type="button">-</button>
        <p>${currentItem.quantity_to_buy}</p>
        <button id="increaseQuantity" type="button">+</button>
    `
    document.querySelector("#decreaseQuantity").addEventListener('click', decreaseQuantity)
    document.querySelector("#increaseQuantity").addEventListener('click', increaseQuantity)
}

async function findItemAndUpdateQuantity(change) {
    if(currentItem){
        const newQuantity = currentItem.quantity_to_buy+change

        if(newQuantity>=0 && currentItem.available_quantity>=newQuantity){
            currentItem.quantity_to_buy=newQuantity
            await fetch(`${apiURL}/items/${currentItem.id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': "application/json", },
                    body: JSON.stringify(currentItem)
                });
            displayItemInfo(currentItem)
        }

        else{
            alert("Quantity is less than 0 or greater than available quantity")
        }
    }
    else{
        alert("Item not found.")
    }
}

function decreaseQuantity() {
    findItemAndUpdateQuantity(-1)
}

function increaseQuantity() {
    findItemAndUpdateQuantity(1)
}


async function onPurchase(e) {
    e.preventDefault();
    const form = document.querySelector('#purchase-form');
    const formData = formToObject(form);

    const location = `${formData.streetnum}, Area ${formData.areanum}, ${formData.city}, ${formData.country}`;

    const response = await fetch(`${apiURL}/customers/`);
    const users = await response.json();

    const loggedInUser = users.find(u => u.isLoggedIn === true);
    const amountToBePaid = currentItem.quantity_to_buy * currentItem.price;

    if (loggedInUser.balance > amountToBePaid && currentItem.quantity_to_buy > 0 && currentItem.quantity_to_buy <= currentItem.available_quantity) {
        const transaction = {
            userId: loggedInUser.id,
            itemId: currentItem.id,
            quantity: currentItem.quantity_to_buy,
            totalPrice: amountToBePaid,
            location: location
        };


        const transactionResponse = await fetch(`${apiURL}/customers/${loggedInUser.id}/transactions`, {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(transaction)
        });

        if(!transactionResponse.ok){
            console.log("Failed to post a transaction");
        }

        alert(`Purchase successful\nNew balance: ${loggedInUser.balance}\nNew available quantity: ${currentItem.available_quantity}`);
        window.location.href = `/public/html/main.html`;
    } else {
        alert("Insufficient balance.");
    }
}


function formToObject(form){
    const formData = new FormData(form)
    const data = {}

    for(const [key, value] of formData){
        data[key] = value
    }

    return data;
}