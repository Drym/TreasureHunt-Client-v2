# TreasureHunt-Client

## Comment installer et exécuter le client

### Pré-requis
- git
- npm
- node
- bower

### Lancement
- Clonez le repository du client avec la commande :
`git clone https://github.com/Drym/TreasureHunt-Client-v2.git`
- Allez dans le répertoire `public/js/factory/factory.js` et ramplacez l'adresse IP heroku par :
`http://localhost:8080`
- Lancez la commande suivante pour installer les dépendances et pour lancer le serveur web :
`npm start`
- Ouvrez un browser et rendez-vous à l’adresse : 
`http://localhost:3000/`

## Comment installer et exécuter le serveur

### Pré-requis
- git
- npm
- Node.js
- mongo

### Lancement
- On commence par cloner le repository (https://github.com/ktung/TreasureHunt-Server)
- Une fois cela fait, on effectue la commande `npm install` afin d’installer toutes les dépendances du projet
- Modifier la variable dans views/layouts/main.handlebars (commenter ou décommenter en fonction de là où on veut deployer le serveur L33-34).
- Lancer le service mongo sur le serveur via la commande `sudo service mongod start`
- Il suffit ensuite d’effectuer un `node app.js` dans le dossier afin de lancer le serveur sur le port 8080


## Points forts et points faibles

- Points forts :
	- Totalement en temps réel
	- Bon découpage du code qui facilite la maintenance
	- Exposition d’interfaces permettant de facilement intégrer le serveur à d’autres clients / administrations
	- Integration continue en place
	
- Points faibles :
	- Peu de tests 
	- Peu voir pas de sécurité côté serveur
	- Logging basique

## Répartition du travail

- Théo Donzelle :
	- Mise en place de la connexion par des sockets avec le serveur
	- Réalisation du chat côté client
	- Aide sur la gestion de la map et des coordonnées
	- Gestion du local storage
- Loïc Potages :
	- Déroulement du jeu via les sockets node.js
		- Gestion du déroulement des énigmes / zones / positions des joueurs
	- Interfaces REST pour les élements du serveur
		- Ajout / récuperation de zones, enigmes
	- Modèles et interactions base de données 
- Lucas Sauvage : 
	- Formulaire de connexion
	- Affichage et gestion de la map
	- Affichage et gestion des énigmes
	- Affichage des informations
	- Gestion des coordonnées
- Pascal Tung :
	- Integration avec Travis
	- Outils d’administration et de validation
	- Gestion des scores
	- Chat node.js
