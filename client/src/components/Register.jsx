import axios from 'axios';
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const getApiUrl = () => {
        if (window.location.hostname === "localhost") {
          return "http://localhost:3001/api/v1/user/register";
        } else {
          return "https://jonaflix-api.vercel.app/api/v1/user/register";
        }
      };
      const apiUrl = getApiUrl();

      const registerHandler = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmpassword = e.target.confirmpassword.value
    
        const regexEmail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    
        if (!email || !password) {
          swal("Los campos no pueden estar vacios", "Vuelve a intentar", "error");
          return;
        }
        if (email && !regexEmail.test(email)) {
          swal("Email inválido", "Vuelve a intentar", "error");
          return;
        }

        if(password !== confirmpassword){
            swal("Las contraseñas no coinciden", "Vuelve a intentar", "error");
            return;
        }
    
        axios.post(apiUrl, { email, password }).then((res) => {
            if (res.data.success) {
              swal("Registrado con éxito!!", "Successfully!!", "success");
              navigate('/');
            } else {
              swal("Error al registrar", "Vuelve a intentar", "error");
            }
          }).catch((error) => {
            swal(`Error: ${error}`, "Vuelve a intentar", "error");
          });
      };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="bg-dark text-light card shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-center">Formulario De Registro</h2>
              <form onSubmit={registerHandler}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo Electrónico
                  </label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmpassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmpassword"
                  />
                </div>
                <div className="d-grid text-center">
                  <button type="submit" className="btn btn-success btn-lg">
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
