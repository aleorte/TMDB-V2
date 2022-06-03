import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../utils/https";
import { Spinner } from "./Spinner";
import styles from "./MovieDetails.module.css";

export function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams();

  useEffect(() => {
    setLoading(true);
    get("/movie/" + movieId + "?api_key=9187b8dc72c1d964dc650264b4b28adf").then(
      (data) => {
        setMovie(data);
        setLoading(false);
      }
    );
  }, [movieId]);

  if (loading) {
    return <Spinner />;
  }
  if (!movie) return null;

  console.log(movie.overview);
  const imgUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  return (
    <div className={`${styles.movieLetter}`}>
      <img className={`${styles.col}`} src={imgUrl} alt={movie.title} />
      <div className={`${styles.col} ${styles.movieDetails}`}>
        <p className={styles.firstItem}>
          <strong>Title:</strong> {movie.title}
        </p>

        <p>
          <strong>Descrption:</strong>
          {movie.overview}
        </p>
      </div>
    </div>
  );
}
