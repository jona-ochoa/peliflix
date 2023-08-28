import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Listado from "./components/Listado";
import Login from "./components/Login";
import Register from "./components/Register";
import Detalle from "./components/Detalle";
import { Route, Routes } from "react-router-dom";
import Resultados from "./components/Resultados";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

import { Analytics } from '@vercel/analytics/react';

import "./app.css";
import Favoritos from "./components/Favoritos";
import DetalleTv from "./components/DetalleTv";

function App() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  let tempMovies;
  let tempTv;
  const favMovies = localStorage.getItem("favs");
  const favTv = localStorage.getItem("favs");

  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");

    if (favsInLocal !== null) {
      const favsArray = JSON.parse(favsInLocal);
      setFavorites(favsArray);
    }
  }, []);

  if (favMovies === null && favTv === null) {
    tempMovies = [];
    tempTv = [];
  } else {
    tempMovies = JSON.parse(favMovies);
    tempTv = JSON.parse(favTv);
  }

  const addOrRemoveFromFavorites = (e) => {
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imageURL = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("h5").innerText;
    const name = parent.querySelector("h5").innerText;
    const overview = parent.querySelector("p").innerText;

    const tvData = {
      imageURL,
      name,
      overview,
      id: btn.dataset["tvId"],
    };

    const movieData = {
      imageURL,
      title,
      overview,
      id: btn.dataset["movieId"],
    };

    let movieIsInArray = tempMovies.find((oneMovie) => {
      return oneMovie.id === movieData.id;
    });

    let tvIsInArray = tempTv.find((oneTv) => {
      return oneTv.id === tvData.id;
    });

    if (!movieIsInArray) {
      tempMovies.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMovies));
      setFavorites(tempMovies);
      swal(`Se agrego a favoritos`, "", "success");
    } else {
      let movieLeft = tempMovies.filter((oneMovie) => {
        return oneMovie.id !== movieData.id;
      });

      if (!tvIsInArray) {
        tempTv.push(tvData);
        localStorage.setItem("favs", JSON.stringify(tempTv));
        setFavorites(tempTv);
        swal(`Se agrego a favoritos de TV`, "", "success");
      } else {
        let tvLeft = tempTv.filter((oneTv) => {
          return oneTv.id !== tvData.id;
        });

        localStorage.setItem("favs", JSON.stringify(movieLeft, tvLeft));
        setFavorites(movieLeft, tvLeft);
        swal(`Se elimino de favoritos`, "", "error");
      }
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

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
          <Route path="/detalletv" element={<DetalleTv />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route
            path="/favoritos"
            element={<Favoritos {...{ addOrRemoveFromFavorites, favorites }} />}
          />
        </Routes>
      </div>
      <Footer />
      <Analytics />
    </>
  );
}

export default App;
