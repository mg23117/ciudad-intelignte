(function () {
    const videoCamara = document.getElementById('videoCamara');
    const canvasOculto = document.getElementById('canvasOculto');
    const imgFotoGuardada = document.getElementById('imgFotoGuardada');
    const txtPlaceholder = document.getElementById('txtPlaceholder');
    const errorCamara = document.getElementById('errorCamara');
    
    const btnIniciarCamara = document.getElementById('btnIniciarCamara');
    const btnCapturarFoto = document.getElementById('btnCapturarFoto');
    const btnBorrarFoto = document.getElementById('btnBorrarFoto');
    const btnSiguienteNivel3 = document.getElementById('btnSiguienteNivel3');

    let flujosVideo = null;

    async function encenderCamara() {
        errorCamara.classList.add('d-none');
        errorCamara.innerText = '';

        try {
            flujosVideo = await navigator.mediaDevices.getUserMedia({ 
                video: { width: 640, height: 480 } 
            });
            videoCamara.srcObject = flujosVideo;
            
            btnCapturarFoto.disabled = false;
            btnIniciarCamara.classList.replace('btn-secondary', 'btn-outline-secondary');
            btnIniciarCamara.innerText = "Cámara Activa";
            btnIniciarCamara.disabled = true;
            
        } catch (error) {
            errorCamara.classList.remove('d-none');
            if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                errorCamara.innerText = "Error de acceso: El permiso de la cámara ha sido denegado.";
            } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
                errorCamara.innerText = "Error de hardware: no se encontró ninguna cámara.";
            } else {
                errorCamara.innerText = `Error inesperado: ${error.message}`;
            }
        }
    }

    function procesarCaptura() {
        if (!flujosVideo) return;

        const contextoCanvas = canvasOculto.getContext('2d');
        canvasOculto.width = videoCamara.videoWidth;
        canvasOculto.height = videoCamara.videoHeight;
        
        contextoCanvas.drawImage(videoCamara, 0, 0, canvasOculto.width, canvasOculto.height);
        const imagenBase64 = canvasOculto.toDataURL('image/jpeg', 0.85);
        
        localStorage.setItem('evidencia_explorador_smartcity', imagenBase64);
        mostrarImagenGuardada(imagenBase64);
    }

    function mostrarImagenGuardada(datosBase64) {
        if (datosBase64) {
            imgFotoGuardada.src = datosBase64;
            imgFotoGuardada.classList.remove('d-none');
            txtPlaceholder.classList.add('d-none');
            
            btnBorrarFoto.classList.remove('d-none');
            btnSiguienteNivel3.disabled = false;
        }
    }

    function borrarFotografia() {
        localStorage.removeItem('evidencia_explorador_smartcity');
        
        imgFotoGuardada.src = "";
        imgFotoGuardada.classList.add('d-none');
        
        txtPlaceholder.classList.remove('d-none');
        
        btnBorrarFoto.classList.add('d-none');
        btnSiguienteNivel3.disabled = true;
    }

    function validarProgresoExistente() {
        const fotoPrevia = localStorage.getItem('evidencia_explorador_smartcity');
        if (fotoPrevia) {
            mostrarImagenGuardada(fotoPrevia);
        }
    }

    // Event Listeners
    btnIniciarCamara.addEventListener('click', encenderCamara);
    btnCapturarFoto.addEventListener('click', procesarCaptura);
    btnBorrarFoto.addEventListener('click', borrarFotografia);
    
    btnSiguienteNivel3.addEventListener('click', () => {
        if (flujosVideo) {
            flujosVideo.getTracks().forEach(track => track.stop());
        }
        alert("🔒 ¡Evidencia verificada correctamente! Accediendo al Nivel 4...");
        
        // Actualizamos progreso al llegar al Nivel 4
        window.actualizarProgresoJuego(4);

        document.getElementById('nivel3').classList.add('d-none');
        const nivel4 = document.getElementById('nivel4');
        if (nivel4) nivel4.classList.remove('d-none');
    });

    validarProgresoExistente();
})();