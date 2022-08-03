# Instynct Blueprint 5 [Webpack]

**_Theme Wordpress_**

## Technologies web utilisées

- [ES6](https://github.com/lukehoban/es6features#readme) for JavaScript (transpiling with [Babel](https://babeljs.io/) and linting with [ESLint](https://eslint.org/))

* [SASS](http://sass-lang.com/) preprocessor for CSS with [SASS Guidelines](https://sass-guidelin.es/#the-7-1-pattern)

- [Gulp 4](https://gulpjs.com/)

* [Webpack 5](https://webpack.js.org/) to manage, compile and optimize the theme's asset

## Librairies incluses

- [jQuery](https://jquery.com/)

- [ScrollMagic](https://scrollmagic.io/) - [Animation.gsap](https://scrollmagic.io/docs/animation.GSAP.html) - [GSAP](https://greensock.com/gsap/)

- [Flickity](https://flickity.metafizzy.co/)

## Pré-requis

- Node 12

- NPM 6

- Gulp 4

## Setup

- Au début d'un nouveau projet, choisir le blueprint a la création d'un nouveau site dans flywheel.

- Ensuite ouvrir le dossier du theme (blueprint)

Pour installer les dépendances, il faut lancer le script ci dessous dans le terminal :

npm install

Pour lancer le watcher et browsersync :

npm run start

Avant d'envoyer en production, il faut lancer ce script pour minimiser les assets :

npm run build

## Arborescence

Les fichiers front end a modifier se retrouvent dans le dossier suivant

    le_theme/assets/src

Ils sont compiler dans le dossier :

    le_theme/assets/dist

## Comment installer un module Javascript

_pour savoir quel est le nom du module, ce référer a:_
[https://www.npmjs.com/](https://www.npmjs.com/)

Pour installer un module Javascript il faut l'installer dans les dépendance du projet avec NPM.
Par exemple, si je veux installer P5.JS dans mon projet pour etre en mesure d'utiliser le canvas je vais devoir rouler la commande suivante dans le terminal:

    npm install flickity

Le module sera ensuite installé dans le dossier node_modules. Donc pas besoin d'aller manuellement chercher le fichier de la librairie ou de faire un lien vers le CDN.

## Comment faire un module Javascript

Dans notre cas on va créer un fichier(module) qui va utiliser la librairie de carousel flickity.

On débute par créer le fichier \_slider.js dans le dossier src/js.

Ensuite, dans le fichier du module on commencer par importer ce que l'on a de besoin pour le faire fonctionner, dans notre cas c'est la librairie Flickity. donc en haut completement du fichier on ajoute:

    import  Flickity  from  'flickity';

On créer ensuite une classe Slider qui va gerer notre module. dans cette classe il y a un constructeur. on peut mettre les variables globale de l'objet à l'interieur ou simplement lancer la fonction.

    class  Slider {
        constructor() {
    	    this.elem  =  document.querySelector('.formation-carousel');
    	    this.init();
        }
    }

ensuite sous le constructeur mais a l'interieur de la classe on créer notre fonction:

    init() {
        const flkty  =  new  Flickity(this.elem, {
    	    // options
    	    cellAlign:  'left',
    	    contain:  true,
        });
    }

Pour terminer on exporte notre module pour etre en mesure d'y avoir acces dans le main.js. On ajoute donc cette ligne de code a la fin du fichier a l'exterieur de la classe.

    export  default  Slider;

## Comment ajouter un module Javascript au main.js

Pour utiliser un module JS dans votre projet il faut d'abord le lier au fichier main.js dans

    le_theme/assets/src/main.js

Dans le blueprint, Javascript utilise la syntaxe ES6 et les modules sont considéré comme étant des Classes.

Donc si je veux utiliser Flickity pour faire un slider, par exemple :

En haut du fichier main.js on ajoute la ligne de code suivante:

    import  Slider  from  './_slider';

**\***Slider étant le nom de classe que je vais attribuer au module**\*
\*\*\***\_slick_slider.js étant le fichier du module créer précédemment pour faire mon carousel\*\*\*

Dans la fonction init() du main.js on ajout une fonction qui va lancer notre module

    function  initSlider() {
        return  new  Slider();
    }

Dans cette fonction on créer une instance du module slider. Juste dessous on appelle cette meme fonction comme suit:

    initSlider();

## BrowserSync

Pour activer BrowserSync lors de la compilation des assets, il faut allez dans

    le_theme>gulp>core>config>browser-sync.js

Ensuite modifier le dernier block de code comme suit:

        module.exports = deepMerge({

        proxy: 'url_du_site.local',

        host: 'url_du_site.local',

        open: 'external',

    });
