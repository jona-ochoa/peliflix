import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import swal from "sweetalert";

const Listado = (props) => {
  let token = sessionStorage.getItem("token");
  const [movieList, setMovieList] = useState([]);
  const [tvList, setTvList] = useState([]);
  const [currentContentType, setCurrentContentType] = useState("movies");
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = 1000;

  const generatePageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(currentPage - 4, 1);
    let endPage = Math.min(startPage + 9, maxPage);

    while (startPage <= endPage) {
      pageNumbers.push(startPage);
      startPage++;
    }

    return pageNumbers;
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const endpointTV = `https://api.themoviedb.org/3/discover/tv?api_key=539fab34d2cc6ed437e24d54b820b2ad&language=es-ES&page=${currentPage}`;

    const endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=539fab34d2cc6ed437e24d54b820b2ad&language=es-ES&page=${currentPage}`;

    axios
      .get(endpointTV)
      .then((res) => {
        const apiDataTv = res.data.results;
        setTvList(apiDataTv);
      })
      .catch((error) => {
        swal(
          `Error del servidor: ${error}`,
          "Vuelve a intentar en otro momento",
          "error"
        );
      });

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
  }, [setMovieList, setTvList, currentPage]);

  return (
    <>
      {!token && <Navigate to="/" />}
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-outline-primary"
          onClick={() => setCurrentContentType("movies")}
        >
          Mostrar Películas
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => setCurrentContentType("tv")}
        >
          Mostrar TV
        </button>

        <button
          className="btn btn-primary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        {generatePageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            className={`btn btn-outline-primary me-2 ${
              currentPage === pageNumber ? "active" : ""
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        <button
          className="btn btn-primary"
          disabled={currentPage === maxPage}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Siguiente
        </button>
      </div>

      <div className="row">
        <h2>
          Listado de {currentContentType === "movies" ? "películas" : "TVs"}
        </h2>
        {currentContentType === "movies" ? (
          <>
            {" "}
            {movieList.map((oneMovie, idx) => {
              return (
                <div className="col-3" key={idx}>
                  <div className="card my-4">
                     <img
                        src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`}
                        className="card-img-top"
                        alt="image"
                      />

                    <button
                      className="favourite-btn"
                      data-movie-id={oneMovie.id}
                      onClick={props.addOrRemoveFromFavorites}
                    >
                      🖤
                    </button>
                    <div className="card-body">
                      <h5 className="card-title">
                        {oneMovie.title.substring(0, 20)}...
                      </h5>
                      <p className="card-text">
                        {oneMovie.overview.substring(0, 100)}...
                      </p>
                      <Link
                        to={`/detalle?movieId=${oneMovie.id}`}
                        className="btn btn-primary"
                      >
                        View Detail
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            {tvList.map((oneTv, idx) => {
              return (
                <div className="col-3" key={idx}>
                  <div className="card my-4">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${oneTv?.poster_path}`}
                      className="card-img-top"
                      alt="image"
                    />
                    <button
                      className="favourite-btn"
                      data-movie-id={oneTv.id}
                      onClick={props.addOrRemoveFromFavorites}
                    >
                      🖤
                    </button>
                    <div className="card-body">
                      <h5 className="card-title">
                        {oneTv.name.substring(0, 20)}...
                      </h5>
                      <p className="card-text">
                        {oneTv.overview.substring(0, 100)}...
                      </p>
                      <Link
                        to={`/detalletv?tvId=${oneTv.id}`}
                        className="btn btn-primary"
                      >
                        View Detail
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Listado;
