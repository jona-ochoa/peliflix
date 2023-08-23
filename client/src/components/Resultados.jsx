import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import swal from "sweetalert";

const Resultados = () => {
  let query = new URLSearchParams(window.location.search);
  let keyword = query.get("keyword");

  const [movieResults, setMovieResults] = useState([]);

  useEffect(() => {
    const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=539fab34d2cc6ed437e24d54b820b2ad&language=es-Es&query=${keyword}`;
    axios
      .get(endpoint)
      .then(response => {
        const movieArray = response.data.results;
        if(movieArray.length === 0){
            swal(
                `Tu busqueda no encontro resultados`,
                "Vuelve a intentar en otro momento",
                "error"
              );
        }
        setMovieResults(movieArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [keyword]);


  return (
    <div className="row">
      <h2>Seccion de Resultados</h2>
      <h5>Resultados encontrados: <em>{keyword}</em></h5>
      {movieResults.length === 0 && <h3>No se encontro resultados</h3>}
      {movieResults.map((oneMovie, idx) => {
          return (
            <div className="col-4" key={idx}>
              <div className="card my-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`}
                  className="card-img-top"
                  alt="image"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {oneMovie.title.substring(0, 30)}...
                  </h5>
                  <Link to={`/detalle?movieId=${oneMovie.id}`} className="btn btn-primary">
                    View Detail
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Resultados;
