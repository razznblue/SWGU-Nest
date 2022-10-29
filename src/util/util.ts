export const Util = {
  generateToonId(toonName: string, createdAt: string, tags: string[]) {
    let id = '';

    // Add ID Prefix(based on toon name)
    const toonNameSplitted = toonName
      .replace('(', '')
      .replace(')', '')
      .split(' ');
    for (const name of toonNameSplitted) {
      const firstLetter = name.split('')[0].toUpperCase();
      id += firstLetter;
    }
    id += '-';

    // Add unique number to ID(based on toon createdAt)
    const uniqueDateId = createdAt.replace(/\D/g, '');
    id += uniqueDateId + '-';

    // Add ID Suffix(based on toon tags)
    for (const tag of tags) {
      const tagWords = tag.split(' ');
      for (const tagWord of tagWords) {
        id += tagWord.split('')[0].toUpperCase();
      }
    }

    return id;
  },

  getCurrentDate() {
    return new Date().toISOString();
  },

  filterObjectsByTag(objects: Array<any>, tagFilter: string) {
    const filteredToons = [];
    for (const object of objects) {
      object.tags.map((tag: string) => {
        if (tag === tagFilter) {
          filteredToons.push(object);
        }
        return objects;
      });
    }
    return filteredToons;
  },

  sortObjectByKey(object: any, key: string) {
    const n = object.length;
    for (let i = 0; i < n - 1; i++) {
      let min = object[i][key];
      let minIndex = i;
      for (let j = i; j < n; j++) {
        if (object[j][key] <= min) {
          min = object[j][key];
          minIndex = j;
        }
      }
      let tmp: any;
      // eslint-disable-next-line prefer-const
      tmp = object[minIndex];
      object[minIndex] = object[i];
      object[i] = tmp;
    }
    return object;
  },

  sortObjectByNestedKey(object: any, key: string, nestedKey: string) {
    const n = object.length;
    for (let i = 0; i < n - 1; i++) {
      let min = object[i][key][nestedKey];
      let minIndex = i;
      for (let j = i; j < n; j++) {
        if (object[j][key][nestedKey] <= min) {
          min = object[j][key][nestedKey];
          minIndex = j;
        }
      }
      let tmp: any;
      // eslint-disable-next-line prefer-const
      tmp = object[minIndex];
      object[minIndex] = object[i];
      object[i] = tmp;
    }
    return object;
  },

  valueExistsInArray(arr: string[], value: string) {
    const index = arr.indexOf(value);
    return index > -1 ? true : false;
  },

  removeValueFromArray(arr: string[], value: string) {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  },

  getRandomIndex(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
};

// const toonData = {
//   name: 'Shoretrooper',
//   shortName: 'Shoretrooper',
//   uniqueName: 'shoretrooper',
//   aliases: ['Imperial Trooper', 'Scarif Protector'],
//   tags: ['Dark Side', 'Empire', 'Imperial Trooper'],
//   stats: {
//     speed: 115,
//     attack: 130,
//     defense: 30,
//     health: 500,
//     protection: 0,
//     evasion: 650,
//     criticalChancePercentage: 21,
//     criticalDamagePercentage: 125,
//   },
//   media: {
//     primaryAssetFront:
//       'https://media-library-swgu.netlify.app/images/toon_cards/fronts/shoretrooper.webp',
//     primaryAssetBack:
//       'https://media-library-swgu.netlify.app/images/toon_cards/backs/ds-empire-it.webp',
//     heroImage:
//       'https://media-library-swgu.netlify.app/images/toon_hero/shoretrooper-hero.webp',
//     remnantImage:
//       'https://media-library-swgu.netlify.app/images/toon_remnants/shoretrooper-remnant.webp',
//   },
//   unlocked: false,
//   remnants: 5,
//   stars: 1,
//   description:
//     'Shoretrooper gains 5% defense for every active Empire ally. If Shoretrooper has no debuffs when using Unwavered Defense, reduce its cooldown by 1 and call any ally to assist. UNWAVERED DEFENSE: Shoretrooper gains stealth for 2 turns and all allies gain 10% protection and health.',
//   abilities: [],
//   createdAt: Util.getCurrentDate(),
// };

// Util.generateToonId(toonData);
