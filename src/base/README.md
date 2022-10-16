# Toon Models

## There are various types of Toon schemas and each has a specific purpose.

### Toon
 - This schema represents the table where all BASE toon objects lives. Everytime a player unlocks a specific character toon, this is where the data will be pulled from. This table does not include uniqueIds but these documents will be pulled and queried by name and shortName. The data in this table will never be modified by a user.

### PlayerToon
 - This schema represents the toon that a player owns in their roster. This document will have the generatedID(based on name, createdDate, and tags). This document will be modified everytime a player improves a stat on their character. This stat data in this table will change so long as the player is editing their roster regularly.

### TempToon
 - Not stored in the DB. See the README.md in the base folder for info on this data object.