// Recupération API et affichage des projets
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5678/api/works', {
        method: 'GET', 
        headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(projets => {
        const gallery = document.querySelector('.gallery');
        
        projets.forEach(project => {
            const item = document.createElement('div');
            const img = document.createElement('img');
            img.src = project.imageUrl;
            img.alt = project.title;
            const figcaption = document.createElement('figcaption');
            figcaption.textContent = project.title;
            
            item.appendChild(img);
            item.appendChild(figcaption);
            gallery.appendChild(item);
        });
    });

    // Recupération des filtres des catégories
    fetch('http://localhost:5678/api/categories', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(categories => {
        const filters = document.querySelector('.filters');
        
        // Création du bouton "Tous"
        const BoutonTous = document.createElement('button');
        BoutonTous.textContent = "Tous";
        BoutonTous.classList.add('filtersNone');
        filters.appendChild(BoutonTous);
        
        BoutonTous.addEventListener('click', () => {
            setActiveButton(BoutonTous);
            filtreprojets();
        });

        setActiveButton(BoutonTous);
        filtreprojets();
    
        // Création des boutons pour chaque catégorie
        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category.name;
            button.dataset.id = category.id;
            button.classList.add('filtersNone');
            filters.appendChild(button);
            
            button.addEventListener('click', () => {
                setActiveButton(button);
                filtreprojets(category.id);
            });
        });
    });

    // Fonction pour définir le bouton actif
    function setActiveButton(activeButton) {
        const buttons = document.querySelectorAll('.filters button');
        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            if (button === activeButton) {
                button.classList.remove('filtersNone');
                button.classList.add('filterActive');
            } else {
                button.classList.remove('filterActive');
                button.classList.add('filtersNone');
            }
        }
    }

    // Fonction appelée au moment du clic des boutons
    function filtreprojets(categoryId) {
        fetch('http://localhost:5678/api/works', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        })
        .then(response => response.json())
        .then(projets => {
            const gallery = document.querySelector('.gallery');
            gallery.innerHTML = '';

            projets.filter(project => !categoryId || project.categoryId === categoryId)
            .forEach(project => {
                const item = document.createElement('div');
                const img = document.createElement('img');
                img.src = project.imageUrl;
                img.alt = project.title;
                const figcaption = document.createElement('figcaption');
                figcaption.textContent = project.title;

                item.appendChild(img);
                item.appendChild(figcaption);
                gallery.appendChild(item);
            });
        });
    }
});
