let apiURL = "http://localhost:3000/api"
// Select elements from the DOM for manipulation
const onsaleContainer = document.querySelector("#onsale_container");
const soldContainer = document.querySelector("#sold_container");
const customerInfo = document.querySelector("#customer_info");
const header = document.querySelector("#header");
const nav = document.querySelector("#nav");
const customerName = document.querySelector("#name");
const TotalitemsOnsale = document.querySelector("#totalOnsale");
const itemssold = document.querySelector("#totalSold");
const cutsomerUsername = document.querySelector("#user_username");
const totalAmountSold = document.querySelector("#totalAmount");
const addItem = document.querySelector("#addItemButton")

let users =[]
let loggedInUser
let itemsSold =[]
let itemsOnSale =[]
let numberOfItemsSold
let items


// When the content is loaded, perform these actions
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Load the common header and navigation content
    const headerResponse = await fetch("/html/common/header.html");
    const headerHTML = await headerResponse.text();
    header.innerHTML = headerHTML;

    const navResponse = await fetch("/html/common/nav.html");
    const navHTML = await navResponse.text();
    nav.innerHTML = navHTML;

    // Display the items on sale, items sold, seller info, and the total amount sold
    await loadArtistsAndItems()
    await getItemsInfo()
    await showItemsOnSale()
    showitemsSold()
    completeSellerInfo()
    getTotalAmount()

  } catch (error) {
    console.error("Failed to load items:", error);
  }
});

async function loadArtistsAndItems() {
  const response = await fetch(`${apiURL}/artists`);
  const users = await response.json();
  loggedInUser = users.find(u => u.isLoggedIn === true);


  const response2 = await fetch(`${apiURL}/items`);
  items = await response2.json();
}

async function getItemsInfo() {

  const artistId = loggedInUser.id;
  itemsOnSale = items.filter(i=> i.artistID==artistId)

  try {
      // Fetch transactions for the given artist
      const response = await fetch(`${apiURL}/artists/${artistId}/transactions`);
      itemsSold = await response.json();

      // Check if the response contains transactions and handle any possible errors
      if (!itemsSold || itemsSold.error) {
          throw new Error(itemsSold.error || "Failed to fetch transactions.");
      }

      numberOfItemsSold = itemsSold.length;

  } catch (error) {
      console.error("Error fetching items info:", error);
      return {
          error: error.message
      }
  }
}

// Function to display items that are currently on sale
async function showItemsOnSale() {
  try {
      const itemsOnSaleHTML = itemsOnSale.map(item => itemsToHTML(item)).join(" ");
      onsaleContainer.innerHTML = itemsOnSaleHTML || "<p class='message'>Currently No Items Are On-Sale!</p>";

  } catch (error) {
      console.error("Error fetching items on sale:", error);
      onsaleContainer.innerHTML = `<p class='error'>Error fetching items: ${error.message}</p>`;
  }
}



// Function to display items that have been sold
function showitemsSold() {
  if (itemsSold.length != 0) {
    const itemsSoldHTML = itemsSold.map((i) => itemsSoldToHTML(i)).join(" ");
    soldContainer.innerHTML = itemsSoldHTML;
  } else {
    soldContainer.innerHTML += "<p class='message'>No Items Are</p><p class='mark'> Sold Yet !</p>";
  }
}

// Function to convert item details to HTML format
function itemsToHTML(item) {
  console.log(item);
  return `
    <div class="card">
        <img src="${item.image_url}">
        <div class="content">
            <h3>${item.title}</h3>
            <p>Price: ${item.price} ${item.currency}</p>
            <p>Quantity Available: ${item.available_quantity}</p>
            <p>${item.description}</p>
            <button id="deleteBtn" onclick="deleteItem(${item.id})">Delete</button>
            <button id="updateBtn" onclick="updateItem(${item.id})">Update</button>
        </div>
    </div>`;
}

// Function to convert sold items details to HTML format
// function itemsSoldToHTML(item) {
//   numberOfItemsSold += item.sold;
//   return `
//     <div class="card">
//             <img src="${item.image_url}">
//             <div class="content">
//               <h3>${item.title}</h3>
//               <p>${item.description}</p>
//               <p><b>Price: </b>${item.price} ${item.currency}</p>
//               <p><b>${item.sold}</b> Items got sold</p>
//               <h4> Who bought this item :</h4>
//               <p>${item.clients.join(", ")}</p>
//             </div>
//         </div>`;
// }

function itemsSoldToHTML(item) {
  numberOfItemsSold += item.sold;
  return `
    <div class="card">
            <div class="content">
              <p><b>Total Price: </b>${item.totalPrice} ${item.currency}</p>
              <p><b>${item.quantity}</b> Items got sold</p>
              <h4> Who bought this item :</h4>
              <p>${item.userId}</p>
            </div>
        </div>`;
}

function getTotalAmount() {
  let sum = 0;
  if (itemsSold.length != 0) {
    // sum = itemsSold.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    itemsSold.forEach(i => sum+=i.totalPrice)
  }
  totalAmountSold.value = `${sum} QAR`;
}


// Function to fill in seller information
function completeSellerInfo() {
  cutsomerUsername.innerHTML = `${loggedInUser.username}`;
  customerName.value = loggedInUser.name;
  TotalitemsOnsale.value = itemsOnSale.length;
  itemssold.value = itemsSold.length;
}

// Function to handle item deletion
// async function deleteItem(itemId) {
//   try {
//       const response = await fetch(`${apiURL}/items/${itemId}`, {
//           method: 'DELETE',
//           headers: {
//               'Content-Type': 'application/json'
//           }
//       });
//       const result = await response.json();

//       if (response.ok) {
//           showItemsOnSale();
//           console.log("Item deleted successfully");
//       } else {
//           throw new Error(result.error || "Failed to delete item.");
//       }
//   } catch (error) {
//       console.error("Error deleting item:", error);
//   }
// }

async function deleteItem(itemId) {
  console.log(itemId);
  const confirmation = confirm("Are you sure you want to delete this item? This action cannot be undone.");
  if (!confirmation) {
    console.log("Item deletion cancelled.");
    return;
  }

  try {
    const response = await fetch(`${apiURL}/items/${itemId}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }
    });
    const result = await response.json();

    if (response.ok) {
        showItemsOnSale();
        console.log("Item deleted successfully");
    } else {
        throw new Error(result.error || "Failed to delete item.");
    }
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}



// Function to redirect for item update
function updateItem(id) {
  const item = items.find(i => i.id == id);
  if (item) {
    window.location.href = `/public/html/add_item.html?id=${item.id}`;
  } else {
    console.log("Item not found");
  }
}

addItem.addEventListener("click", addItemBEvent)

function addItemBEvent() {
  window.location.href = "/public/html/add_item.html";
}