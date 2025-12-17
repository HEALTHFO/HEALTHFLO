/**
 * HealthFlo Operating System (PatientOS)
 * Centralized Data Store & Utility Engine
 * Version 3.1
 * 
 * Synchronizes medical data across Dashboard, Health, Labs, Insurance, Organs, and tracking.
 */

// I. CENTRAL MEDICAL KNOWLEDGE BASE
// -----------------------------------------------------------------------------------------
const PATIENT_OS = {
  user: {
    name: "James Anderson",
    id: "HF-88219",
    age: 42,
    bloodType: "A+",
    weight: "78 kg",
    height: "182 cm"
  },

  // THE MASTER ORGAN DATA (Synced across all pages)
  organs: {
    heart: {
      title: "Cardiovascular", simValue: 80, icon: "ph-heart",
      modelPath: "heart",
      stats: [
        { id: "c1", title: "Blood Pressure", base: 116, unit: "/70", icon: "ph-drop", type: "bp" },
        { id: "c2", title: "Heart Rate", base: 80, unit: "bpm", icon: "ph-heartbeat", type: "bpm" },
        { id: "c3", title: "O2 Saturation", base: 98, unit: "%", icon: "ph-activity", type: "norm" },
        { id: "c4", title: "Cardiac Output", base: 5.2, unit: "L/min", icon: "ph-waves", type: "norm" }
      ],
      ai: { msg: "Sinus rhythm normal. Slight elevation in BP during afternoon.", risk: 15 },
      labs: [
        { name: "Troponin I", val: "0.01", unit: "ng/mL", range: "< 0.04", status: "optimal", desc: "Heart muscle damage marker" },
        { name: "CPK-MB", val: "3.2", unit: "ng/mL", range: "< 5.0", status: "optimal", desc: "Cardiac enzyme test" },
        { name: "hs-CRP", val: "0.8", unit: "mg/L", range: "< 1.0", status: "optimal", desc: "Inflammation level" },
        { name: "BNP", val: "45", unit: "pg/mL", range: "< 100", status: "optimal", desc: "Heart failure indicator" },
        { name: "LDL Cholesterol", val: "95", unit: "mg/dL", range: "< 100", status: "borderline", desc: "Bad cholesterol" },
        { name: "HDL Cholesterol", val: "55", unit: "mg/dL", range: "> 40", status: "optimal", desc: "Good cholesterol" }
      ],
      nutrients: [
        { name: "Magnesium", val: "2.1", unit: "mg/dL", status: "optimal", cat: "Mineral" },
        { name: "Potassium", val: "3.6", unit: "mmol/L", status: "deficient", cat: "Electrolyte" },
        { name: "CoQ10", val: "0.8", unit: "ug/mL", status: "optimal", cat: "Enzyme" },
        { name: "Omega-3", val: "5.2", unit: "%", status: "optimal", cat: "Fatty Acid" }
      ]
    },
    brain: {
      title: "Nervous System", simValue: 14, icon: "ph-brain",
      modelPath: "brain",
      stats: [
        { id: "c1", title: "Brain Waves", base: 14, unit: "Hz", icon: "ph-wave-sine", type: "hz" },
        { id: "c2", title: "Stress Load", base: 65, unit: "%", icon: "ph-lightning", type: "perc" },
        { id: "c3", title: "Sleep Qual", base: 82, unit: "%", icon: "ph-moon", type: "perc" },
        { id: "c4", title: "Reaction", base: 200, unit: "ms", icon: "ph-timer", type: "norm" }
      ],
      ai: { msg: "High Beta wave activity indicating stress. Cortisol likely elevated.", risk: 40, alert: true },
      labs: [
        { name: "Cortisol (AM)", val: "18", unit: "mcg/dL", range: "6-23", status: "optimal", desc: "Stress hormone" },
        { name: "Vitamin B12", val: "450", unit: "pg/mL", range: "200-900", status: "optimal", desc: "Nerve health" },
        { name: "Homocysteine", val: "8.5", unit: "umol/L", range: "< 15", status: "optimal", desc: "Stroke risk marker" },
        { name: "Folate", val: "12", unit: "ng/mL", range: "> 5.4", status: "optimal", desc: "Cognitive function" }
      ],
      nutrients: [
        { name: "Vitamin B12", val: "450", unit: "pg/mL", status: "optimal", cat: "Vitamin" },
        { name: "Vitamin D3", val: "18", unit: "ng/mL", status: "deficient", cat: "Vitamin" },
        { name: "Iron (Ferritin)", val: "40", unit: "ng/mL", status: "optimal", cat: "Mineral" },
        { name: "Zinc", val: "85", unit: "mcg/dL", status: "optimal", cat: "Mineral" }
      ]
    },
    lungs: {
      title: "Respiratory", simValue: 16, icon: "ph-wind", // Changed for compatibility
      modelPath: "lungs",
      svg: `<svg viewBox="0 0 24 24"><path d="M4 4c0 4 2 8 5 8s5-4 5-8-2-4-5-4-5 2-5 4zm10 0c0 4 2 8 5 8s5-4 5-8-2-4-5-4-5 2-5 4zM4.5 14c-1.5 0-3 1.5-3 4s1.5 5 4 5 4-2 4-5-1.5-4-4-5zm15 0c-2.5 0-4 1.5-4 5s1.5 5 4 5 3-1.5 3-5-1.5-4-4-4z" /></svg>`,
      stats: [
        { id: "c1", title: "Resp Rate", base: 16, unit: "rpm", icon: "ph-wind", type: "rpm" },
        { id: "c2", title: "SpO2", base: 98, unit: "%", icon: "ph-drop", type: "perc" },
        { id: "c3", title: "VO2 Max", base: 42, unit: "ml", icon: "ph-sneaker", type: "norm" },
        { id: "c4", title: "Bi-Carb", base: 24, unit: "mEq", icon: "ph-eyedropper", type: "norm" }
      ],
      ai: { msg: "Oxygen exchange excellent. No signs of inflammation.", risk: 2 },
      labs: [
        { name: "pH (Blood Gas)", val: "7.40", unit: "", range: "7.35-7.45", status: "optimal", desc: "Acid-base balance" },
        { name: "pCO2", val: "40", unit: "mmHg", range: "35-45", status: "optimal", desc: "Carbon dioxide" },
        { name: "D-Dimer", val: "220", unit: "ng/mL", range: "< 500", status: "optimal", desc: "Clotting marker" },
        { name: "IgE Total", val: "85", unit: "IU/mL", range: "< 100", status: "optimal", desc: "Allergy marker" }
      ],
      nutrients: [
        { name: "Vitamin C", val: "1.2", unit: "mg/dL", status: "optimal", cat: "Vitamin" },
        { name: "Magnesium", val: "2.1", unit: "mg/dL", status: "optimal", cat: "Mineral" },
        { name: "Vitamin A", val: "40", unit: "mcg/dL", status: "optimal", cat: "Vitamin" },
        { name: "Omega-3", val: "4.8", unit: "%", status: "deficient", cat: "Fatty Acid" }
      ]
    },
    liver: {
      title: "Hepatic System", simValue: 5, icon: "ph-shield-check",
      modelPath: "liver",
      stats: [
        { id: "c1", title: "ALT (SGPT)", base: 29, unit: "U/L", icon: "ph-flask", type: "norm" },
        { id: "c2", title: "AST (SGOT)", base: 24, unit: "U/L", icon: "ph-shield-check", type: "norm" },
        { id: "c3", title: "Bilirubin", base: 0.8, unit: "mg", icon: "ph-test-tube", type: "norm" },
        { id: "c4", title: "Albumin", base: 4.5, unit: "g/dL", icon: "ph-cube", type: "norm" }
      ],
      ai: { msg: "Liver enzymes stable. Glucose regulation is optimal.", risk: 5 },
      labs: [
        { name: "ALT (SGPT)", val: "29", unit: "U/L", range: "7-56", status: "optimal", desc: "Liver enzyme" },
        { name: "AST (SGOT)", val: "24", unit: "U/L", range: "10-40", status: "optimal", desc: "Liver enzyme" },
        { name: "ALP", val: "65", unit: "U/L", range: "44-147", status: "optimal", desc: "Bile duct health" },
        { name: "Total Protein", val: "7.2", unit: "g/dL", range: "6-8.3", status: "optimal", desc: "Overall nutrition" },
        { name: "GGT", val: "22", unit: "U/L", range: "9-48", status: "optimal", desc: "Bile flow" }
      ],
      nutrients: [
        { name: "Vitamin A", val: "45", unit: "mcg/dL", status: "excess", cat: "Vitamin" },
        { name: "Selenium", val: "120", unit: "ng/mL", status: "optimal", cat: "Mineral" },
        { name: "Glutathione", val: "Norm", unit: "", status: "optimal", cat: "Antioxidant" },
        { name: "Vitamin E", val: "10", unit: "mg/L", status: "optimal", cat: "Vitamin" }
      ]
    },
    kidneys: {
      title: "Renal System", simValue: 90, icon: "ph-drop-half",
      modelPath: "kidneys",
      stats: [
        { id: "c1", title: "eGFR", base: 95, unit: "mL", icon: "ph-gauge", type: "norm" },
        { id: "c2", title: "Creatinine", base: 0.9, unit: "mg/dL", icon: "ph-flask", type: "norm" },
        { id: "c3", title: "BUN", base: 14, unit: "mg", icon: "ph-chart-bar", type: "norm" },
        { id: "c4", title: "Uric Acid", base: 5.2, unit: "mg", icon: "ph-drop-half", type: "norm" }
      ],
      ai: { msg: "Renal function optimal. GFR indicates healthy filtration.", risk: 8 },
      labs: [
        { name: "Creatinine", val: "0.9", unit: "mg/dL", range: "0.7-1.3", status: "optimal", desc: "Kidney filtration" },
        { name: "BUN", val: "14", unit: "mg/dL", range: "6-20", status: "optimal", desc: "Nitrogen waste" },
        { name: "Uric Acid", val: "5.2", unit: "mg/dL", range: "3.5-7.2", status: "optimal", desc: "Gout risk" },
        { name: "Sodium", val: "139", unit: "mEq/L", range: "135-145", status: "optimal", desc: "Fluid balance" },
        { name: "Potassium", val: "4.1", unit: "mEq/L", range: "3.5-5.0", status: "optimal", desc: "Heart/Muscle func" }
      ],
      nutrients: [
        { name: "Potassium", val: "4.1", unit: "mmol/L", status: "optimal", cat: "Electrolyte" },
        { name: "Sodium", val: "139", unit: "mmol/L", status: "optimal", cat: "Electrolyte" },
        { name: "Calcium", val: "9.2", unit: "mg/dL", status: "optimal", cat: "Mineral" },
        { name: "Phosphorus", val: "3.5", unit: "mg/dL", status: "optimal", cat: "Mineral" }
      ]
    },
    stomach: {
      title: "Gastric System", simValue: 60, icon: "ph-thermometer",
      modelPath: "stomach",
      stats: [
        { id: "c1", title: "Gastric pH", base: 2.1, unit: "pH", icon: "ph-eyedropper", type: "norm" },
        { id: "c2", title: "Motility", base: 3, unit: "cpm", icon: "ph-wave-sine", type: "norm" },
        { id: "c3", title: "Gastrin", base: 45, unit: "pg/mL", icon: "ph-flask", type: "norm" },
        { id: "c4", title: "Digestion", base: 88, unit: "%", icon: "ph-gear", type: "perc" }
      ],
      ai: { msg: "Acid production normal. No signs of reflux detected.", risk: 10 },
      nutrients: [
        { name: "B12", val: "500", unit: "pg/mL", status: "optimal", cat: "Vitamin" },
        { name: "Zinc", val: "88", unit: "mcg/dL", status: "optimal", cat: "Mineral" },
        { name: "Betaine", val: "Norm", unit: "", status: "optimal", cat: "Compound" },
        { name: "Pepsinogen", val: "140", unit: "ng/mL", status: "optimal", cat: "Enzyme" }
      ],
      labs: []
    },
    intestines: {
      title: "Digestive Tract", simValue: 55, icon: "ph-arrows-in",
      modelPath: "intestine",
      stats: [
        { id: "c1", title: "Absorption", base: 92, unit: "%", icon: "ph-arrows-in", type: "perc" },
        { id: "c2", title: "Microbiome", base: 8.5, unit: "/10", icon: "ph-bug", type: "score" },
        { id: "c3", title: "Inflammation", base: 1.2, unit: "mg", icon: "ph-fire", type: "norm" },
        { id: "c4", title: "Transit", base: 24, unit: "hrs", icon: "ph-clock", type: "norm" }
      ],
      ai: { msg: "Gut microbiome diversity is high. Absorption efficiency optimal.", risk: 12 },
      nutrients: [
        { name: "Probiotics", val: "High", unit: "", status: "optimal", cat: "Bacteria" },
        { name: "Fiber", val: "25", unit: "g", status: "deficient", cat: "Dietary" },
        { name: "Glutamine", val: "Norm", unit: "", status: "optimal", cat: "Amino Acid" },
        { name: "Butyrate", val: "High", unit: "", status: "optimal", cat: "Fatty Acid" }
      ],
      labs: []
    },
    pancreas: {
      title: "Endocrine/Exocrine", simValue: 40, icon: "ph-drop",
      modelPath: "pancreas",
      stats: [
        { id: "c1", title: "Insulin", base: 6.5, unit: "uIU", icon: "ph-syringe", type: "norm" },
        { id: "c2", title: "Lipase", base: 35, unit: "U/L", icon: "ph-drop", type: "norm" },
        { id: "c3", title: "Amylase", base: 55, unit: "U/L", icon: "ph-cookie", type: "norm" },
        { id: "c4", title: "HbA1c", base: 5.4, unit: "%", icon: "ph-chart-line", type: "perc" }
      ],
      ai: { msg: "Beta cell function within normal range. Insulin sensitivity good.", risk: 5 },
      labs: [
        { name: "HbA1c", val: "5.4", unit: "%", range: "< 5.7", status: "optimal", desc: "3-mo Glucose avg" },
        { name: "Fasting Glucose", val: "88", unit: "mg/dL", range: "70-99", status: "optimal", desc: "Sugar level" },
        { name: "Insulin (Fast)", val: "6.5", unit: "uIU/mL", range: "2.6-24.9", status: "optimal", desc: "Hormone level" },
        { name: "Lipase", val: "35", unit: "U/L", range: "0-160", status: "optimal", desc: "Fat digestion" }
      ],
      nutrients: [
        { name: "Chromium", val: "0.5", unit: "ng/mL", status: "optimal", cat: "Mineral" },
        { name: "Magnesium", val: "2.1", unit: "mg/dL", status: "optimal", cat: "Mineral" },
        { name: "Vanadium", val: "Norm", unit: "", status: "optimal", cat: "Trace" },
        { name: "Inositol", val: "Norm", unit: "", status: "optimal", cat: "Carb" }
      ]
    },
    gallbladder: {
      title: "Biliary System", simValue: 18, icon: "ph-diamonds-four",
      modelPath: "gallbladder",
      stats: [
        { id: "c1", title: "Bile Flow", base: 88, unit: "%", icon: "ph-arrows-left-right", type: "perc" },
        { id: "c2", title: "Cholesterol", base: 165, unit: "mg/dL", icon: "ph-drop-half-bottom", type: "norm" },
        { id: "c3", title: "Gallstone Risk", base: 8, unit: "%", icon: "ph-diamond", type: "perc" },
        { id: "c4", title: "LFT Support", base: 92, unit: "%", icon: "ph-heartbeat", type: "perc" }
      ],
      ai: { msg: "No biliary obstruction detected. Keep fiber intake consistent to prevent sludge.", risk: 9 },
      nutrients: [
        { name: "Choline", val: "Adequate", unit: "", status: "optimal", cat: "Nutrient" },
        { name: "Fiber", val: "30", unit: "g", status: "optimal", cat: "Dietary" },
        { name: "Omega-3", val: "4.2", unit: "%", status: "deficient", cat: "Fatty Acid" },
        { name: "Vitamin K", val: "0.8", unit: "ug/mL", status: "optimal", cat: "Vitamin" }
      ],
      labs: []
    },
    urinary: {
      title: "Urinary Tract", simValue: 12, icon: "ph-funnel",
      modelPath: "urinary",
      stats: [
        { id: "c1", title: "Filtration", base: 97, unit: "%", icon: "ph-funnel", type: "perc" },
        { id: "c2", title: "Hydration", base: 94, unit: "%", icon: "ph-drop", type: "perc" },
        { id: "c3", title: "pH", base: 6.2, unit: "pH", icon: "ph-eyedropper", type: "norm" },
        { id: "c4", title: "UTI Risk", base: 3, unit: "%", icon: "ph-shield-check", type: "perc" }
      ],
      ai: { msg: "Clear urinalysis. Encourage steady water intake and balanced electrolytes.", risk: 6 },
      nutrients: [
        { name: "Cranberry", val: "Support", unit: "", status: "optimal", cat: "Phytonutrient" },
        { name: "Vitamin C", val: "1.0", unit: "mg/dL", status: "optimal", cat: "Vitamin" },
        { name: "Sodium", val: "138", unit: "mmol/L", status: "optimal", cat: "Electrolyte" },
        { name: "Potassium", val: "4.4", unit: "mmol/L", status: "optimal", cat: "Electrolyte" }
      ],
      labs: []
    },
    eyes: {
      title: "Ophthalmic", simValue: 20, icon: "ph-eye",
      modelPath: "eye",
      stats: [
        { id: "c1", title: "IOP", base: 14, unit: "mmHg", icon: "ph-gauge", type: "norm" },
        { id: "c2", title: "Vision", base: 20, unit: "/20", icon: "ph-binoculars", type: "norm" },
        { id: "c3", title: "Hydration", base: 90, unit: "%", icon: "ph-drop-half", type: "perc" },
        { id: "c4", title: "Strain", base: 22, unit: "%", icon: "ph-device-mobile", type: "perc" }
      ],
      ai: { msg: "Retinal scan clear. Maintain screen breaks to keep strain minimal.", risk: 7 },
      nutrients: [
        { name: "Vitamin A", val: "Optimal", unit: "", status: "optimal", cat: "Vitamin" },
        { name: "Lutein", val: "Adequate", unit: "", status: "optimal", cat: "Carotenoid" },
        { name: "Omega-3", val: "4.5", unit: "%", status: "deficient", cat: "Fatty Acid" },
        { name: "Zinc", val: "85", unit: "mcg/dL", status: "optimal", cat: "Mineral" }
      ],
      labs: []
    },
    spleen: {
      title: "Lymphatic", simValue: 22, icon: "ph-shield-star",
      modelPath: "spleen",
      stats: [
        { id: "c1", title: "Immune Load", base: 18, unit: "%", icon: "ph-virus", type: "perc" },
        { id: "c2", title: "Lymph Flow", base: 82, unit: "%", icon: "ph-arrows-left-right", type: "perc" },
        { id: "c3", title: "Inflammation", base: 0.8, unit: "mg", icon: "ph-thermometer", type: "norm" },
        { id: "c4", title: "Antibody", base: 95, unit: "%", icon: "ph-shield", type: "perc" }
      ],
      ai: { msg: "Lymphatic circulation strong. No swelling detected in recent scans.", risk: 10 },
      nutrients: [
        { name: "Vitamin C", val: "1.1", unit: "mg/dL", status: "optimal", cat: "Vitamin" },
        { name: "Polyphenols", val: "Rich", unit: "", status: "optimal", cat: "Phytonutrient" },
        { name: "Zinc", val: "86", unit: "mcg/dL", status: "optimal", cat: "Mineral" },
        { name: "Copper", val: "110", unit: "mcg/dL", status: "deficient", cat: "Mineral" }
      ],
      labs: []
    },
    thyroid: {
      title: "Endocrine", simValue: 32, icon: "ph-butterfly",
      modelPath: "thyroid",
      stats: [
        { id: "c1", title: "TSH", base: 2.1, unit: "uIU/mL", icon: "ph-activity", type: "norm" },
        { id: "c2", title: "Free T3", base: 3.3, unit: "pg/mL", icon: "ph-flame", type: "norm" },
        { id: "c3", title: "Free T4", base: 1.2, unit: "ng/dL", icon: "ph-flask", type: "norm" },
        { id: "c4", title: "Metabolic Burn", base: 76, unit: "%", icon: "ph-fire-simple", type: "perc" }
      ],
      ai: { msg: "Thyroid output stable with balanced T3/T4 conversion.", risk: 12 },
      nutrients: [
        { name: "Iodine", val: "95", unit: "mcg/L", status: "optimal", cat: "Mineral" },
        { name: "Selenium", val: "130", unit: "ng/mL", status: "optimal", cat: "Mineral" },
        { name: "Tyrosine", val: "Sufficient", unit: "", status: "optimal", cat: "Amino Acid" },
        { name: "Zinc", val: "80", unit: "mcg/dL", status: "deficient", cat: "Mineral" }
      ],
      labs: []
    },
    muscle: {
      title: "Musculoskeletal", simValue: 44, icon: "ph-arm-flex",
      modelPath: "muscle",
      stats: [
        { id: "c1", title: "Strength", base: 78, unit: "%", icon: "ph-lightning", type: "perc" },
        { id: "c2", title: "Recovery", base: 6, unit: "hrs", icon: "ph-moon-stars", type: "norm" },
        { id: "c3", title: "Hydration", base: 91, unit: "%", icon: "ph-drop", type: "perc" },
        { id: "c4", title: "Fatigue", base: 14, unit: "%", icon: "ph-battery-medium", type: "perc" }
      ],
      ai: { msg: "Muscle fibers recovering well. Schedule light mobility to keep fatigue low.", risk: 9 },
      nutrients: [
        { name: "Protein", val: "1.6", unit: "g/kg", status: "optimal", cat: "Macro" },
        { name: "Creatine", val: "Adequate", unit: "", status: "optimal", cat: "Compound" },
        { name: "Electrolytes", val: "Stable", unit: "", status: "optimal", cat: "Electrolyte" },
        { name: "Vitamin D", val: "25", unit: "ng/mL", status: "deficient", cat: "Vitamin" }
      ],
      labs: []
    },
    skin: {
      title: "Dermatologic", simValue: 15, icon: "ph-drop-half-bottom",
      modelPath: "skin",
      stats: [
        { id: "c1", title: "Hydration", base: 85, unit: "%", icon: "ph-drop-half", type: "perc" },
        { id: "c2", title: "Elasticity", base: 88, unit: "%", icon: "ph-wave-sine", type: "perc" },
        { id: "c3", title: "UV Exposure", base: 20, unit: "index", icon: "ph-sun", type: "norm" },
        { id: "c4", title: "Barrier", base: 92, unit: "%", icon: "ph-shield-check", type: "perc" }
      ],
      ai: { msg: "Skin barrier intact. Keep UV exposure moderated during midday.", risk: 6 },
      nutrients: [
        { name: "Collagen", val: "Supported", unit: "", status: "optimal", cat: "Protein" },
        { name: "Vitamin E", val: "11", unit: "mg", status: "optimal", cat: "Vitamin" },
        { name: "Hyaluronic Acid", val: "Adequate", unit: "", status: "optimal", cat: "Compound" },
        { name: "Vitamin C", val: "1.0", unit: "mg/dL", status: "deficient", cat: "Vitamin" }
      ],
      labs: []
    }
  },

  // GLOBAL UTILS
  utils: {
    getFormattedStats(organKey) {
      const org = PATIENT_OS.organs[organKey];
      if (!org) return "No data";
      return org.stats.map(s => `${s.title}: ${s.base}${s.unit}`).join(', ');
    },

    // Simulates slight drift for realism across all pages
    getDriftingValue(base, range = 2) {
      return (base + (Math.random() * range - range / 2)).toFixed(1);
    }
  }
};

// Expose to window for global access
window.PATIENT_OS = PATIENT_OS;
