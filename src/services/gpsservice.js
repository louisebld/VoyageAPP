function askGPSVille(nom) {
    // à partir du nom de la ville, on va chercher les coordonnées GPS
    return new Promise((resolve, reject) => {
        fetch('https://api-adresse.data.gouv.fr/search/?q=' + nom)
        .then(response => response.json())
        .then(data => {
            var lat1 = data.features[0].geometry.coordinates[0];
            var lon1 = data.features[0].geometry.coordinates[1];
            resolve([lat1, lon1]);
        })
    });
}

export default askGPSVille;
