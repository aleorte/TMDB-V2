import { useEffect, useState } from "react";
import { MovieCard } from "../movieCard";
import { get } from "../../utils/https";
import { Spinner } from "../../components/Spinner";
import { UseQuery } from "../../utils/UseQuery";
import style from "./moviesGrid.module.css";
import YouTube from "react-youtube";
import axios from "axios";
import { url } from "../../utils/https";

export function MoviesGrid(favorite) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState(null);
  const [playing, setPlaying] = useState(false);
  const[fav,setFav]=useState(false)
  const query = UseQuery();
  const search = query.get("search");
  const apiKey = "api_key=9187b8dc72c1d964dc650264b4b28adf";



  useEffect(() => {
    setFav(favorite)
      console.log("entreeeeeeeee")
      setLoading(true);
      const searchUrl = search
        ? "/search/movie?query=" + search + `&${apiKey}`
        : `/movie/popular?${apiKey}`;
      get(searchUrl).then((data) => {
        setMovies(data.results);
        setSelectedMovie(data.results[0]);
        setLoading(false);
        if (data.results.length) {
          fetchMovie(data.results[0].id);
        }
      });
    }
  
  , [search]);
  if (loading) {
    return <Spinner />;
  }

  const fetchMovie = async (id) => {
    const { data } = await axios.get(
      `${url}/movie/${id}?${apiKey}&append_to_response=videos`
    );
    if (data.videos && data.videos.results) {
      const trailer1 = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer1 ? trailer1 : data.videos.results[0]);
      setSelectedMovie(data);
    }
  };


  const selectMovie = (movie) => {
    fetchMovie(movie.id);
    setPlaying(false);
    setSelectedMovie(movie);
    window.scrollTo(0, 0);
  };

  console.log("peliculasssss", selectedMovie);

  return (
    <>
      {movies.length && selectedMovie ? (
        <div
          className={style.hero}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`,
          }}
        >
          <div className={style.heroContent}>
            {playing ? (
              <>
                <YouTube
                  className={style.youtubeContainer}
                  videoId={trailer.key}
                  opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: {
                      autoplay: 1,
                      controls: 0,
                      cc_load_policy: 0,
                      fs: 0,
                      iv_load_policy: 0,
                      modestbranding: 0,
                      rel: 0,
                      showinfo: 0,
                    },
                  }}
                />
                <button
                  className={style.closeVideo}
                  onClick={() => {
                    setPlaying(false);
                  }}
                >
                  Cerrar
                </button>
              </>
            ) : null}

            <button
              className={style.heroButton}
              onClick={() => {
                setPlaying(true);
              }}
            >
              Reproducir trailer
            </button>
            <h1>{selectedMovie.title}</h1>
            {selectedMovie.overview ? (
              <p className={style.heroOverview}>{selectedMovie.overview}</p>
            ) : null}
          </div>
        </div>
      ) : (
        "Cargando Películas"
      )}

      <ul className={style.moviesGrid}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} selectedMovie={selectMovie}/>
        ))}
      </ul>
    </>
  );
}
