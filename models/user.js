module.exports = function(sequelize, DataTypes){
  var User = sequelize.define("User", {
      profile: DataTypes.JSONB
    });
    return User;
};
