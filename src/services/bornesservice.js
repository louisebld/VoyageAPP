function findBorne(lat, long) {
    // https://odre.opendatasoft.com/api/records/1.0/search/?dataset=bornes-irve&q=&facet=region&facet=departement
    var distance = 80;
    var url = 'https://odre.opendatasoft.com/api/records/1.0/search/?dataset=bornes-irve&q=&geofilter.distance=' + lat + '%2C' + long + '%2C' + distance + '';
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