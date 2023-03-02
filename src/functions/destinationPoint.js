export const destinationPoint = (lat1, lon1, lat2, lon2, distance) => {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180; // Différence de latitude en radians
  const dLon = (lon2 - lon1) * Math.PI / 180; // Différence de longitude en radians
  const lat1Rad = lat1 * Math.PI / 180; // Latitude 1 en radians

  // Calculer l'angle entre les deux points
  const y = Math.sin(dLon) * Math.cos(lat2 * Math.PI / 180);
  const x = Math.cos(lat1Rad) * Math.sin(lat2 * Math.PI / 180) - Math.sin(lat1Rad) * Math.cos(lat2 * Math.PI / 180) * Math.cos(dLon);
  const bearing = Math.atan2(y, x);

  // Convertir la distance en radians
  distance = distance / R;

  // Calculer les nouvelles coordonnées
  const lat3 = Math.asin(Math.sin(lat1Rad) * Math.cos(distance) + Math.cos(lat1Rad) * Math.sin(distance) * Math.cos(bearing));
  const lon3 = lon1 * Math.PI / 180 + Math.atan2(Math.sin(bearing) * Math.sin(distance) * Math.cos(lat1Rad), Math.cos(distance) - Math.sin(lat1Rad) * Math.sin(lat3));

  // Convertir les coordonnées en degrés
  const lat3Deg = lat3 * 180 / Math.PI;
  const lon3Deg = lon3 * 180 / Math.PI;

  return [lat3Deg, lon3Deg];
  }

