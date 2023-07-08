<div align="center">
    <h1>Créer un rôle lié customisé avec vos paramètres</h1>
    <p>Code source de l'atelier <u>Custom Linked roles</u> Fait en direct sur notre serveur Discord</p>
    <p>Vous pouvez nous retrouver sur <a href="https://discord.com/invite/dev-community">Discord</a> et <a href="https://www.youtube.com/channel/UCmH1td7f73IEyYNNg5XDT9g">Youtube</a></p>
</div>

<div align="center">

*Ce README est disponible en <a href="/README.md">Anglais</a> et en <a href="/README.FR.md">Français</a>.*

</div>


### Résumé

L'objectif est de pouvoir automatiser un rôle avec la fonctionnalité des rôles liés. Prenons l'exemple de Rainbow Six Siege, où l'utilisateur doit avoir un certain niveau et un certain nombre de kills pour avoir le rôle.

<div align="center">
    <img src="./documentation/result-feature.png" alt="Result features" width="550"/>
</div>

### Table des matières

- [Résumé](#Résumé)
- [Prérequis](#Prérequis)
- [Configuration](#Configuration)
- [Installation](#Installation)

### Prérequis

- Node.js (Personnellement j'utilises la version v18.16.1)
- NPM

### Configuration

Tout d'abord, vous devez configurer votre Bot pour qu'il puisse fonctionner correctement et récupérer certaines informations sur le [Discord Developer Portal](https://discord.com/developers/applications).

**Les informations que nous récupérons doivent être placées dans un fichier `.env`**.

1. Choisissez le bot dans lequel vous souhaitez intégrer cette fonctionnalité.

2. Information à récupérer

&emsp;&emsp;2.1 Le token de votre Bot

Allez dans l'onglet **Bot** ou entrez l'ID de votre bot dans le lien suivant : `https://discord.com/developers/applications/ID/bot` pour aller directement à la page **Bot**.

Appuyez sur **Reset Token** pour récupérer votre token.

*(Attention : cette opération réinitialisera votre token et toutes les applications qui y sont connectées seront déconnectées !)

Ajoutez ensuite au fichier `.env`:
```js
TOKEN=DiscordClientToken
```

&emsp;&emsp;2.2 Les informations Client

Vous devez aller dans l'onglet **oAuth2** puis **Général** ou mettre l'ID de votre bot dans le lien suivant : `https://discord.com/developers/applications/ID/oauth2/general` pour aller directement à la page **Général** de l'onglet **oAuth2**.

Copiez ensuite l'ID de votre client et appuyez sur **Reset Secret** pour récupérer le secret du client.

(*Veuillez noter que le fait d'appuyer sur Secret Client déconnectera toutes les applications utilisant le Secret Client actuel !)

Ajoutez ensuite au fichier `.env`:
```js
SECRET=DiscordClientSecret
ID=DiscordClientID
```

&emsp;&emsp;2.3 Lien permettant aux utilisateurs de se connecter à Discord

Allez dans l'onglet **oAuth2**, puis **Générateur d'URL**, ou entrez l'ID de votre robot dans le lien suivant : `https://discord.com/developers/applications/ID/oauth2/url-generator` pour aller directement à la page **Générateur d'URL** dans l'onglet **oAuth2**.

Vous devez vérifier les informations suivantes :
`identify` - Permet de récupérer des informations sur l'utilisateur (nom, avatar, bannière...)
`connections` - Permet de récupérer les connexions tierces de l'utilisateur (PayPal, Steam...)
`role_connections.write` - Permet le bon fonctionnement de cette fonctionnalité !

Sélectionnez ensuite votre URL de redirection (voir 3.1).
Votre lien devrait apparaître comme dans l'image ci-dessous :

<img src="./documentation/oAuth2Scopes.png" alt="Discord oAuth2 Panel Scopes"/>
&emsp;

Then add to the `.env` file:
```js
DISCORD_REDIRECT_URI=DiscordGeneratedURL
```
&emsp;

3. Information à mettre

&emsp;&emsp;3.1. l'URL de redirection

Vous pouvez écrire ces informations dans l'onglet **oAuth2** puis **Général** ou vous pouvez mettre votre ID dans le lien suivant : `https://discord.com/developers/applications/ID/oauth2/general` pour aller directement à la page **Général** de l'onglet **oAuth2**.

Si vous souhaitez utiliser ce code source en utilisant mes redirections, vous devez écrire dans __Redirects__ : `http://localhost:8080/callback`.
Sinon vous devez mettre la route que vous voulez avec le port que vous avez choisi dans le fichier `src/index.js`.


#### Exemple

`src/index.js`
```js
line 18     app.get('/return', async (req, res) => {
```
Ici, au lieu d'une route `/callback`, j'utilise une route `/return`.
```js
line 101     app.listen(3030, () => {
line 102         console.log("Listening on port 3030")
line 103     });
```

Ici, j'utilise le port `3030`. Donc le lien que je dois mettre est : `http://localhost:3030/return`.

Puis ajoutez-le au fichier `.env` :
```js
REDIRECT_URI=DiscordRedirectURL
```

### Installation

- Vérifiez que vous avez correctement configuré votre `.env`.

Il doit contenir toutes les informations suivantes

```js
TOKEN=DiscordClientToken
SECRET=DiscordClientSecret
ID=DiscordClientID
REDIRECT_URI=DiscordRedirectURL
DISCORD_REDIRECT_URI=DiscordGeneratedURL
```

- Installation des dépendances

Si vous utiliser NPM:
```
npm i
```
Si vous utiliser Yarn:
```
yarn
```
Il installera `r6s-stats-api`, si vous ne voulez pas faire votre Linked role avec Rainbow Six Siege, vous pouvez supprimer dans package.json la dépendance `r6s-stats-api`

- Lancer en mode développement

Si vous utilisez NPM:
```
npm run dev
```
Si vous utilisez Yarn:
```
yarn run dev
```

- Lancer en mode production

Si vous utilisez NPM:
```
npm run prod
```
Si vous utilisez Yarn:
```
yarn run prod
```

**Dans tous les cas, vous devez exécuter le fichier `src/register.js` au moins une fois pour pouvoir envoyer votre paramètre à DISCORD**.


### Remerciements

- [booleans-oss](https://github.com/booleans-oss) - CTO chez [Development Community](https://github.com/development-community)
- [VIX](https://github.com/xMrVIXx) - Léon's Developer Team chez [Development Community](https://github.com/development-community)