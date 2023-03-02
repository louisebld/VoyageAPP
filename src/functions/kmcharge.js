import findBorne from "../services/bornesservice";
import { destinationPoint } from "./destinationPoint";

export const kmcharge = (gps1, gps2, distanceTotale, autonomie) => {
    var rechargePoints = []
    let distanceParcourue = 0;

    while (distanceParcourue + autonomie < distanceTotale) {
        distanceParcourue += autonomie;
        rechargePoints.push(distanceParcourue);
    }

    rechargePoints.push(distanceTotale);
    console.log(rechargePoints)

    var gpsPoints = []
    // rechargePoints.forEach((recharge) => {
    //     gpsPoints.push(destinationPoint(gps1[0], gps1[1], gps2[0], gps2[1], recharge));
    // })
    console.log(gpsPoints)

    var bornePoints = []

    gpsPoints.forEach((gps) => {
        var borne = findBorne(gps[0], gps[1])
        var gpsborne = borne["geo_point_borne"]
        console.log(gpsborne)
        bornePoints.push(gpsborne);
    })

    

    return rechargePoints;
}
