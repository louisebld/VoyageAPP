
import {SOAP_URL} from '../constantes';
var soap = require('soap-everywhere');

function sendSoapRequest(distance, autonomie, tempsChargement) {
  return new Promise((resolve, reject) => {
    soap.createClient(SOAP_URL, function (err, client) {
      if (err) {
        reject(err);
        return;
      }
      client.distance({ distance: distance, autonomie: autonomie, tempschargement: tempsChargement }, function (err, result) {
        if (err) {
          reject(err);
          return;
        }
          var temps = result.temps * 60;
          temps = Math.round(temps);
          resolve(temps);
      });
    });
  });
}


export default sendSoapRequest;
