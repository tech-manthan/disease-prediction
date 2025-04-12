import dayjs from "dayjs";

type DisasterType =
  | "Earthquake"
  | "Flood"
  | "Heatwave"
  | "Hurricane"
  | "Tornado";

type RegionFeature = {
  temperature: [number, number];
  rainfall: [number, number];
  humidity: [number, number];
  population_density: [number, number];
  healthcare_access: [number, number];
};

const disasterTypes: DisasterType[] = [
  "Earthquake",
  "Flood",
  "Heatwave",
  "Hurricane",
  "Tornado",
];

const disasterRegions: Record<DisasterType, string[]> = {
  Earthquake: ["California", "Japan", "Chile", "Nepal", "Turkey"],
  Flood: ["Bangladesh", "India", "Pakistan", "Indonesia", "Philippines"],
  Heatwave: ["Australia", "Spain", "USA", "India", "Mexico"],
  Hurricane: ["Florida", "Texas", "Louisiana", "Puerto Rico", "Cuba"],
  Tornado: ["Oklahoma", "Kansas", "Nebraska", "Missouri", "Texas"],
};

const disasterDiseases: Record<DisasterType, string[]> = {
  Earthquake: ["Cholera", "Typhoid", "Respiratory Infection", "None"],
  Flood: [
    "Cholera",
    "Leptospirosis",
    "Typhoid",
    "Dengue",
    "Hepatitis A",
    "None",
  ],
  Heatwave: ["Heat Stroke", "Dehydration", "None"],
  Hurricane: ["Dengue", "Cholera", "Typhoid", "Leptospirosis", "None"],
  Tornado: ["Respiratory Infection", "Injury-related Infection", "None"],
};

const regionFeatures: Record<string, RegionFeature> = {
  California: {
    temperature: [15, 35],
    rainfall: [0, 150],
    humidity: [20, 60],
    population_density: [500, 2500],
    healthcare_access: [3, 5],
  },
  Japan: {
    temperature: [5, 30],
    rainfall: [100, 300],
    humidity: [60, 90],
    population_density: [1000, 3000],
    healthcare_access: [4, 5],
  },
  Chile: {
    temperature: [10, 28],
    rainfall: [20, 150],
    humidity: [30, 70],
    population_density: [300, 1200],
    healthcare_access: [2, 4],
  },
  Nepal: {
    temperature: [5, 30],
    rainfall: [50, 350],
    humidity: [40, 80],
    population_density: [200, 1500],
    healthcare_access: [2, 4],
  },
  Turkey: {
    temperature: [10, 35],
    rainfall: [20, 200],
    humidity: [30, 70],
    population_density: [500, 2000],
    healthcare_access: [3, 4],
  },
  Bangladesh: {
    temperature: [20, 38],
    rainfall: [200, 600],
    humidity: [70, 100],
    population_density: [800, 3000],
    healthcare_access: [2, 3],
  },
  India: {
    temperature: [15, 45],
    rainfall: [50, 500],
    humidity: [40, 100],
    population_density: [500, 3000],
    healthcare_access: [2, 4],
  },
  Pakistan: {
    temperature: [20, 45],
    rainfall: [0, 300],
    humidity: [30, 70],
    population_density: [300, 2000],
    healthcare_access: [1, 3],
  },
  Indonesia: {
    temperature: [22, 35],
    rainfall: [200, 500],
    humidity: [70, 100],
    population_density: [400, 2500],
    healthcare_access: [2, 4],
  },
  Philippines: {
    temperature: [24, 36],
    rainfall: [150, 450],
    humidity: [70, 100],
    population_density: [500, 2000],
    healthcare_access: [2, 4],
  },
  Australia: {
    temperature: [30, 48],
    rainfall: [0, 100],
    humidity: [10, 40],
    population_density: [100, 500],
    healthcare_access: [4, 5],
  },
  Spain: {
    temperature: [15, 40],
    rainfall: [0, 200],
    humidity: [30, 60],
    population_density: [300, 1200],
    healthcare_access: [3, 5],
  },
  USA: {
    temperature: [10, 40],
    rainfall: [0, 300],
    humidity: [20, 80],
    population_density: [200, 1500],
    healthcare_access: [3, 5],
  },
  Mexico: {
    temperature: [20, 40],
    rainfall: [50, 250],
    humidity: [30, 80],
    population_density: [300, 1500],
    healthcare_access: [2, 4],
  },
  Florida: {
    temperature: [20, 38],
    rainfall: [100, 400],
    humidity: [60, 100],
    population_density: [500, 2000],
    healthcare_access: [3, 5],
  },
  Texas: {
    temperature: [15, 45],
    rainfall: [0, 300],
    humidity: [20, 70],
    population_density: [300, 1500],
    healthcare_access: [2, 5],
  },
  Louisiana: {
    temperature: [20, 40],
    rainfall: [100, 500],
    humidity: [60, 100],
    population_density: [400, 1500],
    healthcare_access: [2, 4],
  },
  "Puerto Rico": {
    temperature: [22, 36],
    rainfall: [150, 400],
    humidity: [70, 100],
    population_density: [500, 2000],
    healthcare_access: [2, 3],
  },
  Cuba: {
    temperature: [22, 36],
    rainfall: [100, 300],
    humidity: [60, 90],
    population_density: [400, 1500],
    healthcare_access: [2, 3],
  },
  Oklahoma: {
    temperature: [5, 38],
    rainfall: [50, 300],
    humidity: [30, 70],
    population_density: [100, 1000],
    healthcare_access: [2, 4],
  },
  Kansas: {
    temperature: [5, 38],
    rainfall: [40, 300],
    humidity: [30, 70],
    population_density: [100, 900],
    healthcare_access: [2, 4],
  },
  Nebraska: {
    temperature: [0, 35],
    rainfall: [30, 250],
    humidity: [30, 70],
    population_density: [50, 800],
    healthcare_access: [2, 4],
  },
  Missouri: {
    temperature: [5, 35],
    rainfall: [60, 300],
    humidity: [40, 80],
    population_density: [200, 1200],
    healthcare_access: [2, 4],
  },
};

function getRandomDate(): string {
  return dayjs().format("YYYY-MM-DD");
}

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInRange(min: number, max: number, decimals = 2): number {
  const rand = Math.random() * (max - min) + min;
  return parseFloat(rand.toFixed(decimals));
}

function generateDisasterData() {
  const disaster = getRandom(disasterTypes);
  const region = getRandom(disasterRegions[disaster]);
  const features = regionFeatures[region];

  const temperature = getRandomInRange(...features.temperature);
  const rainfall = getRandomInRange(...features.rainfall);
  const humidity = getRandomInRange(...features.humidity);
  const population_density = getRandomInRange(...features.population_density);
  const healthcare_access = Math.floor(
    getRandomInRange(...features.healthcare_access, 0)
  );

  const disease = getRandom(disasterDiseases[disaster]);
  const disease_reported = disease === "None" ? 0 : getRandom([0, 1]);

  return {
    date: getRandomDate(),
    disaster_type: disaster,
    region,
    temperature,
    rainfall,
    humidity,
    population_density,
    healthcare_access,
    disease_type: disease,
    disease_reported,
  };
}

export default generateDisasterData;
