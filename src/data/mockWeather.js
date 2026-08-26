const weatherPresets = {
  'Pune, MH': { temp: 31, humidity: 78, rainfall: '12 mm', windSpeed: '14 km/h', condition: 'Humid & Cloudy', riskScore: 82 },
  'Nashik, MH': { temp: 28, humidity: 85, rainfall: '25 mm', windSpeed: '18 km/h', condition: 'Heavy Rain', riskScore: 91 },
  'Nagpur, MH': { temp: 35, humidity: 62, rainfall: '0 mm', windSpeed: '10 km/h', condition: 'Sunny', riskScore: 45 },
  'Lucknow, UP': { temp: 33, humidity: 80, rainfall: '18 mm', windSpeed: '12 km/h', condition: 'Overcast', riskScore: 88 }
};

export const getWeatherData = (location) => {
  return weatherPresets[location] || weatherPresets['Pune, MH'];
};

export const weatherAlerts = [
  { id: 'w1', title: 'High Humidity Warning (Pune)', desc: 'Humidity > 75% for 48h creates optimal conditions for Late Blight spores.', severity: 'critical', date: 'Today, 08:30 AM' },
  { id: 'w2', title: 'Heavy Rainfall Alert (Nashik)', desc: 'Excess moisture may trigger Root Rot and Bacterial Leaf Spot.', severity: 'high', date: 'Today, 06:15 AM' },
  { id: 'w3', title: 'Pest Migration Alert (Hyderabad)', desc: 'Warm temperature and light winds favor Brown Plant Hopper multiplication.', severity: 'critical', date: 'Yesterday' }
];
