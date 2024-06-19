# Matérial Manageur

## M1 Miage - Architectures Web

### Projet

#### 1. Organisation
Le projet est à faire en binôme. En fin de semestre (la date exacte sera précisée ultérieurement), chaque binôme rendra sur Moodle les éléments suivants :
- Le code de l’application (uniquement votre code et vos données, pas tout le framework)
- Un rapport (≤10 pages) sur votre travail (ce qui a été réalisé, les choix techniques, etc)
- Une documentation de déploiement de votre application (librairies à installer, etc)

NB : un seul dépôt par binôme est suffisant, et n’oubliez pas de préciser les noms des deux étudiants dans le rapport.

Des soutenances de projet auront lieu à une date précisée ultérieurement.

#### 2. Sujet du projet
L’objectif est de développer un site Web permettant au personnel de l'université de gérer le matériel : meubles, téléphones fixes, imprimantes, etc. Le matériel peut être stocké ou utilisé. S'il est stocké, il faut savoir dans quelle salle. S'il est utilisé, il faut aussi savoir dans quelle salle, et à qui le matériel a été confié. Le matériel peut être confié soit à un organisme (par exemple le département informatique), soit à un membre du personnel. Les utilisateurs (organismes ou membres individuels) doivent pouvoir consulter la liste des matériels disponibles, par type. Ils doivent pouvoir demander à se faire attribuer du matériel.

Le site doit au minimum offrir les fonctionnalités suivantes :
- L’administrateur peut ajouter/supprimer un compte utilisateur (organisme ou membre individuel). L’administrateur et les utilisateurs peuvent modifier leur compte (mot de passe, etc).
- Un utilisateur peut :
  1. Consulter les matériels disponibles, par type
  2. Consulter les matériels qui lui ont été attribués
  3. Demander à se faire attribuer un matériel
  4. Demander à rendre un matériel
- L'administrateur peut accepter une demande d'attribution, ou le retour d'un matériel. Il peut aussi ajouter un matériel dans la base, ou en retirer un.

#### 3. Partie optionnelle
On peut développer un composant pour que l’administrateur puisse avoir un tableau de bord du matériel (nombre de matériels par type, matériels entrés ou sortis depuis une certaine date, etc). On peut ajouter des dates de renouvellement sur les matériels (par exemple une imprimante doit être renouvelée tous les 10 ans), avec des alertes à l’administrateur. On peut également ajouter des délais de retour pour certains matériels (par exemple une multiprise doit être ramenée dans la journée), avec là aussi des alertes. On peut ajouter des règles sur les utilisateurs qui les autorisent à se faire attribuer ou pas certains matériels (par exemple seule une institution peut emprunter un meuble, pas un individu).

### Déploiement

Pour installer, il faut copier le dossier de la base de données dans votre dossier parent. Dans ce dossier parent, il faut exécuter les commandes suivantes :

```bash
git clone https://github.com/Rey0313/Stock-management.git
cd stock-management
npm install
```
Une fois que tout cela est fini, il faut lancer la base de données avec la commande suivante :
```bash
mongod --dbpath ../db/
```
Ensuite, dans un autre terminal en parallèle, il faut lancer :
```bash
npm run start
```
Cela va lancer le backend et le frontend.