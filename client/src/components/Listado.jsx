import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import swal from "sweetalert";

const Listado = (props) => {
  let token = sessionStorage.getItem("token");
  const [movieList, setMovieList] = useState([]);
  
  useEffect(() => {
    const endpoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=539fab34d2cc6ed437e24d54b820b2ad&language=es-ES&page=1";

    axios
      .get(endpoint)
      .then((res) => {
        const apiData = res.data.results;
        setMovieList(apiData);
      })
      .catch((error) => {
        swal(
          `Error del servidor: ${error}`,
          "Vuelve a intentar en otro momento",
          "error"
        );
      });
  }, [setMovieList]);

  return (
    <>
      {!token && <Navigate to="/" />}
      <div className="row">
        {/* Estructura Base */}
        <h2>Listado de peliculas</h2>
        {movieList.map((oneMovie, idx) => {
          return (
            <div className="col-3" key={idx}>
              <div className="card my-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`}
                  className="card-img-top"
                  alt="image"
                />
                <button className="favourite-btn" data-movie-id={oneMovie.id} onClick={props.addOrRemoveFromFavorites}>
                 🖤
                  </button>
                <div className="card-body">
                  <h5 className="card-title">
                    {oneMovie.title.substring(0, 20)}...
                  </h5>
                  <p className="card-text">
                    {oneMovie.overview.substring(0, 100)}...
                  </p>
                  <Link to={`/detalle?movieId=${oneMovie.id}`} className="btn btn-primary">
                    View Detail
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Listado;
