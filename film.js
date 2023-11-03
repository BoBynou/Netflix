document.addEventListener('DOMContentLoaded', () => {
    const filmsList = document.getElementById('filmList');
    const filmForm = document.getElementById('filmForm');

    function getfilm() {
        fetch('http://localhost:3000/getfilms') // Assurez-vous que l'URL est correcte
            .then((response) => response.json())
            .then((data) => {            
                const filmsList = document.getElementById('filmList'); // Supposons que vous avez un élément avec cet ID
                filmsList.innerHTML = ''; // Effacer le contenu précédent
                data.forEach((film) => {
                    const filmItem = document.createElement('li');
                    filmItem.innerHTML = `
                        <p>${film.nom} ${film.description} (Date de parution: ${film.date_de_parution})</p>
                        <button class="delete-film" data-film-id="${film.id}">Supprimer</button>
                    `;
                    filmsList.appendChild(filmItem);
                });
            })
            .catch((error) => console.error('Erreur lors de la récupération des film :', error));
    }
    
getfilm();

filmsList.addEventListener('click', event => {
    if (event.target.classList.contains('delete-film')) {
        const filmId = event.target.getAttribute('data-film-id');
        deletefilm(filmId);
    }
});

// Écouter la soumission du formulaire d'ajout d'film
filmForm.addEventListener('submit', event => {
    event.preventDefault();
    const filmData = {
        nom: filmForm.filmFirstName.value,
        description: filmForm.filmLastName.value,
        date_de_parution: filmForm.filmBirthDate.value
    };         
    
    // Effectuer une requête POST à l'API pour ajouter un film
    fetch('http://localhost:3000/postfilm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filmData)
    })
    .then(() => {
        getfilm(); // Actualiser la liste des film après l'ajout
    })
    .catch(error => {
        console.error('Erreur lors de l\'ajout de l\'film : ' + error);
    });
});

function deletefilm(filmId) {
    // Effectuer une requête DELETE à l'API
    fetch(`/delfilm/${filmId}`, {
        method: 'DELETE'
    })
    .then(() => {
        getfilm(); // Actualiser la liste des film après la suppression
    })
    .catch(error => {
        console.error('Erreur lors de la suppression de l\'film : ' + error);
    });
}

});