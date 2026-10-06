
    document.addEventListener('DOMContentLoaded', () => {
    
    const TIEMPO_EXPIRACION_MIN = 10;
    const CLAVE = 'thebeeinc_edadverif';
    
    const modal = document.getElementById('verificacion');
    const btnSi = document.getElementById('boton-si');
    const btnNo = document.getElementById('boton-no');

    if (debeMostrarAgeGate()) {
        mostrarModal();
    }

    if(btnSi) { // Si somos mayores de edad, se guarda la hora y a los 10 minutos puede volver a salir la verificación.
        btnSi.addEventListener('click', () => {
            const hora = new Date().getTime();
            localStorage.setItem(CLAVE, hora.toString());
            
            ocultarModal();
        });
    }

    if(btnNo) { // Si no somos mayores de edad, nos redirige a Google.
        btnNo.addEventListener('click', () => {
            window.location.href = "https://www.google.com";
        });
    }

    function debeMostrarAgeGate() { // Realiza las verificaciones para saber si mostrar la verificacion o no.
        const marcaTiempo = localStorage.getItem(CLAVE);

        if (!marcaTiempo) return true;

        const hora = new Date().getTime();
        const tiempoPasadoMinutos = (hora - parseInt(marcaTiempo)) / 1000 / 60;

        if (tiempoPasadoMinutos > TIEMPO_EXPIRACION_MIN) {
            return true; // Cuando pasan 10 minutos vuelve a saltar la verificacion.
        }

        return false;
    }

    function mostrarModal() { // Muestra el cuadro de verificacion
        if(modal) {
            modal.style.display = 'flex'; 
            document.body.style.overflow = 'hidden'; 
        }
    }

    function ocultarModal() { // Oculta el cuadro de verificacion
        if(modal) {
            modal.style.opacity = '0';
            
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 500);
        }
    }

});