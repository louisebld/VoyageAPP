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
				var temps = args.distance / args.autonomie * 60 + args.tempschargement;
				console.log("temps :", temps)
				
				return {								
					temps: temps,
				};
			}
			
		},
	},
};

var xml = require('fs').readFileSync('./SoapServer/monservice.wsdl', 'utf8');
soap.listen(app, '/distance', service, xml);

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log(`server lancé`);
});
