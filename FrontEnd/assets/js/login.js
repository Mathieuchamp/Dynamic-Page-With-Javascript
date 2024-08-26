const formulaire = document.getElementById('FormLog');

formulaire.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const messageError = document.querySelector('#error');
    const filters = document.querySelector('.filters');

    const user = {
        email: email.value,
        password: password.value
    };

    console.log("User data being sent:", user);

    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            localStorage.setItem('token', token);
            if (filters) {
                filters.innerHTML = '';
            }
            window.location.href = 'index.html';
        } else {
            const errorData = await response.json();
            
// Remplace "user not found" par un message personnalisé
            if (errorData.message === "user not found") {
                messageError.textContent = "Erreur dans l’identifiant ou le mot de passe";
            } else {
                messageError.textContent = errorData.message || "Erreur dans l’identifiant ou le mot de passe";
            }

            messageError.style.display = 'block';
            setTimeout(() => {
                messageError.style.display = 'none';
            }, 5000);
        }   

    } catch (error) {
        messageError.textContent = "Erreur dans l’identifiant ou le mot de passe";
        messageError.style.display = 'block';
        setTimeout(() => {
            messageError.style.display = 'none';
        }, 5000);
    }
});
