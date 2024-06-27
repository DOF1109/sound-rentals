const WhatsAppButton = ({ phoneNumber, message }) => {
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    if (!phoneNumber) {
      alert("Número de teléfono no válido");
      return;
    }
    try {
      window.open(url, "_blank");
      swal("WhatsApp enviado correctamente!", {
        icon: "success",
      });
    } catch (error) {
      swal("Ocurrió un error, vuelva a intentarlo", {
        icon: "error",
      });
    }
  };

  return (
    <button className="whatsapp-button" onClick={handleClick}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        className="whatsapp-icon"
      />
    </button>
  );
};

export default WhatsAppButton;
