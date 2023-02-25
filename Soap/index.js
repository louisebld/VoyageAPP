var soap = require('soap');
const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());
// app.use(
//   cors({origin: ['http://localhost:8080', 'http://127.0.0.1:8080']})
// );

const service = {
	DistanceService: {
		DistanceServiceSoapPort: {
			distance: function (args) {
				console.log(args);
				var vitesse = 80;
				var nbcharge = 0;
				if (args.autonomie < args.distance) {
					nbcharge = Math.ceil(args.distance / args.autonomie);
				}
				var temps = (args.distance / vitesse) + (nbcharge * args.tempschargement / 60);

				var temps = Math.round(temps * 100) / 100;
				console.log("temps :", temps)
				
				return {								
					temps: temps,
				};
			}
			
		},
	},
};

var xml = require('fs').readFileSync('./Soap/monservice.wsdl', 'utf8');
soap.listen(app, '/distance', service, xml);

app.listen(8080, () => {
	console.log("Server is listening on port 8080");
});
