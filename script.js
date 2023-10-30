const refreshButton = document.getElementById('refreshButton');
const actorsList = document.getElementById('actorsList');

// Fonction pour récupérer la liste des acteurs depuis votre API
function fetchActors() {
    fetch('/acteurs')
        .then(response => response.json())
        .then(data => {
            actorsList.innerHTML = '';
            data.forEach(actor => {
                const actorItem = document.createElement('li');
                actorItem.textContent = `${actor.prenom} ${actor.nom} (Date de Naissance : ${actor.date_de_naissance})`;
                actorsList.appendChild(actorItem);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des acteurs : ' + error);
        });
}

// Actualiser la liste des acteurs lorsqu'on clique sur le bouton
refreshButton.addEventListener('click', fetchActors);

// Appeler fetchActors lors du chargement initial de la page
fetchActors();
