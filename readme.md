# Doorframe
## Là où l'on mesure son progrès

## Installation
```sh
git clone https://github.com/millette/doorframe.git
cd doorframe
./init.sh

```

## Éditions des templates
Dans templates/

Puis lancer ```./compile-templates.sh``` pour compiler les templates.

## *Pusher* un *design doc*
Le projet est séparé en 3 *design docs*, en partie à cause de la
taille des attachments (MathJax est très gros).

* cdb.doc/ contient notre code
* app.doc/ contient MathJax
* js.doc/ contient Foundation, jQuery, etc.

Normalement, nos changements devraient se faire dans cdb.doc/

## CouchApp
Notre CouchApp se trouve dans cdb.doc/

```
cdb.doc
├── _attachments
│   ├── css
│   │   └── style.css
│   └── js
│       ├── lodash.custom.js *
│       └── main.js
├── _id
├── language
├── lists
│   └── profdocs.js
├── rewrites.json
├── shows
│   ├── accueil.js
│   ├── docedit.js
│   ├── doc.js
│   └── prof.js
├── updates
│   └── doc.js
├── validate_doc_update.js
└── views
    ├── lib
    │   └── templates.js *
    └── profdocs
        └── map.js
```

Les fichiers ```templates.js``` et ```lodash.custom.js``` sont générés
par les scripts compile-templates.sh et compile-lodash.sh respectivement.

_attachments/ contient nos fichiers css et JavaScript.

lists/ contient les fonctions pour afficher un ensemble de docs.

shows/ contient les fonctions pour afficher un doc à la fois.

views/ contient nos indexes secondaires (pour les fonctions ```lists```).

updates/ contient les fonctions de mises à jour de docs.

validate_doc_updates.js contient la fonction d'autorisation.

rewrites.json contient les routes (chemin d'URL publics).
