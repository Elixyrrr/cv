{
  "title": "Jeu d’échecs en ligne",
  "date": "2025-05-15T12:00:00",
  "range": "Septembre – Décembre 2024",
  "image": "/img/skills/chess2.png",
  "description": "Développement d’un service web de jeu d’échecs permettant à deux joueurs humains de s’affronter, avec sauvegarde/reprise de parties et options de rejouer chaque coup.",
  "tags": ["Node.js", "Express", "Socket.IO", "MongoDB", "REST", "Machine Learning"],
  "fact": "",
  "featured": false
}

## Contexte et objectifs

Le projet consistait à créer une **application web de jeu d'échecs** conforme à une architecture **REST** (Representational State Transfer) et au pattern **MVC** (Modèle-Vue-Contrôleur). \
L'objectif était de permettre à deux joueurs de s'affronter en temps réel avec des fonctionnalités avancées de sauvegarde et de reprise de parties.

## Stack technique
Pour ce faire on a utilisé:

- **Node.js & Express** pour le serveur backend et l'API REST
- **Socket.IO** pour la communication temps réel entre joueurs  
- **MongoDB** pour la persistance des parties et historique des coups
- **HTML/CSS/JavaScript** pour l'interface utilisateur côté client
- **Architecture MVC** pour la structuration du code
- **IA avec 2 niveaux de difficultés** développée en bonus pour jouer contre l'ordinateur

![](/img/skills/echecs.png#floatrighte)

## Fonctionnalités principales

1. **Jeu en temps réel**  
  - Affrontement entre deux joueurs humains via Socket.IO
  - Synchronisation des mouvements en direct
2. **Système de comptes utilisateurs** : Création de compte, authentification et gestion de profil
3. **Recherche de joueurs** : Système de recherche pour trouver et défier d'autres joueurs
4. **Statistiques** : Visualisation des stats complètes de chaque joueur (victoires, défaites, parties jouées)
5. **Sauvegarde/Reprise** : Persistance complète des parties en base MongoDB
6. **Historique des coups** : Possibilité de rejouer chaque coup d'une partie
7. **Fonctionnalités annexes** : Chronomètre, demande de partie, système de notifications
8. **IA bonus** : Mode solo contre l'ordinateur avec algorithme minmax et élagage alpha beta adaptatif.

## Points forts

- **Architecture REST** : API bien structurée suivant les standards REST
- **Temps réel** : Communication fluide grâce à Socket.IO  
- **Persistance** : Sauvegarde complète permettant de reprendre les parties à tout moment
- **Expérience utilisateur** : Interface intuitive grace à la bibliothèque chess.js

## Points faibles
- **Hébergement** : Le site prend un peu de temps à se lancer sur Render (serveur gratuit)
- **IA limitée** : L'intelligence artificielle peut être amélioré 
- **Interface** : Frontend à améliorer grandement

## Démonstration

Cliquez **[ici](https://chessgame-dnw8.onrender.com/)** pour accéder au jeu en ligne\
*Note : Le premier chargement peut prendre du temps

Auteur: Ilyes Khedhiri , Lucas Jesus , Alix Tieo