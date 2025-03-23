document.addEventListener("DOMContentLoaded", () => {
  const introOverlay = document.getElementById("intro-overlay");
  const introText = document.getElementById("intro-text");

  // Verificar si ya se mostró la animación en esta sesión
  if (sessionStorage.getItem("introShown")) {
    introOverlay.style.display = "none";
  } else {
    // Array de mensajes para la animación de introducción
    const messages = [
      "Juego interactivo de preguntas y respuestas",
      "Desarrollado por:",
      "Sofia Bentos",
      "Manuel Martinez",
      "Lorenzo Tassani"
    ];

    let currentMessageIndex = 0;
    const displayDuration = 2000; // 2 segundos por mensaje

    // Función para mostrar el siguiente mensaje o cerrar la animación
    function showNextMessage() {
      if (currentMessageIndex < messages.length) {
        introText.textContent = messages[currentMessageIndex];
        currentMessageIndex++;
      } else {
        // Ocultar el overlay con una transición suave
        introOverlay.style.opacity = "0";
        setTimeout(() => {
          introOverlay.style.display = "none";
          // Marcar que la animación ya se mostró en esta sesión
          sessionStorage.setItem("introShown", "true");
        }, 600); // Tiempo de transición (debe coincidir con el CSS)
        clearInterval(intervalId);
      }
    }

    // Mostrar el primer mensaje de inmediato y luego cada 2 segundos
    showNextMessage();
    const intervalId = setInterval(showNextMessage, displayDuration);
  }
});

  