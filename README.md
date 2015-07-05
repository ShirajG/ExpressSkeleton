# Express Basics

## An Express Skeleton using Sequelize with postgres

- __Add the file config/credentials.js to store all your credentials in__
  * This file is not included in version control.  
- __Redis is used as the backend for the session store__
  * Hiredis redis client is in use for better performance
  * Add your configuration to the credentials file under the key `redisConfig[environment]`  
- __A basic user model is included. You can see how to define your own models [here](http://docs.sequelizejs.com/en/latest/docs/models-definition/)__
- __Passport is used to manage user authentication. More info [here](http://passportjs.org/)__
  * Right now only the local auth strategy is implemented, many others are possible
  * Details are in middleware/passportConfig.js
- __connect-flash middleware is in use to set flash messages__
- __Grunt is included__
  * The default grunt task will monitor the app for any changes and reload itself.
  * Sass files are updated on changes as well.
