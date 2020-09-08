// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Movie = sequelize.define("Movie", {
    // The email cannot be null, and must be a proper email before creation
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	userRating: {
		type: DataTypes.STRING,
		allowNull: false
	},
	averageRating: {
		type: DataTypes.STRING,
		allowNull: false
	},
	movieName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    // The password cannot be null
    
  });

  return Movie;
};