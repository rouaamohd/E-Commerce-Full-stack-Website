const apiURL = "http://localhost:3000/api"
let items = []

const itemsDIV = document.querySelector("#all-items") 
const searchBAR = document.querySelector("#search")
const header = document.querySelector("#header")
const nav = document.querySelector("#nav")
const ascDD = document.querySelector("#price-asc")
const descDD = document.querySelector("#price-desc")

const params = new URLSearchParams(window.location.search);
const parameterValue = params.get('parameter');


if (parameterValue) {
    searchBAR.value = parameterValue;
    handleSearchBar();
}

searchBAR.addEventListener('input', handleSearchBar);
ascDD.addEventListener('click', () => sortItemsByPrice('asc'));
descDD.addEventListener('click', () => sortItemsByPrice('desc'));

let categoryId;

// Add event listener to load the items
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load header
        const headerResponse = await fetch("/public/html/common/header.html")
        const headerHTML = await headerResponse.text()
        header.innerHTML = headerHTML
        
        //  Load nav
        const navResponse = await fetch("/public/html/common/nav.html")
        const navHTML = await navResponse.text()
        nav.innerHTML = navHTML

        const urlParams = new URLSearchParams(window.location.search)
        categoryId = urlParams.get('id')
    
        handleLoadItems()
    
    } catch (error) {
        // console.log("items:", items);
        console.error("Failed to load items:", error.JSON)
    }

    // if (localStorage.getItem('lastSearchTerm') != 'null'){
    //     console.log("inside if statement");
    //     const retrievedSearchValue = localStorage.getItem('lastSearchTerm');
    //     if (retrievedSearchValue.trim() !== '') {
    //         setSearchBarValueAndTriggerSearch(retrievedSearchValue);
    //     }
    // }
});


async function handleLoadItems() {
    try {
        const response = await fetch('http://localhost:3000/api/items');
        if (!response.ok) {
            throw new Error("Failed to fetch: " + response.statusText);
        }
        items = await response.json();
        console.log("Items fetched:", items);

        if (!Array.isArray(items)) {
            throw new Error("Received data is not an array");
        }    
    } catch (error) {
        console.error("Error fetching items:", error);
    }
    if(categoryId){
        handleFilter(categoryId);  
    }else{
    showItems(items);
    }
}

function setSearchBarValueAndTriggerSearch(value) {
    searchBAR.value = value;
    searchBAR.dispatchEvent(new Event('input'));
}

function sortItemsByPrice(order) {
    console.log("called sort");
    let sortedItems 
    if (order == 'asc') {
        sortedItems = items.sort((a, b) => a.price - b.price);
    } else if (order == 'desc') {
        sortedItems = items.sort((a, b) => b.price - a.price);
    }
    showItems(sortedItems);
}
// This function will be called when a card is clicked.
function navigateToItemDetail(itemId) {
    console.log("INSIDE FUNC");
    console.log(itemId);
    window.location.href = `/public/html/item_details.html?id=${itemId}`
}

function showItems(itemsList) {
    const mappedItems = itemsList.map(
        item => `
        <div class="card" data-id="${item.id}" onclick="navigateToItemDetail('${item.id}')">
            <img src="${item.image_url}" alt="${item.title}'s thumbnail">
            <div class="item-properties">
                <p> <span class="titles">Title:</span> ${item.title}</p>
                <p> <span class="titles">Artist:</span> ${item.Artist.name}</p>
                <p> <span class="titles">Category:</span> ${item.Category.name}</p>
                <p> <span class="titles">Price:</span> ${item.price}</p>
                <p> <span class="titles">Availability:</span> ${item.available_quantity}</p>
            </div>
            <button class="purchaseBTN" id="purchasebutton" onclick="onPurchase('${item.id}')">Purchase</button>
        </div>
        `
    ).join('\n');
    
    itemsDIV.innerHTML = mappedItems
}



function handleFilter(categoryId) {
    console.log(categoryId);

    const numericCategoryId = parseInt(categoryId);

    // Filter items where the item's category ID matches the given category ID
    const filteredItems = items.filter(item => {
        return item.Category && item.Category.id === numericCategoryId;
    });

    // console.log(`Filtered items: ${filteredItems}`);
    showItems(filteredItems);
}

function handleSearchBar() {
    // console.log("inside handleSearchBar");
    const filter = searchBAR.value.toLowerCase().trim()
    // console.log("filter word is : ",filter);
    if (filter) {
        // console.log("inside filter if");
        const filteredItems = items.filter(item => {
            // Safe check for title
            const titleMatch = item.title && typeof item.title === 'string' ? item.title.toLowerCase().includes(filter) : false;
            const categoryMatch = item.Category.name && typeof item.Category.name === 'string' ? item.Category.name.toLowerCase().includes(filter) : false;
            const artistMatch = item.Artist.name && typeof item.Artist.name === 'string' ? item.Artist.name.toLowerCase().includes(filter) : false;

            return titleMatch || categoryMatch || artistMatch
        });
        console.log(filteredItems);
        showItems(filteredItems);
    } else {
        showItems(items) // Show all books when there's no filter
    }
}



async function onPurchase(itemId){
    const response = await fetch(`${apiURL}/items/${itemId}`)
    const item = await response.json()
    if(item != null) {             
        const response2 =  await fetch(`${apiURL}/customers/`)
        const  users = await response2.json()

        const loggedInUser = users.findIndex(u => u.isLoggedIn == true)
        if(loggedInUser!=-1){
            window.location.href = `/public/html/purchase.html?id=${itemId}`
        }
        else{
            alert(`Please login-in before purchasing an item.`)
            window.location.href = `/public/html/login.html`
            
        }
    }
}

