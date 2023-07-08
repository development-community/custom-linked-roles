require('dotenv').config()
const axios = require('axios');

/*
    EN:
    The metadata constant is the parameter of your linked role.
    Here, it will be show the level and the kill rates on the parameter panel of linked role.

    FR:
    La constante metadata est le paramètre de votre rôle lié.
    Ici, le niveau et les taux de mortalité seront affichés dans le panneau des paramètres du rôle lié.
*/
const metadata = [
    {
        key: 'level',
        name: 'Required Level',
        description: "The minimal level to get the role.",
        type: 2
    },
    {
        key: 'killrates',
        name: 'Required number kills',
        description: "The number of kills required to get the role.",
        type: 2
    }
];


/*
    EN: We send the metadata (metadata constant) to Discord for configuration.
    FR: Nous envoyons les métadonnées (constante metadata) à Discord pour faire les configurations.
*/
(async () => {
    try {
        await axios.put(
            `https://discord.com/api/v10/applications/${process.env.ID}/role-connections/metadata`,
            metadata, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bot ${process.env.TOKEN}`
                }
            }
        );
    } catch(e) {
        if(axios.isAxiosError(e)) {
            console.log(e.data);
        }
    }
})();