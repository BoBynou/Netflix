const mysql = require('mysql2')
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const bddConnexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'netflix'
})

bddConnexion.connect((err) => {
    if (err){
        console.error('Erreur de connexion à la bdd');
        return;
    }
    console.log('Connexion BDD ok');
});

app.use(express.static(__dirname));

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

// app.get('/acteurs', (req, res) => {
//     const query = 'SELECT * FROM acteurs';
//     bddConnexion.query(query, (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     });
// });
  
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

app.get('/acteurs', (req, res) => {
    connection.query('SELECT * FROM acteurs', (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération des acteurs : ' + error);
        res.status(500).json({ error: 'Erreur lors de la récupération des acteurs' });
      } else {
        res.json(results);
      }
    });
  });
  
  // Créer un acteur
  app.post('/acteurs', (req, res) => {
    const nouvelActeur = req.body;
    connection.query('INSERT INTO acteurs SET ?', nouvelActeur, (error, result) => {
      if (error) {
        console.error('Erreur lors de la création de l\'acteur : ' + error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'acteur' });
      } else {
        res.status(201).json({ message: 'Acteur créé avec succès' });
      }
    });
  });
  
  // Récupérer un acteur spécifique par ID
  app.get('/acteurs/:id', (req, res) => {
    const acteurId = req.params.id;
    connection.query('SELECT * FROM acteurs WHERE id = ?', [acteurId], (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération de l\'acteur : ' + error);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'acteur' });
      } else if (results.length === 0) {
        res.status(404).json({ message: 'Acteur non trouvé' });
      } else {
        res.json(results[0]);
      }
    });
  });
  
  // Modifier un acteur spécifique par ID
  app.put('/acteurs/:id', (req, res) => {
    const acteurId = req.params.id;
    const nouveauActeur = req.body;
    connection.query('UPDATE acteurs SET ? WHERE id = ?', [nouveauActeur, acteurId], (error, result) => {
      if (error) {
        console.error('Erreur lors de la modification de l\'acteur : ' + error);
        res.status(500).json({ error: 'Erreur lors de la modification de l\'acteur' });
      } else {
        res.json({ message: 'Acteur modifié avec succès' });
      }
    });
  });
  
  // Supprimer un acteur spécifique par ID
  app.delete('/acteurs/:id', (req, res) => {
    const acteurId = req.params.id;
    connection.query('DELETE FROM acteurs WHERE id = ?', [acteurId], (error, result) => {
      if (error) {
        console.error('Erreur lors de la suppression de l\'acteur : ' + error);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'acteur' });
      } else {
        res.json({ message: 'Acteur supprimé avec succès' });
      }
    });
  });

// Récupérer une collection de réalisateurs
app.get('/realisateurs', (req, res) => {
    connection.query('SELECT * FROM realisateurs', (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération des réalisateurs : ' + error);
        res.status(500).json({ error: 'Erreur lors de la récupération des réalisateurs' });
      } else {
        res.json(results);
      }
    });
  });
  
  // Créer un réalisateur
  app.post('/realisateurs', (req, res) => {
    const nouveauRealisateur = req.body;
    connection.query('INSERT INTO realisateurs SET ?', nouveauRealisateur, (error, result) => {
      if (error) {
        console.error('Erreur lors de la création du réalisateur : ' + error);
        res.status(500).json({ error: 'Erreur lors de la création du réalisateur' });
      } else {
        res.status(201).json({ message: 'Réalisateur créé avec succès' });
      }
    });
  });
  
  // Récupérer un réalisateur spécifique par ID
  app.get('/realisateurs/:id', (req, res) => {
    const realisateurId = req.params.id;
    connection.query('SELECT * FROM realisateurs WHERE id = ?', [realisateurId], (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération du réalisateur : ' + error);
        res.status(500).json({ error: 'Erreur lors de la récupération du réalisateur' });
      } else if (results.length === 0) {
        res.status(404).json({ message: 'Réalisateur non trouvé' });
      } else {
        res.json(results[0]);
      }
    });
  });
  
  // Modifier un réalisateur spécifique par ID
  app.put('/realisateurs/:id', (req, res) => {
    const realisateurId = req.params.id;
    const nouveauRealisateur = req.body;
    connection.query('UPDATE realisateurs SET ? WHERE id = ?', [nouveauRealisateur, realisateurId], (error, result) => {
      if (error) {
        console.error('Erreur lors de la modification du réalisateur : ' + error);
        res.status(500).json({ error: 'Erreur lors de la modification du réalisateur' });
      } else {
        res.json({ message: 'Réalisateur modifié avec succès' });
      }
    });
  });
  
  // Supprimer un réalisateur spécifique par ID
  app.delete('/realisateurs/:id', (req, res) => {
    const realisateurId = req.params.id;
    connection.query('DELETE FROM realisateurs WHERE id = ?', [realisateurId], (error, result) => {
      if (error) {
        console.error('Erreur lors de la suppression du réalisateur : ' + error);
        res.status(500).json({ error: 'Erreur lors de la suppression du réalisateur' });
      } else {
        res.json({ message: 'Réalisateur supprimé avec succès' });
      }
    });
  });
  
// Récupérer une collection de films
app.get('/films', (req, res) => {
    connection.query('SELECT * FROM films', (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération des films : ' + error);
        res.status(500).json({ error: 'Erreur lors de la récupération des films' });
      } else {
        res.json(results);
      }
    });
  });
  
  // Créer un film
  app.post('/films', (req, res) => {
    const nouveauFilm = req.body;
    connection.query('INSERT INTO films SET ?', nouveauFilm, (error, result) => {
      if (error) {
        console.error('Erreur lors de la création du film : ' + error);
        res.status(500).json({ error: 'Erreur lors de la création du film' });
      } else {
        res.status(201).json({ message: 'Film créé avec succès' });
      }
    });
  });
  
  // Récupérer un film spécifique par ID
  app.get('/films/:id', (req, res) => {
    const filmId = req.params.id;
    connection.query('SELECT * FROM films WHERE id = ?', [filmId], (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération du film : ' + error);
        res.status(500).json({ error: 'Erreur lors de la récupération du film' });
      } else if (results.length === 0) {
        res.status(404).json({ message: 'Film non trouvé' });
      } else {
        res.json(results[0]);
      }
    });
  });
  
  // Modifier un film spécifique par ID
  app.put('/films/:id', (req, res) => {
    const filmId = req.params.id;
    const nouveauFilm = req.body;
    connection.query('UPDATE films SET ? WHERE id = ?', [nouveauFilm, filmId], (error, result) => {
      if (error) {
        console.error('Erreur lors de la modification du film : ' + error);
        res.status(500).json({ error: 'Erreur lors de la modification du film' });
      } else {
        res.json({ message: 'Film modifié avec succès' });
      }
    });
  });
  
  // Supprimer un film spécifique par ID
  app.delete('/films/:id', (req, res) => {
    const filmId = req.params.id;
    connection.query('DELETE FROM films WHERE id = ?', [filmId], (error, result) => {
      if (error) {
        console.error('Erreur lors de la suppression du film : ' + error);
        res.status(500).json({ error: 'Erreur lors de la suppression du film' });
      } else {
        res.json({ message: 'Film supprimé avec succès' });
      }
    });
  });
  