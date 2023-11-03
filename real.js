document.addEventListener('DOMContentLoaded', () => {
    const realsList = document.getElementById('realsList');
    const realForm = document.getElementById('realForm');

    function getreals() {
        fetch('http://localhost:3000/getreal') // Assurez-vous que l'URL est correcte
            .then((response) => response.json())
            .then((data) => {  
                const realsList = document.getElementById('realsList'); // Supposons que vous avez un élément avec cet ID
                realsList.innerHTML = ''; // Effacer le contenu précédent
                data.forEach((real) => {
                    const realItem = document.createElement('li');
                    realItem.innerHTML = `
                        <p>${real.prenom} ${real.nom} (Date de Naissance: ${real.date_de_naissance})</p>
                        <button class="delete-real" data-real-id="${real.id}">Supprimer</button>
                    `;
                    realsList.appendChild(realItem);
                });
            })
            .catch((error) => console.error('Erreur lors de la récupération des reals :', error));
    }
    
getreals();

realsList.addEventListener('click', event => {
    if (event.target.classList.contains('delete-real')) {
        const realId = event.target.getAttribute('data-real-id');
        deletereal(realId);
    }
});

// Écouter la soumission du formulaire d'ajout d'real
realForm.addEventListener('submit', event => {
    event.preventDefault();
    const realData = {
        prenom: realForm.realFirstName.value,
        nom: realForm.realLastName.value,
        date_de_naissance: realForm.realBirthDate.value
    };         
    
    // Effectuer une requête POST à l'API pour ajouter un real
    fetch('http://localhost:3000/postreals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(realData)
    })
    .then(() => {
        getreals(); // Actualiser la liste des reals après l'ajout
    })
    .catch(error => {
        console.error('Erreur lors de l\'ajout de l\'real : ' + error);
    });
});

function deletereal(realId) {
    console.log(realId);
    // Effectuer une requête DELETE à l'API
    fetch(`/delreals/${realId}`, {
        method: 'DELETE'
    })
    .then(() => {
        getreals(); // Actualiser la liste des reals après la suppression
    })
    .catch(error => {
        console.error('Erreur lors de la suppression de l\'real : ' + error);
    });
}

});