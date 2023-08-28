import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import swal from "sweetalert";

const DetalleTv = () => {
  const token = sessionStorage.getItem("token");

  const [tvData, setTvData] = useState(null);

  let query = new URLSearchParams(window.location.search);
  let tvId = query.get("tvId");

  useEffect(() => {
    const endpoint = `https://api.themoviedb.org/3/tv/${tvId}?api_key=539fab34d2cc6ed437e24d54b820b2ad&language=es-Es`;
    axios
      .get(endpoint)
      .then((response) => {
        const dataId = response.data;
        setTvData(dataId);
      })
      .catch((error) => {
        swal(
            `Error del servidor: ${error}`,
            "Vuelve a intentar en otro momento",
            "error"
          );
      });
  }, [tvId]);


  return (
    <>
      {!token && <Navigate to="/" />}
      {!tvData && <h1>Cargando...</h1>}
      {tvData && (
        <>
          <h1>{tvData?.name}</h1>
          <div className="row mb-4">
            <div className="col-4">
              <img
                className="img-fluid"
                src={`https://image.tmdb.org/t/p/w500/${tvData?.poster_path}`}
                alt={tvData?.title}
              />
            </div>
            <div className="col-8">
              <h5>Reseña:</h5>
              <p>{tvData?.overview}</p>
              <h5>Fecha de estreno: {tvData?.release_date}</h5>
              <h5>Rating: {tvData.vote_average}</h5>
              <h5>Géneros:</h5>
              <ul>
                { tvData.genres.map((oneGenre, idx) => <li key={idx}>{oneGenre.name}</li>) }
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DetalleTv;
