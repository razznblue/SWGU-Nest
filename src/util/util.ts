import { Toon } from '../base/toons/toons.model';

export const Util = {
  generateToonId(toon: Toon) {
    let id = '';

    // Add ID Prefix(based on toon name)
    const toonNameSplitted = toon
      .getName()
      .replace('(', '')
      .replace(')', '')
      .split(' ');
    for (const name of toonNameSplitted) {
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

// const toonData = {
//   name: 'Skiff Guard (Lando Calrissian)',
//   tags: ['Light Side', 'Hutt Clan', 'Smuggler'],
// };

// Util.generateToonId(new Toon(toonData));
