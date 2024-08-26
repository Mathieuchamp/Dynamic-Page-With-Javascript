document.addEventListener("DOMContentLoaded", function() {
    const loginLink = document.getElementById('loginLink');
    const token = localStorage.getItem('token');
    const boutonModifier = document.querySelector('.boutonmodifier');
    const filters = document.querySelector('.filters');
 
    if (token) {
        loginLink.textContent = 'logout';
        loginLink.style.color = 'black';
        navEdition.style.display = 'flex';
        filters.style.display = 'none';
 
        if (boutonModifier) {
            boutonModifier.style.display = 'inline';
        }
 
        loginLink.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('token');
            window.location.href = './index.html';
        });
    }
 });