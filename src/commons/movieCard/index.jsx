import style from "./movieCard.module.css";
import { Favorite, FavoriteBorder } from "../../styled/materialIcon";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFavorites, deleteFavorites,getFavorites } from "../../State/favorite";
export function MovieCard({ movie, selectedMovie }) {
  const [add, setAdd] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const favorite = useSelector((state) => state.favorite);

  const removeFavorite = (movie) => {
    let remove = {};
    typeof movie.adult==="boolean"
      ? (remove = { movieId: movie.id, userId: user.userInfo.id })
      : (remove = { movieId: movie.movieId, userId: user.userInfo.id });
    dispatch(deleteFavorites(remove))
  };

  const addFavorite = (movie) => {
    const fav = {
      userId: user.userInfo.id,
      movieId: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      overview: movie.overview,
      vote_average: movie.vote_average,
    };
    dispatch(addFavorites(fav));
  };
  console.log("movieeeeeeeeee", movie);
  console.log("FAAAAAAAAAAAV",favorite)
  const imagen = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
  return (
    <>
    {movie.poster_path?(<div className={style.movieCard}>
      
        <img
          onClick={() => {
            selectedMovie(movie);
          }}
          width={230}
          height={345}
          className={style.movieImage}
          src={imagen ? imagen : movie.poster_path}
          alt={movie.title}
        />
     
      {(typeof movie.adult==="boolean"? (
        favorite.find(
          (element) =>
            (element.movieId === movie.id) &
            (element.userId === user.userInfo.id)
        )
      ) : favorite.find(
          (element) =>
            (element.movieId === movie.movieId) &
            (element.userId === user.userInfo.id)
        )) || add===true ? (
        <Favorite
          className={style.favIcon}
          onClick={() => {
            removeFavorite(movie);
            setAdd(false);
          }}
        />
      ) : (
        <FavoriteBorder
          className={style.favIcon}
          onClick={() => {
            addFavorite(movie);
            setAdd(true);
          }}
        />
      )}
      <div>{movie.title}</div>
    </div>
   ) : null}
   </>);
}
