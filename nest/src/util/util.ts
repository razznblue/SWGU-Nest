import { Toon } from '../base/toons/toons.model';

export const Util = {
  generateToonId(toon: Toon) {
    let id = '';

    // Add ID Prefix(based on toon name)
    for (const name of toon.getName().split(' ')) {
      const firstLetter = name.split('')[0].toUpperCase();
      id += firstLetter;
    }
    id += '-';

    // Add unique number to ID(based on toon createdAt)
    const uniqueDateId = toon.getCreatedAt().replace(/\D/g, '');
    id += uniqueDateId + '-';

    // Add ID Suffix(based on toon tags)
    for (const tag of toon.getTags()) {
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
};

// const toonData1 = {
//   name: 'Jedi Knight Anakin',
//   tags: ['Light Side', 'Jedi', 'Galactic Republic'],
// };

// const toonData2 = {
//   name: 'Ahsoka Tano',
//   tags: ['Light Side', 'Jedi', 'Galactic Republic'],
// };

// Util.generateToonId(new Toon(toonData1));
// Util.generateToonId(new Toon(toonData2));
