//// Attend que la page soit entièrement chargée avant d'appeler 
//la fonction checkInternetConnection
window.addEventListener("load",checkInternetConnection);

//// Fonction pour vérifier la connexion Internet
function checkInternetConnection()
{
    //// Récupère les éléments HTML par leur identifiant
    const statusText = document.getElementById('statusText');
    const ipAddressText = document.getElementById('ipAddressText');
    const networkStrengthText = document.getElementById('networkStrengthText');

    //// Affiche le texte 'Checking...' pour indiquer que la vérification est en cours
    statusText.textContent = 'Checking....';

    //// Vérifie si le navigateur est en ligne (connecté à Internet)
    if(navigator.onLine)
    {
        // // Effectue une requête pour obtenir l'adresse IP à l'aide de l'API ipify.org
        fetch('https://api.ipify.org/?format=json')
        .then((response)=> response.json())
        .then((data)=>{

            //// Met à jour les éléments HTML avec les informations récupérées
            ipAddressText.textContent = data.ip;
            statusText.textContent = 'Connected'

            //// Récupère la vitesse de connexion s'il est disponible, sinon affiche 'Unknown'
            const connection = navigator.connection;
            const networkStrength = connection ?connection.downlink 
            +'Mbps' : 'Unknown';
            networkStrengthText.textContent = networkStrength;


        })
        .catch(()=>{
            //// En cas d'erreur, indique que la connexion est interrompue
            statusText.textContent = 'Disconnected';
            ipAddressText.textContent = '-'
            networkStrengthText.textContent = '-'
        })


    }
    else
    {
        //// Si le navigateur n'est pas en ligne, indique que la connexion est interrompue
        statusText.textContent = 'Disconnected';
        ipAddressText.textContent = '-'
        networkStrengthText.textContent = '-'
    }

}