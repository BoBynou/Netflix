document.addEventListener('DOMContentLoaded', () => {
        const actorsList = document.getElementById('actorsList');
        const actorForm = document.getElementById('actorForm');

        function getActeurs() {
            fetch('http://localhost:3000/getActeurs') // Assurez-vous que l'URL est correcte
                .then((response) => response.json())
                .then((data) => {            
                    const actorsList = document.getElementById('actorsList'); // Supposons que vous avez un élément avec cet ID
                    actorsList.innerHTML = ''; // Effacer le contenu précédent
                    data.forEach((acteur) => {
                        const actorItem = document.createElement('li');
                        actorItem.innerHTML = `
                            <p>${acteur.prenom} ${acteur.nom} (Date de Naissance: ${acteur.date_de_naissance})</p>
                            <button class="delete-actor" data-actor-id="${acteur.id}">Supprimer</button>
                        `;
                        actorsList.appendChild(actorItem);
                    });
                })
                .catch((error) => console.error('Erreur lors de la récupération des acteurs :', error));
        }
        
    getActeurs();

    actorsList.addEventListener('click', event => {
        if (event.target.classList.contains('delete-actor')) {
            const actorId = event.target.getAttribute('data-actor-id');
            deleteActor(actorId);
        }
    });

    // Écouter la soumission du formulaire d'ajout d'acteur
    actorForm.addEventListener('submit', event => {
        event.preventDefault();
        const actorData = {
            prenom: actorForm.actorFirstName.value,
            nom: actorForm.actorLastName.value,
            date_de_naissance: actorForm.actorBirthDate.value
        };         
        
        // Effectuer une requête POST à l'API pour ajouter un acteur
        fetch('http://localhost:3000/postActeurs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(actorData)
        })
        .then(() => {
            getActeurs(); // Actualiser la liste des acteurs après l'ajout
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout de l\'acteur : ' + error);
        });
    });

    function deleteActor(actorId) {
        // Effectuer une requête DELETE à l'API
        fetch(`/delActeurs/${actorId}`, {
            method: 'DELETE'
        })
        .then(() => {
            getActeurs(); // Actualiser la liste des acteurs après la suppression
        })
        .catch(error => {
            console.error('Erreur lors de la suppression de l\'acteur : ' + error);
        });
    }

});