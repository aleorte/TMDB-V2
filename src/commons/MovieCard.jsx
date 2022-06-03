import style from "./movieCard.module.css";
import { Link } from "react-router-dom";

export function MovieCard({ movie }) {
  const imagen = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
  return (
    <li className={style.movieCard}>
      <Link to={"/movies/" + movie.id}>
        <img
          width={230}
          height={345}
          className={style.movieImage}
          src={imagen}
          alt={movie.title}
        />
        <div>{movie.title}</div>
      </Link>
    </li>
  );
}
