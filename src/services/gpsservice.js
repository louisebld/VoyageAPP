function askGPSVille(nom) {
    // à partir du nom de la ville, on va chercher les coordonnées GPS
    console.log("askGPSVille : ", nom)
    // return new Promise((resolve, reject) => {
    //     // fetch('https://api-adresse.data.gouv.fr/search/?q=' + nom)
    //     fetch('https://nominatim.openstreetmap.org/search.php?q=' + nom + '&format=jsonv2&type=city')
    //     .then(response => response.json())
    //     .then(data => {
    //         // var lat1 = data.features[0].geometry.coordinates[0];
    //         // var lon1 = data.features[0].geometry.coordinates[1];
    //         // resolve([lat1, lon1]);
    //         resolve(data);
    //     })
    // });
}

export default askGPSVille;
