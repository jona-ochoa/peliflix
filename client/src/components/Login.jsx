import axios from "axios";
import swal from "sweetalert";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const getApiUrl = () => {
    if (window.location.hostname === "localhost") {
      return "http://localhost:3001/api/v1/user/login";
    } else {
      return "https://jonaflix-api.vercel.app/api/v1/user/login";
    }
  };

  const apiUrl = getApiUrl();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

    if (!email || !password) {
      swal("Los campos no pueden estar vacios", "Vuelve a intentar", "error");
      return;
    }
    if (email && !regexEmail.test(email)) {
      swal("Email inválido", "Vuelve a intentar", "error");
      return;
    }

    axios.post(apiUrl, { email, password }).then((res) => {
      console.log(res);
      swal("Ingreso correcto", "Succesfully!!", "success");
      const tokenRecibido = res.data.token;
      sessionStorage.setItem("token", tokenRecibido);
      navigate("/listado");
    });
  };

  let token = sessionStorage.getItem("token");

  return (
    <>
      {token && <Navigate to="/listado" />}
      <div className="d-flex justify-content-center align-items-center">
          <div className="col-8 bg-dark text-light p-4 rounded">
            <h2 className="p-2">Formulario de Login</h2>
            <form className="container-sm h-100" onSubmit={submitHandler}>
              <label className="form-label d-block mt-1">
                <span className="">Correo electrónico:</span>
                <br />
                <input className="form-control" type="text" name="email" />
              </label>
              <br />
              <label className="form-label d-block mt-1">
                <span>Contraseña:</span>
                <br />
                <input
                  className="form-control"
                  type="password"
                  name="password"
                />
              </label>
              <br />
              <button type="submit" className="btn btn-success form-control">
                Ingresar
              </button>
            </form>
          </div>
       </div> 
    </>
  );
}

export default Login;
