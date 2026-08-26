const diseases = [
  {
    id: "d1",
    name: "Late Blight",
    nameHi: "लेट ब्लाइट (पछेती झुलसा)",
    nameMr: "करपा (लेट ब्लाइट)",
    crop: "Potato/Tomato",
    type: "disease",
    symptoms: "Water-soaked spots on leaves, white fungal growth on undersides, rapid wilting.",
    symptomsHi: "पत्तियों पर पानी में भीगे हुए धब्बे, निचली सतह पर सफेद फफूंद, तेजी से मुरझाना।",
    symptomsMr: "पानांवर पाण्यासारखे डाग, खालच्या बाजूला पांढरी बुरशी, वेगाने कोमेजणे.",
    cause: "Phytophthora infestans (Oomycete)",
    severity: "critical",
    affectedParts: ["Leaves", "Stems", "Fruits/Tubers"],
    season: "Cool, moist weather"
  },
  {
    id: "d2",
    name: "Early Blight",
    nameHi: "अर्ली ब्लाइट (अगेती झुलसा)",
    nameMr: "लवकर येणारा करपा",
    crop: "Tomato/Potato",
    type: "disease",
    symptoms: "Dark, concentric rings (target spots) on older leaves, yellowing of surrounding tissue.",
    symptomsHi: "पुरानी पत्तियों पर गहरे, गोल छल्ले, आसपास के ऊतकों का पीला पड़ना।",
    symptomsMr: "जुन्या पानांवर गडद, गोलाकार डाग, आजूबाजूचा भाग पिवळा पडणे.",
    cause: "Alternaria solani (Fungus)",
    severity: "high",
    affectedParts: ["Leaves", "Stems", "Fruits"],
    season: "Warm, humid weather"
  },
  {
    id: "d3",
    name: "Brown Plant Hopper",
    nameHi: "भूरा फुदका (BPH)",
    nameMr: "तपकिरी तुडतुडे",
    crop: "Rice",
    type: "pest",
    symptoms: "Hopperburn (yellowing and drying of plants), presence of small brown insects at the base.",
    symptomsHi: "हॉपरबर्न (पौधों का पीला पड़ना और सूखना), तने के आधार पर छोटे भूरे कीड़े।",
    symptomsMr: "हॉपरबर्न (रोपे पिवळी पडून वाळणे), खोडाच्या तळाशी लहान तपकिरी कीटक.",
    cause: "Nilaparvata lugens",
    severity: "critical",
    affectedParts: ["Stems", "Leaves"],
    season: "Warm and humid, late tillering stage"
  },
  {
    id: "d4",
    name: "Rice Blast",
    nameHi: "धान का झोंका रोग (ब्लास्ट)",
    nameMr: "भात पिकावरील कडा करपा",
    crop: "Rice",
    type: "disease",
    symptoms: "Diamond-shaped white to gray lesions with dark borders on leaves.",
    symptomsHi: "पत्तियों पर गहरे किनारों वाले हीरे के आकार के सफेद या भूरे धब्बे।",
    symptomsMr: "पानांवर गडद कडा असलेले हिऱ्याच्या आकाराचे पांढरे ते राखाडी डाग.",
    cause: "Magnaporthe oryzae (Fungus)",
    severity: "high",
    affectedParts: ["Leaves", "Nodes", "Panicles"],
    season: "High humidity, prolonged leaf wetness"
  }
];

export default diseases;
