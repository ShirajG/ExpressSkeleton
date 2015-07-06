module.exports = function(sequelize, DataTypes){
  var User = sequelize.define("User", {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      profile: DataTypes.JSONB
    });
    return User;
};
