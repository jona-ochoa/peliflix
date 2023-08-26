import { useState, useEffect } from 'react';
import Footer from "./components/Footer";
import Header from "./components/Header";
import Listado from "./components/Listado";
import Login from "./components/Login";
import Register from "./components/Register";
import Detalle from "./components/Detalle";
import { Route, Routes } from "react-router-dom";
import Resultados from "./components/Resultados";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

import "./app.css";
import Favoritos from "./components/Favoritos";

function App() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  let tempMovies;
  const favMovies = localStorage.getItem("favs");

  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");

    if (favsInLocal !== null) {
      const favsArray = JSON.parse(favsInLocal);
      setFavorites(favsArray);
    }
  }, []);
  

  if (favMovies === null) {
    tempMovies = [];
  } else {
    tempMovies = JSON.parse(favMovies);
  }


  const addOrRemoveFromFavorites = (e) => {
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imageURL = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("h5").innerText;
    const overview = parent.querySelector("p").innerText;
    const movieData = {
      imageURL,
      title,
      overview,
      id: btn.dataset["movieId"]
    };

    let movieIsInArray = tempMovies.find((oneMovie) => {
      return oneMovie.id === movieData.id;
    });

    if (!movieIsInArray) {
      tempMovies.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMovies));
      setFavorites(tempMovies)
      swal(
        `Se agrego a favoritos`,
        "",
        "success"
      );
    } else {
      let movieLeft = tempMovies.filter(oneMovie => {
        return oneMovie.id !== movieData.id
      })

      localStorage.setItem("favs", JSON.stringify(movieLeft));
      setFavorites(movieLeft)
      swal(
        `Se elimino de favoritos`,
        "",
        "error"
      );
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    navigate('/')
  }

  return (
    <>
      <Header favorites={favorites} logout={logout} />
      <div className="container mt-3 d-flex flex-column min-vh-100">
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/listado"
            element={<Listado {...{ addOrRemoveFromFavorites }} />}
          />
          <Route path="/detalle" element={<Detalle />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route path="/favoritos" element={<Favoritos {...{ addOrRemoveFromFavorites, favorites }} />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
