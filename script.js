document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Basic validation
    if(username.length < 3) {
        alert('Username must be at least 3 characters long.');
        return;
    }

    if(password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }

    // Proceed with form submission or AJAX request here
    console.log('Form submitted', { username, email, password });

});