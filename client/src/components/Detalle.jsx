import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import swal from "sweetalert";

const Detalle = () => {
  const token = sessionStorage.getItem("token");

  const [moviesData, setMoviesData] = useState(null);

  let query = new URLSearchParams(window.location.search);
  let movieId = query.get("movieId");

  useEffect(() => {
    const endpoint = `https://api.themoviedb.org/3/movie/${movieId}?api_key=539fab34d2cc6ed437e24d54b820b2ad&language=es-Es`;
    axios
      .get(endpoint)
      .then((response) => {
        const dataId = response.data;
        setMoviesData(dataId);
      })
      .catch((error) => {
        swal(
            `Error del servidor: ${error}`,
            "Vuelve a intentar en otro momento",
            "error"
          );
      });
  }, [movieId]);


  return (
    <>
      {!token && <Navigate to="/" />}
      {!moviesData && <h1>Cargando...</h1>}
      {moviesData && (
        <>
          <h1>{moviesData?.title}</h1>
          <div className="row mb-4">
            <div className="col-4">
              <img
                className="img-fluid"
                src={`https://image.tmdb.org/t/p/w500/${moviesData?.poster_path}`}
                alt={moviesData?.title}
              />
            </div>
            <div className="col-8">
              <h5>Reseña:</h5>
              <p>{moviesData?.overview}</p>
              <h5>Fecha de estreno: {moviesData?.release_date}</h5>
              <h5>Rating: {moviesData.vote_average}</h5>
              <h5>Géneros:</h5>
              <ul>
                { moviesData.genres.map((oneGenre, idx) => <li key={idx}>{oneGenre.name}</li>) }
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detalle;
