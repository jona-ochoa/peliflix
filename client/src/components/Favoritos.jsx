import { Link, Navigate } from "react-router-dom";
import logo from "../assets/favorites.svg";

const Favoritos = (props) => {
  const token = sessionStorage.getItem("token");

  return (
    <>
      {!token && <Navigate to="/" />}
      {props.favorites.length === 0 ? (
        <>
          <div className="row my-4 container-fluid">
            <div className="col-6">
              <h1 className="text-danger mb-4">No hay Favoritos</h1>
              <h3 className="mb-4">
                ¡Explora emocionantes películas y programas de TV en nuestra
                colección! Aunque esta sección no tiene favoritos por ahora,
                aquí encontrarás una variedad de contenido intrigante que
                seguramente capturará tu interés. Navega a través de una amplia
                gama de opciones y descubre tus próximas historias favoritas.
                ¡No dudes en agregar películas y programas a tus favoritos para
                tenerlos siempre al alcance de tu mano! Disfruta de la
                experiencia de entretenimiento en cada clic mientras exploras
                nuevas aventuras cinematográficas y televisivas.
              </h3>
                <Link to="/listado" className="btn btn-danger">
                  Ir a Listado
                </Link>
            </div>
            <div className="col-6 d-flex align-items-center justify-content-center">
              <img className="img-fluid img-thumbnail" src={logo} alt="not found" />
            </div>
          </div>
        </>
      ) : (
        <div className="row b-40">
          <h2>Seccion de favoritos</h2>
          {props.favorites.map((oneMovie, idx) => {
            return (
              <div className="col-3" key={idx}>
                <div className="card my-4">
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${oneMovie.imageURL}`}
                    className="img-fluid"
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
      )}
    </>
  );
};

export default Favoritos;
