import { Link, Navigate } from "react-router-dom";

const Favoritos = (props) => {
    const token = sessionStorage.getItem("token");

  return (
    <>
    {!token && <Navigate to="/" />}
      <h2>Seccion de favoritos</h2>
      <div className="row">
        {props.favorites.map((oneMovie, idx) => {
          return (
            <div className="col-4" key={idx}>
              <div className="card my-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${oneMovie.imageURL}`}
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
      </div>
    </>
  );
};

export default Favoritos;
