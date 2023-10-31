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
//     // Fonction pour récupérer la liste des acteurs depuis l'API

// function fetchActors() {
//     // Effectuer une requête GET à l'API
//     fetch('/acteurs')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Réponse incorrecte de l\'API');
//             }
//             return response.json();
//         })
//         .then(data => {
//             actorsList.innerHTML = '';
//             data.forEach(actor => {
//                 const actorItem = document.createElement('div');
//                 actorItem.innerHTML = `
//                     <p>${actor.prenom} ${actor.nom} (Date de Naissance: ${actor.date_de_naissance})</p>
//                 `;
//                 actorsList.appendChild(actorItem);
//             });
//         })
//         .catch(error => {
//             console.error('Erreur lors de la récupération des acteurs : ' + error);
//         });
// }

// app.get('/acteurs', (req, res) => {
//     connection.query('SELECT * FROM acteurs', (error, results) => {
//       if (error) {
//         console.error('Erreur lors de la récupération des acteurs : ' + error);
//         res.status(500).json({ error: 'Erreur lors de la récupération des acteurs' });
//       } else {
//         res.json(results);
//       }
//     });
//   });
  
//   // Créer un acteur
//   app.post('/acteurs', (req, res) => {
//     const nouvelActeur = req.body;
//     connection.query('INSERT INTO acteurs SET ?', nouvelActeur, (error, result) => {
//       if (error) {
//         console.error('Erreur lors de la création de l\'acteur : ' + error);
//         res.status(500).json({ error: 'Erreur lors de la création de l\'acteur' });
//       } else {
//         res.status(201).json({ message: 'Acteur créé avec succès' });
//       }
//     });
//   });
  
//   // Récupérer un acteur spécifique par ID
//   app.get('/acteurs/:id', (req, res) => {
//     const acteurId = req.params.id;
//     connection.query('SELECT * FROM acteurs WHERE id = ?', [acteurId], (error, results) => {
//       if (error) {
//         console.error('Erreur lors de la récupération de l\'acteur : ' + error);
//         res.status(500).json({ error: 'Erreur lors de la récupération de l\'acteur' });
//       } else if (results.length === 0) {
//         res.status(404).json({ message: 'Acteur non trouvé' });
//       } else {
//         res.json(results[0]);
//       }
//     });
//   });
  
//   // Modifier un acteur spécifique par ID
//   app.put('/acteurs/:id', (req, res) => {
//     const acteurId = req.params.id;
//     const nouveauActeur = req.body;
//     connection.query('UPDATE acteurs SET ? WHERE id = ?', [nouveauActeur, acteurId], (error, result) => {
//       if (error) {
//         console.error('Erreur lors de la modification de l\'acteur : ' + error);
//         res.status(500).json({ error: 'Erreur lors de la modification de l\'acteur' });
//       } else {
//         res.json({ message: 'Acteur modifié avec succès' });
//       }
//     });
//   });
  
//   // Supprimer un acteur spécifique par ID
//   app.delete('/acteurs/:id', (req, res) => {
//     const acteurId = req.params.id;
//     connection.query('DELETE FROM acteurs WHERE id = ?', [acteurId], (error, result) => {
//       if (error) {
//         console.error('Erreur lors de la suppression de l\'acteur : ' + error);
//         res.status(500).json({ error: 'Erreur lors de la suppression de l\'acteur' });
//       } else {
//         res.json({ message: 'Acteur supprimé avec succès' });
//       }
//     });
//   });