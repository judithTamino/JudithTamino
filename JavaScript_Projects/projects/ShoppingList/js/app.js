/*=============== VARIABLES ===============*/
// SUMMARY
const totalQty = document.getElementById("total-qty");
const totalPrice = document.getElementById("total-price");
let counterPrice = 0, counterQty = 0;
let cost = 0, qty = 0;
// DISPLAY ITEMS
const displayItems = document.querySelector(".display-items");
// ADD ITEMS
const itemName = document.getElementById("name");
const qtyNumber = document.getElementById("quantity-number");
const price = document.getElementById("price");


// func => add item to the list
function addItem() {
  if (itemName.value != "" && qtyNumber.value != "" && price.value != "") {
    if (qtyNumber.value >= 0 && price.value >= 0) {
      qtyNumber.classList.remove("error-border");
      price.classList.remove("error-border");

      const li = document.createElement("li");

      // display the name, quantity and the price of the item
      const itemDesription = document.createElement("div");
      itemDesription.innerHTML = `
        <span class="item-name">${itemName.value}</span> | 
        <span class="item-qty">${qtyNumber.value}</span>
        <p class="item-price">$${price.value}</p>`;

      // display delete button
      const itemEdit = document.createElement("div");
      itemEdit.innerHTML = `
        <a href="#" class="btn-delete">
          <i class="ri-delete-bin-line"></i>
        </a>`;

      // add class name to the new element for style
      itemDesription.className = "item-description";
      itemEdit.className = "item-edit";

      li.appendChild(itemDesription);
      li.appendChild(itemEdit);
      displayItems.appendChild(li);

      counterPrice = price.value;
      counterQty = qtyNumber.value;

      calculateTotalPriceAndQty("+");
      clearInput();
      saveList();
    } else {
      if (qtyNumber.value <= 0)
        qtyNumber.classList.add("error-border");
      if (price.value <= 0)
        price.classList.add("error-border");
    }
  }
}

// func => clear the input fileds after item been added.
function clearInput() {
  itemName.value = "";
  qtyNumber.value = "";
  price.value = "";
}

// func => calculate the total price and quantity and display it.
function calculateTotalPriceAndQty(operator) {
  counterPrice = parseFloat(counterPrice);
  counterQty = parseInt(counterQty);

  switch (operator) {
    case "+":
      cost += counterPrice * counterQty;
      qty += counterQty;
      break;
    case "-":
      cost -= counterPrice * counterQty;
      qty -= counterQty;
      break;
  }
  totalPrice.innerHTML = `${cost.toFixed(2)}`;
  totalQty.innerHTML = `${qty}`;
}

displayItems.addEventListener('click', (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");

    // get price and quantity values of select item
    getPriceAndQty(e.target);

    /* if item checked => subtract the item price & quantity from summary */
    if (e.target.classList.contains("checked"))
      calculateTotalPriceAndQty("-");
    else
      calculateTotalPriceAndQty("+");
  } else if (e.target.tagName === "I")
    removeItem(e);

  saveList();
});

// func => remove item from list
function removeItem(e) {
  const li = e.target.parentElement.closest("li");

  if (!li.classList.contains("checked") && cost > 0 && qty > 0) {
    getPriceAndQty(li);
    calculateTotalPriceAndQty("-");
  }
  li.remove();
}

// func => get price and quantity from selected item
function getPriceAndQty(itemSelected) {
  const filteredItems = Array.from(itemSelected.childNodes[0].children).filter(item => {
    return item.classList.contains("item-qty") || item.classList.contains("item-price");
  });

  for (let i = 0; i < filteredItems.length; i++) {
    if (filteredItems[i].classList.contains("item-qty"))
      counterQty = filteredItems[i].innerText;
    else
      counterPrice = filteredItems[i].innerText.replace("$", "");
  }
}

// func => auto save the list
function saveList() {
  if (typeof (Storage) !== "undefined") {
    localStorage.setItem("list", displayItems.innerHTML);
    localStorage.setItem("totalPrice", totalPrice.innerText);
    localStorage.setItem("totalQty", totalQty.innerText);
  }
}

// display the saved list from local storage
window.onload = () => {
  let storagePrice = localStorage.getItem("totalPrice"),
    storageQty = localStorage.getItem("totalQty");

  if (typeof (Storage) !== "undefined") {
    displayItems.innerHTML = localStorage.getItem("list");

    if (storagePrice != null || storageQty != null) {
      totalPrice.innerText = storagePrice;
      cost = parseFloat(storagePrice);

      totalQty.innerText = storageQty;
      qty = parseInt(storageQty);
    } else {
      totalPrice.innerText = "$0.00";
      totalQty.innerText = "0";
    }
  }
}

