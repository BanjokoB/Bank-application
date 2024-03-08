// Get DOM elements
const dashboard = document.getElementById('dashboard');
const deposit = document.getElementById('deposit');
const withdraw = document.getElementById('withdraw');
const balance = document.getElementById('balance');
const depositInput = document.getElementById('deposit-input');
const withdrawInput = document.getElementById('withdraw-input');
const depositBtn = document.getElementById('deposit-btn');
const withdrawBtn = document.getElementById('withdraw-btn');
const submitBtn = document.getElementById('submit-btn');
const transactionHistory = document.getElementById('transaction-history');

// Initialize transactions array and display initial values
let transactions = [];
deposit.innerHTML = localStorage.getItem('deposit') || 0;
withdraw.innerHTML = localStorage.getItem('withdrawal') || 0;
balance.innerHTML = localStorage.getItem('balance') || 0;
transactionHistory.innerHTML = localStorage.getItem('transactions');

// Function to update transaction history
function updateTransactionHistory(type, amount) {
  // Create transaction object
  const transaction = {
    type,
    amount,
    date: new Date().toLocaleString(),
  };
  // Push transaction to transactions array
  transactions.push(transaction);

  // Create transaction row in HTML
  const transactionRow = document.createElement('tr');
  const typeColumn = document.createElement('td');
  const amountColumn = document.createElement('td');
  const dateColumn = document.createElement('td');

  typeColumn.innerText = type;
  amountColumn.innerText = amount;
  dateColumn.innerText = transaction.date;

  transactionRow.appendChild(typeColumn);
  transactionRow.appendChild(amountColumn);
  transactionRow.appendChild(dateColumn);

  transactionHistory.appendChild(transactionRow);

  // Store transactions in local storage
  localStorage.setItem('transactions',JSON.stringify(transactions));
}

// Deposit button event listener
depositBtn.addEventListener('click', () => {
    const value = depositInput.value;
    if(!isValidAmount(value)) {
      alert('please enter a valid deposit')
    }
    const depositValue = Number(deposit.innerHTML) + Number(value);
    const balanceValue = Number(balance.innerHTML) + Number(value);
  
    deposit.innerHTML = depositValue;
    balance.innerHTML = balanceValue;
    depositInput.value = '';

    // Store deposit in local storage
    localStorage.setItem('deposit', depositValue);
    localStorage.setItem('balance', balanceValue);
  
    updateTransactionHistory('Deposit', value);
  });
  
// Withdraw button event listener
withdrawBtn.addEventListener('click', () => {
    const valueToWithdraw = Number(withdrawInput.value);
    if(!isValidAmount(valueToWithdraw)) {
      alert('please enter a valid withdrawal')
    }
    const currentBalance = Number(balance.innerHTML);
  
    if (valueToWithdraw > currentBalance) {
      alert('insufficient funds');
    } else if (valueToWithdraw <= 0) {
      alert('Please enter an amount');
    } else {
      const updated_Balance = currentBalance - valueToWithdraw;
      balance.innerHTML = updated_Balance;
      withdrawInput.value = '';
  
      // Store withdrawals in local storage
      localStorage.setItem('withdraw', valueToWithdraw);
      localStorage.setItem('balance', updated_Balance);

      // Update transaction history
      updateTransactionHistory('Withdrawal', valueToWithdraw);

      // Calculate and update total withdrawals
      updateTotalWithdrawals();

      // Store updated withdrawals in local storage
      localStorage.setItem('withdrawals', JSON.stringify(transactions.filter(transaction => transaction.type === 'Withdrawal')));
    }
});

// Function to validate amount
function isValidAmount(amount) {
  return !isNaN(amount) && parseFloat(amount) > 0;
}

// Function to calculate total withdrawals
function calculateTotalWithdrawals() {
  let totalWithdrawals = 0;
  for (const transaction of transactions) {
    if (transaction.type === 'Withdrawal') {
      totalWithdrawals += transaction.amount;
    }
  }
  return totalWithdrawals;
}

// Function to update total withdrawals in the HTML
function updateTotalWithdrawals() {
  const totalWithdrawals = calculateTotalWithdrawals();
  withdraw.innerHTML = totalWithdrawals;
}
