var ip = require("ip");

function main(message)
{
    myip = ip.address();
    var reponse = "";

    // première partie de la réponse (on troll un peu :))
    var listeReponses = ["C'est bien parce que c'est toi !",
                         "~~127.0.0.1~~... Rho ça va hein, si on peut plus blaguer...",
                         "~~Et si tu cherchais comme un grand ?~~",
                         "Tu me demande mon adresse ? J'habite chez <@231800259997597696> !"
                        ];
    var indice = Math.floor(Math.random() * listeReponses.length)
    reponse += listeReponses[indice];

    //seconde partie (on donne la vraie ip)
    listeReponses = [" Mon adresse c'est : \n",
                     " Allez, la voilà : \n"
                    ];
    indice = Math.floor(Math.random() * listeReponses.length)

    reponse += listeReponses[indice];
    message.channel.send(reponse + myip + ".");
}
exports.main = main;