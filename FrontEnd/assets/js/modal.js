document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5678/api/works', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(projets => {
        const gallery = document.querySelector('.modalGallery1');
        
        projets.forEach(project => {
            const item = document.createElement('div');
            item.className = 'image-wrapper';

            const img = document.createElement('img');
            img.src = project.imageUrl;
            img.alt = project.title;

            const deleteIcon = document.createElement('i');
            deleteIcon.className = 'fa-solid fa-trash-can delete-icon';
            deleteIcon.onclick = () => deleteImage(project.id, item);

            item.appendChild(img);
            item.appendChild(deleteIcon);
            gallery.appendChild(item);
        });
    });
});

// Click suppression d'une image
function deleteImage(projectId, item) {
    const token = localStorage.getItem('token');

    if (!token) {
        alert("Vous n'êtes pas autorisé à effectuer cette action");
        return;
    }

    fetch(`http://localhost:5678/api/works/${projectId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            item.remove();
        } else {
            alert('Erreur lors de la suppression');
        }
    })
    .catch(error => {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression');
    });
}


// Click fermeture de mon modal
document.querySelectorAll('.modal').forEach(modal => {
    modal.querySelectorAll('.close__modal').forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display = 'none';
            window.location.reload();
        });
    });

    modal.addEventListener('click', (event) => {
        const clickoutside = modal.querySelector('.modal-wrapper').contains(event.target);
        if (!clickoutside) {
            modal.style.display = 'none';
            window.location.reload();
        }
    });
});



// Click ouverture de mon modal
const ouvertureModal=document.querySelector('.modal_modifier')

ouvertureModal.addEventListener('click', () => {
    
    const modal = document.getElementById('modalAjout');

    modal.style.display = 'flex';
    });


// Passer à la deuxieme modal
    const ajouterPhotoBtn = document.querySelector('.modal__one-addbutton');

ajouterPhotoBtn.addEventListener('click', () => {
    const modalAjout = document.getElementById('modalAjout');
    const modalAjoutPhoto = document.getElementById('modalAjoutPhoto');

    modalAjout.style.display = 'none';

    modalAjoutPhoto.style.display = 'flex';
});


// Click retour en arrière
const retourModal=document.querySelector('.retourModal')

retourModal.addEventListener('click', () => {
    
    const modal = document.getElementById('modalAjout');

    modalAjout.style.display = 'flex';

    modalAjoutPhoto.style.display = 'none';
    });


// Ajout des catégories dans le formulaire
fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(dataCategories => {
            const select = document.getElementById("photoCategories");
            const emptyOption = document.createElement('option');
            select.appendChild(emptyOption);

            dataCategories.forEach((category) => {
                const option = document.createElement('option');
                option.innerText = category.name;
                option.value = category.id;
                select.appendChild(option);
            });
        });

        
// Bouton Valider passe au vert

        function verifForm() {
            const inputImage = document.getElementById('addPhoto').files.length > 0;
            const titleProject = document.getElementById('photoTitle').value.trim() !== '';
            const categoryProject = document.getElementById('photoCategories').value !== '';
        
            const validateButton = document.getElementById('validateProject');
        
            if (inputImage && titleProject && categoryProject) {
                validateButton.style.backgroundColor = '#1D6154';
                validateButton.style.cursor = 'pointer';
                validateButton.disabled = false;
            } else {
                validateButton.style.backgroundColor = '';
                validateButton.disabled = true;
            }
        }
        
        document.getElementById('addPhoto').addEventListener('input', verifForm);
        document.getElementById('photoTitle').addEventListener('input', verifForm);
        document.getElementById('photoCategories').addEventListener('change', verifForm);

//Ajout image

document.getElementById('addPhoto').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('imagePreview');
            preview.src = e.target.result;
            preview.style.display = 'block';
            preview.style.width = '100%';
            preview.style.height = '100%';
            
// Masquer l'icône et le texte
            document.querySelector('.AjoutIcon').style.display = 'none';
            document.querySelector('.addImage').style.display = 'none';
            document.querySelector('.ajoutImageModal span').style.display = 'none';
            document.querySelector('.format').style.display = 'none';
            
        };
        reader.readAsDataURL(file);
    }
});

// Ajout d'un projet

        function ajouterProjet(event) {
            event.preventDefault();
        
            const token = localStorage.getItem('token');
            if (!token) {
                alert("Vous n'êtes pas autorisé à effectuer cette action");
                return;
            }
        
            const inputImage = document.getElementById('addPhoto').files[0];
            const titleProject = document.getElementById('photoTitle').value.trim();
            const categoryProject = document.getElementById('photoCategories').value;
        
            const formData = new FormData();
            formData.append('image', inputImage);
            formData.append('title', titleProject);
            formData.append('category', categoryProject);
        
            fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    const gallery = document.querySelector('.modalGallery1');
                    const item = document.createElement('div');
                    item.className = 'image-wrapper';
        
                    const img = document.createElement('img');
                    img.src = data.imageUrl;
                    img.alt = titleProject;
        
                    const deleteIcon = document.createElement('i');
                    deleteIcon.className = 'fa-solid fa-trash-can delete-icon';
                    deleteIcon.onclick = () => deleteImage(data.id, item);
        
                    item.appendChild(img);
                    item.appendChild(deleteIcon);
                    gallery.appendChild(item);
        
                    alert('Projet ajouté avec succès');
                    window.location.reload();
                } else {
                    alert('Erreur lors de l\'ajout du projet');
                }
            })          
        }
        
        document.getElementById('validateProject').addEventListener('click', ajouterProjet);