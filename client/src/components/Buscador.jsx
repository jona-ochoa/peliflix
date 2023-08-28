import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Buscador = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value.trim();
    if (keyword.length === 0) {
      swal("Escribe una palabra clave.", "Vuelve a intentar", "error");
    } else if (keyword.length < 4) {
      swal("Escribe más de 4 caracteres.", "Vuelve a intentar", "error");
    } else {
        navigate(`/resultados?keyword=${keyword}`);
    }
    e.currentTarget.keyword.value = "";
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="form d-flex">
      <input
        className="form-control mx-1"
        type="text"
        name="keyword"
        placeholder="Buscar..."
      />
      <button type="submit" className="btn btn-outline-info">
        Buscar
      </button>
    </form>
    </>
  );
};

export default Buscador;
