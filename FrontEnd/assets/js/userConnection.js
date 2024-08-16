document.addEventListener("DOMContentLoaded", function() {
   const loginLink = document.getElementById('loginLink');
   const token = localStorage.getItem('token');
   const boutonModifier = document.querySelector('.boutonmodifier');


   if (token) {
       loginLink.textContent = 'logout';
       loginLink.style.cursor= 'pointer';
       loginLink.style.color = 'black';
       navEdition.style.display = 'flex';
       
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