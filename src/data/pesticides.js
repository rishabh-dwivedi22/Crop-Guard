const pesticides = {
  d1: {
    chemical: { name: "Mancozeb 75% WP / Metalaxyl 8%", dosage: "2.5 g per liter of water", safetyInterval: "7 days before harvest", applicationMethod: "Foliar spray during early disease onset" },
    biological: { name: "Trichoderma viride", dosage: "5 g per liter of water", applicationMethod: "Soil drenching and spray" },
    cultural: ["Avoid overhead irrigation", "Ensure proper field drainage", "Use certified disease-free seeds", "Maintain plant spacing"],
    organic: { name: "Neem Oil Extract (10,000 ppm)", dosage: "3 ml per liter of water" },
    ipmSteps: ["Inspect leaves twice weekly", "Remove and destroy infected plant debris", "Apply preventive bio-control early", "Target chemical spray only if threshold > 5%"]
  },
  d2: {
    chemical: { name: "Chlorothalonil 75% WP", dosage: "2.0 g per liter of water", safetyInterval: "5 days", applicationMethod: "Foliar spray at first sign of spots" },
    biological: { name: "Bacillus subtilis", dosage: "10 ml per liter", applicationMethod: "Foliar spray" },
    cultural: ["Crop rotation with non-solanaceous crops", "Mulching to prevent soil splash"],
    organic: { name: "Copper Oxychloride 50% WP", dosage: "3.0 g per liter" },
    ipmSteps: ["Monitor lower canopy leaves", "Prune lower infected leaves", "Balance nitrogen application"]
  },
  d3: {
    chemical: { name: "Imidacloprid 17.8% SL / Buprofezin 25% SC", dosage: "0.5 ml / 1.5 ml per liter", safetyInterval: "14 days", applicationMethod: "Direct spray at the base of the plant" },
    biological: { name: "Metarhizium anisopliae", dosage: "5 g per liter", applicationMethod: "Base spray in high humidity" },
    cultural: ["Alternate wetting and drying (AWD) of fields", "Avoid excessive nitrogenous fertilizers"],
    organic: { name: "Neem Cake Application", dosage: "250 kg per hectare" },
    ipmSteps: ["Drain field water for 3-4 days to disturb pests", "Conserve natural predators like mirid bugs", "Apply targeted insecticide to stem base"]
  },
  d4: {
    chemical: { name: "Tricyclazole 75% WP", dosage: "0.6 g per liter of water", safetyInterval: "21 days", applicationMethod: "Spray at tillering and neck emergence" },
    biological: { name: "Pseudomonas fluorescens", dosage: "10 g per kg seed / 2.5 kg per hectare", applicationMethod: "Seed treatment & soil drenching" },
    cultural: ["Avoid late planting", "Burn infected stubble post harvest"],
    organic: { name: "Garlic-Chilli Extract", dosage: "5% solution" },
    ipmSteps: ["Seed treatment prior to sowing", "Avoid heavy dose of Urea", "Foliar application at nursery stage"]
  }
};

export const getRecommendation = (diseaseId) => {
  return pesticides[diseaseId] || pesticides.d1;
};

export default pesticides;
