const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

/*
    EN: Optional, only if you want to make a linked role with Rainbow Six Siege
    FR: Faculatif, uniquement si vous souhaitez faire un role lié avec Rainbow Six Siege
*/
const R6 = require('r6s-stats-api');


/*
    EN: Test Route
    FR: Route de test
*/
app.get('/', (req, res) => {
    res.send('Hello world');
});

/*
    EN: Route allowing to check if user pass the connection and check the data about params of Linked Role
    FR: Route permettant de vérifier si l'utilisateur passe la connexion et de vérifier les données relatives aux paramètres du rôle lié.
*/
app.get('/callback', async (req, res) => {
    if (!req.query || !req.query.code) return res.redirect("https://discord.com/api/oauth2/authorize?client_id=1059900265140072529&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fcallback&response_type=code&scope=identify%20connections%20role_connections.write");

    const { code } = req.query;

    const params = new URLSearchParams({
        client_id: process.env.ID,
        client_secret: process.env.SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.REDIRECT_URI
    });

    let response;
    try {
        /*
            EN: Allowing to get the access_token to use Discord requests which need Bearer Authorization.
            FR: Permet d'obtenir le access_token pour utiliser les requêtes Discord qui nécessitent une Authorisation Bearer.
        */
        response = await axios.post('https://discord.com/api/oauth2/token',
            params,
            {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/x-www-form-urlencoded'
            }
        );
    }
    catch (e) {
        return res.redirect('/redirect');
    }

    if (!response) return res.redirect('/redirect');

    const user = await axios.get('https://discord.com/api/users/@me', {
        headers: {
            'Authorization': `Bearer ${response.data.access_token}`
        }
    });

    /*
        EN: You can use this request to get the externals connections like PayPal, Steam or anything else.
        FR : Vous pouvez utiliser cette requête pour obtenir les connexions externes telles que PayPal, Steam ou autre.
    */

    // const connection_user = await axios.get('https://discord.com/api/users/@me/connections', {
    //     headers: {
    //         'Authorization': `Bearer ${response.data.access_token}`
    //     }
    // });

    /*
        EN:
        In the workshop, the example is with Rainbow Six Siege.
        So the following lines (Line 64 at Line 68) is optional

        FR:
        Dans l'atelier, l'exemple porte sur Rainbow Six Siege.
        Les lignes suivantes (ligne 64 à ligne 68) sont donc facultatives
    */
    let general = await R6.general('pc', user?.data.global_name);
    
    if (["FORMAT_ERROR", "PLATFORM_ERROR", "NOT_FOUND", "TIME_OUT"].includes(general)) return res.sendStatus(404);
    let { kills, level } = general;
    kills = kills.toString().replace(',', '');

    /*
        EN: Updates the user's data, and Discord will check whether the user meets the criteria for the role.
        FR: Met à jour les données de l'utilisateur, et Discord vérifiera si l'utilisateur a les critères pour obtenir le rôle.
    */
    await axios.put(
        `https://discord.com/api/v10/users/@me/applications/${process.env.ID}/role-connection`,
        {
            metadata: {
                'level': level,
                'killrates': kills
            }
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${response.data.access_token}`
            }
        }
    );
    
    return res.send("Your Rainbow Six Siege account has been linked with your Discord account.");
});

/*
    EN: Routes allowing to ask an Discord connection at user.
    FR: Routes permettant de demander une connexion Discord à l'utilisateur.
*/
app.get('/redirect', (req, res) => {
    return res.redirect(process.env.DISCORD_REDIRECT_URI);
});

/*
    EN: Start the Express applicatin on port 8080.
    FR : Démarrer l'application Express sur le port 8080.
*/
app.listen(8080, () => {
    console.log(`Listening on port 8080`)
});