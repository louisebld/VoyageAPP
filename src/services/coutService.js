function coutCalcul(km) {
    fetch('http://localhost:8081/calculer-cout/' + km).then(response => {
        return response.json();
    }).then(data => {
        console.log(data)
        console.log(data.cout)
        return data.cout
    });
}

export default coutCalcul;