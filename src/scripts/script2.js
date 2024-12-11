const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const errorMessage = document.getElementById('error-message');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    localStorage.setItem('user', JSON.stringify({ name, email, password }));
    console.log("Usuario registrado:", name, email, password);
    alert("Cuenta registrada con éxito. Ya puedes iniciar sesión.");
    container.classList.remove("active");
});

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && email === storedUser.email && password === storedUser.password) {
        window.location.href = "index2.html";
    } else {
        errorMessage.style.display = "block";
    }
});