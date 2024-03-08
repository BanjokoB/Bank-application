const dashboard = document.getElementById('dashboard'),
 deposit = document.getElementById('deposit'),
 withdraw = document.getElementById('withdraw'),
 balance = document.getElementById('balance'),
 depositInput = document.getElementById('deposit-input'),
 withdrawInput = document.getElementById('withdraw-input'),
 depositBtn = document.getElementById('deposit-btn'),
 withdrawBtn = document.getElementById('withdraw-btn'),
 submitBtn = document.getElementById('submit-btn');
//  let balanceValue;

 depositBtn.addEventListener('click', () =>{
    let value = depositInput.value;
    const depositValue = Number(deposit.innerText) + Number(value);
    let balanceValue = Number(balance.innerText) + Number(value);
    deposit.innerText = depositValue;
    balance.innerText = balanceValue;
    depositValue.value = '';
 });
 withdrawBtn.addEventListener('click', () =>{
    let value = withdrawInput.value;
    if (Number(value) === 0){
        alert("You don't have any money to withdraw")
    }
else{
         balanceValue = Number(balance.innerText) - Number(value),
         withdraw.innerText = withdrawValue,
         balance.innerText = balanceValue,
         withdrawInput.value = '',
          withdrawValue = Number(withdraw.innerText) + Number(value)
    }
    
    if((Number(value)) > Number(balance.innerText)){
        alert("You don't have enough balance");
    };
    
    
 });