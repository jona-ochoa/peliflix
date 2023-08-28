const handleServerError = (res, error) => {
  console.error("Error:", error);
  res.status(500).json({
    success: false,
    message: "Error en el servidor",
    error: error.message,
  });
};

const handleValidationError = (res, error) => {
  console.error("Validation Error:", error);
  res.status(400).json({
    success: false,
    message: "Error de validación",
    error: error.message,
  });
};

module.exports = {
  handleServerError,
  handleValidationError,
};
