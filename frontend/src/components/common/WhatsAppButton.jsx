const WhatsAppButton = ({ phoneNumber, message }) => {
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    if (!phoneNumber) {
      alert("Número de teléfono no válido");
      return;
    }
    try {
      window.open(url, "_blank");
      alert("Mensaje enviado correctamente a través de WhatsApp");
    } catch (error) {
      alert(
        "Hubo un error al intentar enviar el mensaje. Por favor, inténtelo de nuevo."
      );
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
