import { API_COUT_URL } from '../constantes';
function coutCalcul(km) {
    return new Promise((resolve, reject) => {
        fetch(API_COUT_URL + '/cout/' + km).then(response => response.json()).then(data => {
            resolve(data.cout)
        });
    });
}

export default coutCalcul;