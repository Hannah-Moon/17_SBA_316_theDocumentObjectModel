
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
);
let transactions =
    localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

    // Add transaction
function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = '';
        amount.value = '';
    }
}
// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// This function adds a transaction to the DOM (Document Object Model)
function addTransactionDOM(transaction) {
    // Get the sign of the transaction amount, if it's less than 0, the sign is '-', otherwise it's '+'
    const sign = transaction.amount < 0 ? '-' : '+';
    // Create a new list item element
    const item = document.createElement('li');
    // Add a class to the list item based on the value of the transaction amount. If it's negative, add class 'minus', otherwise add class 'plus'
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    // Set the inner HTML content of the list item element
    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
        transaction.amount
    )}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id
        })">x</button>
  `;
    // Append the list item element to the list (assumed to be declared elsewhere in the code as 'list')
    list.appendChild(item);
}

// This function updates the balance, income, and expense displayed on the webpage
function updateValues() {
    // Extracts all transaction amounts from the transactions array
    const amounts = transactions.map(transaction => transaction.amount);
    // Calculates the total balance by summing up all transaction amounts
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    // Calculates the total income by summing up all positive transaction amounts
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    // Calculates the total expenses by summing up all negative transaction amounts
    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        -1
    ).toFixed(2);
    // Updates the balance element on the webpage with the calculated total
    balance.innerText = `$${total}`;
    // Updates the income element on the webpage with the calculated income
    money_plus.innerText = `$${income}`;
    // Updates the expense element on the webpage with the calculated expense
    money_minus.innerText = `$${expense}`;
}


// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

// Update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();
form.addEventListener('submit', addTransaction);


//////////////////////////////
////////    Chart     ////////
//////////////////////////////