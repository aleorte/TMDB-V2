import { useEffect, useState } from "react";
import { MovieCard } from "../movieCard";
import { get } from "../../utils/https";
import { Spinner } from "../../components/Spinner/Spinner";
import { UseQuery } from "../../utils/UseQuery";
import style from "./moviesGrid.module.css";
import YouTube from "react-youtube";
import axios from "axios";
import { url } from "../../utils/https";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {getFavorites} from "../../State/favorite";
import {Star, StarBorder} from "../../styled/materialIcon"

export function MoviesGrid() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [starValue, setStarValue] = useState(0);
  const dispatch=useDispatch()
  const favorite = useSelector((state) => state.favorite);
  const user = useSelector((state) => state.user);
  const query = UseQuery();
  const location = useLocation().pathname;
  const path=location.slice(1, 10)
  const search = query.get("search");
  const apiKey = "api_key=9187b8dc72c1d964dc650264b4b28adf";

  const star = Array(5).fill(0); 
  

const fetchMovie = async (id) => {
  const { data } = await axios.get(
    `${url}/movie/${id}?${apiKey}&append_to_response=videos`
  );
  if (data.videos.results) {
    const trailer1 = data.videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );
    setTrailer(trailer1 ? trailer1 : data.videos.results[0]);
    setSelectedMovie(data);
    setStarValue(data.vote_average/2)
  }
};


const selectMovie = (movie) => {
  path==="favorites"?fetchMovie(movie.movieId):fetchMovie(movie.id);
  setPlaying(false);
  window.scrollTo(0, 0);
};
const selecttMovie = (movie) => {
  path==="favorites"?fetchMovie(movie.movieId):fetchMovie(movie.id);
  setPlaying(false)
};

  useEffect(()=>{
   dispatch(getFavorites(user.userInfo.id))
  },[])

  useEffect(() => {
        setLoading(true);
        if(path==="favorites"&&favorite.length){
          setMovies(favorite)
          setLoading(false)
          selecttMovie(favorite[0])
        }else if(path===""){
          const searchUrl = search
        ? "/search/movie?query=" + search + `&${apiKey}`
        : `/movie/popular?${apiKey}`;
      get(searchUrl).then((data) => {
        setMovies(data.results);
        setLoading(false);
        if (data.results.length) {
          selecttMovie(data.results[0]);
        }
      });
        }   
    }
  , [search,favorite,location]);


  if (loading) {
    return <Spinner />;
  }


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
            <h1 className={style.heroOverview}>{selectedMovie.title}</h1>
            { star.map((_, index) =>starValue>index?<Star className={style.heroStar}/>:<StarBorder className={style.heroStar}/>)}
            {selectedMovie.overview ? (
              <p className={style.heroOverview}>{selectedMovie.overview}</p>
            ) : null}
          </div>
        </div>
      ) : (
        "Cargando Películas"
      )}

      <ul className={style.moviesGrid}>
        {path==="favorites"?favorite.map((movie) => (
          <MovieCard key={movie.id} movie={movie} selectedMovie={selectMovie}/>
        )):movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} selectedMovie={selectMovie}/>
        ))}
      </ul>
    </>
  );
}
