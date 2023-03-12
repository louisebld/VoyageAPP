function coutCalcul(km) {
    return new Promise((resolve, reject) => {
        fetch('https://api-louisebld.vercel.app/cout/' + km).then(response => response.json()).then(data => {
            resolve(data.cout)
        });
    });
}

export default coutCalcul;