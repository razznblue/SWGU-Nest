# SWGU-NEST
 - This is back-end server for Star Wars Galaxy Ultimate. Insert, retrieve, modify, or delete game data.
 - Hosted on Heroku at: [https://swgu-nest.herokuapp.com/](https://swgu-nest.herokuapp.com/)
 - Front end for the project is hosted at: [https://star-wars-galaxy-ultimate.netlify.app](https://star-wars-galaxy-ultimate.netlify.app)
 - The FE(game) will make API calls to this service which interacts with the DB, then sends responses back to the game.

## Running the app locally

```bash
# development
$ npm run start

# development with hot reload
$ npm run start:debug

# production mode
$ npm run start:prod
```

## Models
Rest API's are built for 
  - Players
  - Toons

## Config
 - The project is dependent upon the mongoDB connection url, username, and password. Find the .env file in the google drive. Or
go to the mongodb website, get the username and url, then generate a new password. Make sure update the new one in the drive.

## License
 - TODO: Make a license for this project... if you want...
