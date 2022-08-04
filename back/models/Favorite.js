const S = require("sequelize");
const db = require("../db");

class Favorite extends S.Model {}
Favorite.init(
  {
    userId: {
      type: S.INTEGER,
      allowNull: false,
    },
    movieId: {
      type: S.INTEGER,
      allowNull: false,
    },
    overview: {
      type: S.TEXT,
      allowNull: false,
    },
    path: {
      type: S.STRING,
      allowNull: false,
    },
    vote:{
      type:S.DECIMAL,
      allowNull:false
    }
  },
  { sequelize: db, modelName: "favorite" }
);

module.exports = Favorite;
