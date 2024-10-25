function checkAuthentication() {
    if (localStorage.getItem('isAuthenticated') !== 'true') {
        window.location.href = 'personal_account.html';
    }
}

document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        alert("This email is already registered. Please log in.");
    } else {
        users.push({ firstName, lastName, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert("Registration successful! Please log in.");
        window.location.href = 'login.html';
    }
});

document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem('isAuthenticated', 'true');
        alert("Login successful!");
        window.location.href = 'personal_account.html';
    } else {
        alert("Invalid email or password.");
    }
});


