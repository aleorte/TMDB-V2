const S = require("sequelize");
const db = require("../db");

class Movie extends S.Model {}
Movie.init(
  {
    title: {
      type: S.STRING,
      allowNull: false,
    },
    image: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "movie" }
);
