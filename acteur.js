document.addEventListener('DOMContentLoaded', () => {
    const actorsList = document.getElementById('actorsList');
    const actorForm = document.getElementById('actorForm');

    // Fonction pour récupérer la liste des acteurs depuis l'API
    function fetchActors() {
        // Effectuer une requête GET à l'API
        fetch('/acteurs')
            .then(response => response.json())
            .then(data => {
                actorsList.innerHTML = '';
                data.forEach(actor => {
                    const actorItem = document.createElement('div');
                    actorItem.innerHTML = `
                        <p>${actor.prenom} ${actor.nom} (Date de Naissance: ${actor.date_de_naissance})</p>
                    `;
                    actorsList.appendChild(actorItem);
                });
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des acteurs : ' + error);
            });
    }

    // Écouter la soumission du formulaire d'ajout d'acteur
    actorForm.addEventListener('submit', event => {
        event.preventDefault();
        const actorData = {
            prenom: actorForm.actorFirstName.value,
            nom: actorForm.actorLastName.value,
            date_de_naissance: actorForm.actorBirthDate.value
        };

        // Effectuer une requête POST à l'API pour ajouter un acteur
        fetch('/acteurs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(actorData)
        })
        .then(() => {
            fetchActors(); // Actualiser la liste des acteurs après l'ajout
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout de l\'acteur : ' + error);
        });
    });

    // Appeler fetchActors lors du chargement initial de la page
    fetchActors();
});
