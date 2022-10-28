// attackToon(opponent) {
//     if (opponent instanceof Toon) {
//         if (this.successfulAttack(opponent)) {
//             //Make a more varied way to calculate damageDealt in future
//             const damageDealt = this.attack - opponent.defense;
//             opponent.takeDamage(damageDealt);
//             console.debug(`${this.name} dealt ${damageDealt} damage to ${opponent.name}`);
//         } else {
//             console.debug(`${opponent.name} evaded attack from ${this.name}`);
//         }

//     }
// }

// successfulAttack(opponent) {
//     return Math.random() >= opponent.evasion / 10000;
// }

// takeDamage(damage) {
//     if (this.protection > 0) {
//         let remainingProtection = this.protection - damage;
//         if (remainingProtection >= 0) {
//             this.protection = remainingProtection;
//         } else {
//             this.protection = 0;
//             this.health -= Math.abs(remainingProtection);
//         }
//     } else {
//         this.health -= damage;
//     }
// }

// addToonInfo(toonInfo) {
//     this.name = toonInfo.name;
//     this.shortName = toonInfo.shortName;
//     this.classes = toonInfo.classes;
//     this.photo = toonInfo.photo;

//     if (toonInfo.useCustomStats) {
//         console.debug(`Using custom stats for ${this.name}`);
//         this.setCustomStats(toonInfo);
//     } else {
//         console.debug(`Using default stats for ${this.name}`);
//         this.setDefaultStats();
//     }

//     //toonInfo.useCustomStats ? this.setDefaultStats() : this.setCustomStats(toonInfo);
// }
// setCustomStats(toonInfo) {
//     this.speed = toonInfo.speed;
//     this.attack = toonInfo.attack;
//     this.defense = toonInfo.defense;
//     this.health = toonInfo.health;
//     this.protection = toonInfo.protection;
//     this.evasion = toonInfo.evasion;
//     this.turnMeter = 0;
// }
// setDefaultStats() {
//     this.speed = 100;
//     this.attack = 100;
//     this.defense = 50;
//     this.health = 300;
//     this.protection = 50;
//     this.evasion = 500; //Highest 10000. 500 === 5% chance to evade an attack
//     this.turnMeter = 0; //Ranges from 0 - 1000.
// }

// getCurrentStats() {
//     return JSON.stringify(this, null, 4);
// }
