const express = require("express");
const { Favorite, User } = require("../models");
const userFavorite = express.Router();


userFavorite.get("/",async (req,res)=>{
  try{
    const {userId}=req.body
  const userFav=await Favorite.findAll({where:{userId}})
  return res.status(200).send(userFav)
  }catch(error){
    return res.sendStatus(404)
  }
})

userFavorite.post("/add", async (req, res) => {
  try {
    const { userId, movieId, title, path, overview, vote } = req.body;
    await Favorite.findOrCreate({
      where: { movieId, userId },
      defaults: { userId, movieId, title, path, overview, vote },
    });
    return res.status(201);
  } catch (error) {
    return res.status(404).send({ message: "No se pudo añadir a favoritos" });
  }
});

userFavorite.delete("/remove" ,async (req, res) => {
  try {
    const { userId,movieId} = req.body;
    await Favorite.destroy({
      where: {userId,movieId},
    });
    return res.sendStatus(200);
  } catch (error) {
    return error;
  }
});

// userFavorite.delete("/remove" ,(req,res)=>{
//   const { userId,movieId} = req.body;
//   Favorite.destroy({where:{movieId,userId}})
//   .then(()=>res.sendStatus(200))
//   .catch((err)=>console.log(err))
// })





module.exports = userFavorite;
