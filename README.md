# Roadbook

<!-- Utiliser du HTML (avec l'attribut "align" obsolète) pour faire flotter
     l'image à droite. -->
<!-- markdownlint-disable-next-line no-inline-html-->
<img src="src/img/logo.svg" align="right" alt="">

[![firefox][img-firefox]][link-firefox]
[![build][img-build]][link-build]
[![coverage][img-coverage]][link-coverage]

> WebExtension pour extraire un roadbook d'un itinéraire Google Maps.

Roadbook est une extension pour le navigateur Firefox. Elle extrait un roadbook
d'un itinéraire sur Google Maps. Pour l'utiliser :

- allez sur [Google Maps](https://www.google.com/maps) ;
- planifiez un itinéraire ;
- affichez les détails de l'itinéraire ;
- cliquez sur l'icône de l'extension dans la barre de l'URL ;
- un fichier pour [LibreOffice Calc](https://fr.libreoffice.org/discover/calc/)
  est téléchargé.

[img-firefox]: https://img.shields.io/amo/stars/roadbook.svg?label=firefox&logo=firefox-browser&logoColor=whitesmoke
[img-build]: https://img.shields.io/github/actions/workflow/status/regseb/roadbook/ci.yml?branch=main&logo=github&logoColor=whitesmoke
[img-coverage]: https://img.shields.io/endpoint?label=coverage&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Fregseb%2Froadbook%2Fmain&logo=stryker&logoColor=whitesmoke
[link-firefox]: https://addons.mozilla.org/addon/roadbook/
[link-build]: https://github.com/regseb/roadbook/actions/workflows/ci.yml?query=branch%3Amain
[link-coverage]: https://dashboard.stryker-mutator.io/reports/github.com/regseb/roadbook/main
