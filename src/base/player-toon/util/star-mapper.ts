/**
 * stars: the new level of the Toon
 * remnants: how many remnants are required to obtain this star level
 * upgrades: The upgrades a toon will receive after reaching this level
 */
const StarMapper = [
  {
    stars: 1,
    remnants: 5,
    upgrades: {
      power: 175,
      speed: 15,
      attack: 35,
      defense: 35,
      health: 650,
      protection: 50,
      evasion: 5,
      criticalChancePercentage: 0,
      criticalDamagePercentage: 0,
    },
  },
  {
    stars: 2,
    remnants: 15,
    upgrades: {
      power: 275,
      speed: 15,
      attack: 40,
      defense: 40,
      health: 690,
      protection: 60,
      evasion: 5,
      criticalChancePercentage: 1,
      criticalDamagePercentage: 1,
    },
  },
  {
    stars: 3,
    remnants: 30,
    upgrades: {
      power: 375,
      speed: 15,
      attack: 45,
      defense: 45,
      health: 750,
      protection: 64,
      evasion: 5,
      criticalChancePercentage: 1,
      criticalDamagePercentage: 1,
    },
  },
  {
    stars: 4,
    remnants: 60,
    upgrades: {
      power: 475,
      speed: 20,
      attack: 55,
      defense: 55,
      health: 865,
      protection: 72,
      evasion: 5,
      criticalChancePercentage: 1,
      criticalDamagePercentage: 1,
    },
  },
  {
    stars: 5,
    remnants: 100,
    upgrades: {
      power: 575,
      speed: 20,
      attack: 70,
      defense: 70,
      health: 916,
      protection: 78,
      evasion: 5,
      criticalChancePercentage: 1,
      criticalDamagePercentage: 1,
    },
  },
  {
    stars: 6,
    remnants: 145,
    upgrades: {
      power: 675,
      speed: 21,
      attack: 75,
      defense: 75,
      health: 1020,
      protection: 100,
      evasion: 5,
      criticalChancePercentage: 1,
      criticalDamagePercentage: 2,
    },
  },
  {
    stars: 7,
    remnants: 190,
    upgrades: {
      power: 800,
      speed: 22,
      attack: 250,
      defense: 250,
      health: 1565,
      protection: 650,
      evasion: 5,
      criticalChancePercentage: 2,
      criticalDamagePercentage: 3,
    },
  },
  {
    stars: 8,
    remnants: 245,
    upgrades: {
      power: 900,
      speed: 23,
      attack: 265,
      defense: 265,
      health: 1754,
      protection: 767,
      evasion: 5,
      criticalChancePercentage: 3,
      criticalDamagePercentage: 4,
    },
  },
  {
    stars: 9,
    remnants: 300,
    upgrades: {
      power: 1000,
      speed: 25,
      attack: 304,
      defense: 304,
      health: 1900,
      protection: 950,
      evasion: 10,
      criticalChancePercentage: 5,
      criticalDamagePercentage: 6,
    },
  },
  {
    stars: 10,
    remnants: 400,
    upgrades: {
      power: 1500,
      speed: 50,
      attack: 700,
      defense: 700,
      health: 2500,
      protection: 1500,
      evasion: 50,
      criticalChancePercentage: 6,
      criticalDamagePercentage: 7,
    },
  },
];

export const getStarMapper = () => {
  return StarMapper;
};

export const playerShouldLevelUp = (
  currentPlayerStars: number,
  currentPlayerRemnants: number,
) => {
  const currentStarMapObject = getStarMapper().filter(
    (obj) => obj.stars === currentPlayerStars + 1,
  );
  if (currentStarMapObject && currentStarMapObject.length === 1) {
    const currentStarMapObjectRemnants = currentStarMapObject[0].remnants;
    return currentPlayerRemnants >= currentStarMapObjectRemnants ? true : false;
  }
};
