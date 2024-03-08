// Event listener for showing login popup
document.querySelector("#show-login").addEventListener("click", function () {
    // Add 'active' class to show the popup
    document.querySelector(".popup").classList.add("active");
});

// Event listener for closing the login popup
document.querySelector(".popup .close-btn").addEventListener("click", function () {
    // Remove 'active' class to hide the popup
    document.querySelector(".popup").classList.remove("active");
});

// Event listener for form submission
document.getElementById('myform').addEventListener('submit', function (e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the values of account number and password from the form fields
    let acct = document.getElementById('acct').value;
    let password = document.getElementById('password').value;

    // Check if both account number and password are provided
    if (acct.trim() === '' || password.trim() === '') {
        alert('Please enter both account number and password');
        return;
    }

    // Check if the provided account number and password are correct
    if (acct !== '2275338901' || password !== '123456') {
        // Alert user if account number or password is incorrect
        alert('Wrong account number or password');
    } else {
        // Redirect to the main.html page if login is successful
        window.location.href = 'main.html';
    }
});
