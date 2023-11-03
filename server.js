const mysql = require('mysql2');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
app.use(express.json());

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

app.get('/getActeurs', (req, res) => {
  const query = 'SELECT * FROM  acteurs';
  bddConnexion.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

  app.post('/postActeurs', (req, res) => {
    const nouvelActeur = req.body;
    const query = 'INSERT INTO acteurs (nom, prenom, date_de_naissance) VALUES (?, ?, ?)';
    const values = [nouvelActeur.nom, nouvelActeur.prenom, nouvelActeur.date_de_naissance];

    bddConnexion.query(query, values, (error, result) => {
      if (error) {
        console.error('Erreur lors de la création de l\'acteur : ' + error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'acteur' });
      } else {
        res.status(201).json({ message: 'Acteur créé avec succès' });
      }
    });
  });

  app.delete('/delActeurs/:id', (req, res) => {
    const acteurId = req.params.id;
    bddConnexion.query('DELETE FROM acteurs WHERE id = ?', [acteurId], (error, result) => {
        if (error) {
            console.error('Erreur lors de la suppression de l\'acteur : ' + error);
            res.status(500).json({ error: 'Erreur lors de la suppression de l\'acteur' });
        } else {
            res.json({ message: 'Acteur supprimé avec succès' });
        }
    });
});

// Récupérer une collection de réalisateurs
app.get('/getreal', (req, res) => {
    bddConnexion.query('SELECT * FROM realisateurs', (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération des réalisateurs : ' + error);
        res.status(500).json({ error: 'Erreur lors de la récupération des réalisateurs' });
      } else {
        res.json(results);
      }
    });
  });
  
  // Créer un réalisateur
  app.post('/postreals', (req, res) => {
    const nouvelReal = req.body;
    const query = 'INSERT INTO realisateurs (nom, prenom, date_de_naissance) VALUES (?, ?, ?)';
    const values = [nouvelReal.nom, nouvelReal.prenom, nouvelReal.date_de_naissance];

    bddConnexion.query(query, values, (error, result) => {
      if (error) {
        console.error('Erreur lors de la création du réal : ' + error);
        res.status(500).json({ error: 'Erreur lors de la création du réal' });
      } else {
        res.status(201).json({ message: 'Réal créé avec succès' });
      }
    });
  });
  
  // Récupérer un réalisateur spécifique par ID
  app.get('/realisateurs/:id', (req, res) => {
    const realisateurId = req.params.id;
    bddConnexion.query('SELECT * FROM realisateurs WHERE id = ?', [realisateurId], (error, results) => {
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
    bddConnexion.query('UPDATE realisateurs SET ? WHERE id = ?', [nouveauRealisateur, realisateurId], (error, result) => {
      if (error) {
        console.error('Erreur lors de la modification du réalisateur : ' + error);
        res.status(500).json({ error: 'Erreur lors de la modification du réalisateur' });
      } else {
        res.json({ message: 'Réalisateur modifié avec succès' });
      }
    });
  });
  
  // Supprimer un réalisateur spécifique par ID
  app.delete('/delreals/:id', (req, res) => {
    const realisateurId = req.params.id;
    bddConnexion.query('DELETE FROM realisateurs WHERE id = ?', [realisateurId], (error, result) => {
      if (error) {
        console.error('Erreur lors de la suppression du réalisateur : ' + error);
        res.status(500).json({ error: 'Erreur lors de la suppression du réalisateur' });
      } else {
        res.json({ message: 'Réalisateur supprimé avec succès' });
      }
    });
  });
  
// Récupérer une collection de films
app.get('/getfilms', (req, res) => {
    bddConnexion.query('SELECT * FROM films', (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération des films : ' + error);
        res.status(500).json({ error: 'Erreur lors de la récupération des films' });
      } else {
        res.json(results);
      }
    });
  });
  
  // Créer un film
  app.post('/postfilm', (req, res) => {
    const nouveauFilm = req.body;
    console.log(nouveauFilm);
    const query = 'INSERT INTO films (nom, description, date_de_parution) VALUES (?, ?, ?)';
    const values = [nouveauFilm.nom, nouveauFilm.description, nouveauFilm.date_de_parution];   
    bddConnexion.query(query, values, (error, result) => {
      if (error) {
        console.error('Erreur lors de la création du film : ' + error);
        res.status(500).json({ error: 'Erreur lors de la création du film' });
      } else {
        res.status(201).json({ message: 'FIlm créé avec succès' });
      }
    });
  });
  
  // Récupérer un film spécifique par ID
  app.get('/films/:id', (req, res) => {
    const filmId = req.params.id;
    bddConnexion.query('SELECT * FROM films WHERE id = ?', [filmId], (error, results) => {
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
    bddConnexion.query('UPDATE films SET ? WHERE id = ?', [nouveauFilm, filmId], (error, result) => {
      if (error) {
        console.error('Erreur lors de la modification du film : ' + error);
        res.status(500).json({ error: 'Erreur lors de la modification du film' });
      } else {
        res.json({ message: 'Film modifié avec succès' });
      }
    });
  });
  
  // Supprimer un film spécifique par ID
  app.delete('/delfilm/:id', (req, res) => {
    const filmId = req.params.id;
    bddConnexion.query('DELETE FROM films WHERE id = ?', [filmId], (error, result) => {
      if (error) {
        console.error('Erreur lors de la suppression du film : ' + error);
        res.status(500).json({ error: 'Erreur lors de la suppression du film' });
      } else {
        res.json({ message: 'Film supprimé avec succès' });
      }
    });
  });
  