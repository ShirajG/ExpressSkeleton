# Express Basics

## An Express Skeleton using Sequelize with postgres

- _Add the file config/credentials.js to store all your credentials in_
  * This file is not included in version control.  
- _Redis is used as the backend for the session store_
  * Hiredis redis client is in use for better performance
  * Add your configuration to the credentials file under the key `redisConfig[environment]`  
- _A basic user model is included. You can see how to define your own models [here](http://docs.sequelizejs.com/en/latest/docs/models-definition/)_ 
- _Passport is used to manage user authentication. More info [here](http://passportjs.org/)_
  * Right now only the local auth strategy is implemented, many others are possible
  * Details are in middleware/passportConfig.js
- _connect-flash middleware is in use to set flash messages_
