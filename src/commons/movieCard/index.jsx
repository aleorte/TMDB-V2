import axios from "axios";
import style from "./movieCard.module.css";
import { Favorite, FavoriteBorder } from "../../styled/materialIcon";
import { useState } from "react";

export function MovieCard({ movie, selectedMovie }) {
  const [add, setAdd] = useState(false);

  const removeFavorite = (movie) => {
    const remove = { movieId: movie.id, userId: 1 };
    axios.delete("http://localhost:3001/api/favorite/remove", remove);
  };

  const addFavorite = (movie) => {
    const fav = {
      userId: 2,
      movieId: movie.id,
      title: movie.title,
      path: movie.backdrop_path,
      overview: movie.overview,
      vote: movie.vote_average,
    };
    axios.post("http://localhost:3001/api/favorite/add", fav);
  };
  const imagen = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
  return (
    <div className={style.movieCard}>
      <img
        onClick={() => {
          selectedMovie(movie);
        }}
        width={230}
        height={345}
        className={style.movieImage}
        src={imagen}
        alt={movie.title}
      />
      {add ? (
        <Favorite
          className={style.favIcon}
          onClick={() => {
            removeFavorite(movie);
            setAdd(!add);
          }}
        />
      ) : (
        <FavoriteBorder
          className={style.favIcon}
          onClick={() => {
            addFavorite(movie);
            setAdd(!add);
          }}
        />
      )}
      <div>{movie.title}</div>
    </div>
  );
}
