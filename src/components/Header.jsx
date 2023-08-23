import { Link, NavLink } from "react-router-dom";
import Buscador from "./Buscador";

const Header = (props) => {
  return (
    <header>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand">
            JonaFlix
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/listado">
                  Listado
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/favoritos">
                  Favoritos
                </NavLink>
              </li>
              <li className="nav-item d-flex align-items-center">
                
                <span className="text-success ">
                  {props.favorites.length > 0 && <>Peliculas en favorito {props.favorites.length}</>}
                  
                  </span>
              </li>
            </ul>
          </div>
          <Buscador />
        </div>
      </nav>
    </header>
  );
};

export default Header;
