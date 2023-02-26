function findBorne(lat, long) {
    // https://odre.opendatasoft.com/api/records/1.0/search/?dataset=bornes-irve&q=&facet=region&facet=departement
    var distance = 10000;
    // https://odre.opendatasoft.com/api/records/1.0/search/?dataset=bornes-irve&q=&geofilter.distance=48.859%2C2.347%2C1000
    var url = 'https://odre.opendatasoft.com/api/records/1.0/search/?dataset=bornes-irve&q=&geofilter.distance=' + long + '%2C' + lat + '%2C' + distance + '';
    console.log(url)
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                var borne = data.records[0].fields;
                console.log(borne)
                resolve(borne);
            }
            )
    });
    
}

export default findBorne;