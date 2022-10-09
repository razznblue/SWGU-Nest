"use strict";
exports.__esModule = true;
exports.Util = void 0;
exports.Util = {
    generateToonId: function (toon) {
        var id = '';
        // Add ID Prefix(based on toon name)
        var toonNameSplitted = toon
            .getName()
            .replace('(', '')
            .replace(')', '')
            .split(' ');
        for (var _i = 0, toonNameSplitted_1 = toonNameSplitted; _i < toonNameSplitted_1.length; _i++) {
            var name_1 = toonNameSplitted_1[_i];
            var firstLetter = name_1.split('')[0].toUpperCase();
            id += firstLetter;
        }
        id += '-';
        // Add unique number to ID(based on toon createdAt)
        var uniqueDateId = toon.getCreatedAt().replace(/\D/g, '');
        id += uniqueDateId + '-';
        // Add ID Suffix(based on toon tags)
        for (var _a = 0, _b = toon.getTags(); _a < _b.length; _a++) {
            var tag = _b[_a];
            var tagWords = tag.split(' ');
            for (var _c = 0, tagWords_1 = tagWords; _c < tagWords_1.length; _c++) {
                var tagWord = tagWords_1[_c];
                id += tagWord.split('')[0].toUpperCase();
            }
        }
        return id;
    },
    getCurrentDate: function () {
        return new Date().toISOString();
    }
};
// const toonData = {
//   name: 'Skiff Guard (Lando Calrissian)',
//   tags: ['Light Side', 'Hutt Clan', 'Smuggler'],
// };
// Util.generateToonId(new Toon(toonData));
