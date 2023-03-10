function coutCalcul(km) {
    new Promise((resolve, reject) => {
        fetch('http://localhost:8081/calculer-cout/' + km).then(response => {
            return response.json()
        });
    });
}

export default coutCalcul;