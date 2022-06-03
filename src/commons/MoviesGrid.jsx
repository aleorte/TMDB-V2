import { useEffect, useState } from "react";

import { MovieCard } from "./MovieCard";
import { get } from "../utils/https";
import { Spinner } from "../components/Spinner";
import { UseQuery } from "../utils/UseQuery";
import style from "./moviesGrid.module.css";

export function MoviesGrid() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = UseQuery();
  const search = query.get("search");

  useEffect(() => {
    setLoading(true);
    const searchUrl = search
      ? "/search/movie?query=" +
        search +
        "&api_key=9187b8dc72c1d964dc650264b4b28adf"
      : "/movie/popular?api_key=9187b8dc72c1d964dc650264b4b28adf";
    get(searchUrl).then((data) => {
      console.log(data);
      setMovies(data.results);
      setLoading(false);
    });
  }, [search]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <ul className={style.moviesGrid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  );
}
