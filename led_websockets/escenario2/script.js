document.addEventListener("DOMContentLoaded", () => {
  const websocket = new WebSocket("ws://localhost:8765");
  
  websocket.onopen = () => console.log("Conectado al servidor WebSocket");
  
  // Manejar mensajes recibidos del servidor
  websocket.onmessage = (event) => {
    
    const message = event.data;
    var datos = JSON.parse(message);
    console.log("Status: "+datos.Status)

    
    // Actualiza la interfaz de usuario según el estado del LED
    const toggleBtn = document.getElementById("toggleBtn");

    if(datos.Status === "1") {
      toggleBtn.checked = true;
    } else if(datos.Status === "0") {
      toggleBtn.checked = false;
    }
  };

  document.getElementById("toggleBtn").addEventListener("change", function () {
    const command = this.checked ? "1" : "0";
    websocket.send(command);
    console.log("Enviado:", command);
  });
});
