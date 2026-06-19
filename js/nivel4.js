(function () {

    let nivel4Completado = false;

    const btnProcesar = document.getElementById("btnProcesarNivel4");
    const progressBar = document.getElementById("progressNivel4");
    const resultadoDiv = document.getElementById("resultadoNivel4");
    const btnSiguiente = document.getElementById("btnSiguienteNivel4");

    function mostrarMensaje(texto, tipo = "info") {
        resultadoDiv.innerHTML =
            `<div class="alert alert-${tipo}" role="alert">${texto}</div>`;
    }

    function generarDatos() {
        const datos = [];

        for (let i = 0; i < 20000; i++) {
            datos.push({
                temperatura: Math.random() * 45,
                humedad: Math.random() * 100
            });
        }

        return datos;
    }

    function procesarDatos() {

        mostrarMensaje("Generando y procesando datos...", "info");

        progressBar.style.width = "10%";
        progressBar.textContent = "10%";

        const datos = generarDatos();

        const worker = new Worker("js/workerNivel4.js");

        worker.postMessage(datos);

        let progreso = 10;

        const intervalo = setInterval(() => {

            if (progreso < 90) {

                progreso += 10;

                progressBar.style.width = progreso + "%";
                progressBar.textContent = progreso + "%";
            }

        }, 200);

        worker.onmessage = function (e) {

            clearInterval(intervalo);

            progressBar.style.width = "100%";
            progressBar.textContent = "100%";

            const r = e.data;

            resultadoDiv.innerHTML = `
                <div class="card mt-3">
                    <div class="card-body">
                        <h4>Estadísticas completas</h4>

                           <p><strong>Datos procesados:</strong> ${r.cantidadRegistros}</p>
                           <div class="alert alert-success" role="alert">
                             Procesamiento completado correctamente. Puedes continuar al siguiente nivel.
                           </div>
                          <hr>

                        <h5>Temperatura</h5>
                        <p><strong>Promedio:</strong> ${r.promedioTemp.toFixed(2)} °C</p>
                        <p><strong>Máximo:</strong> ${r.maxTemp.toFixed(2)} °C</p>
                        <p><strong>Mínimo:</strong> ${r.minTemp.toFixed(2)} °C</p>

                        <hr>

                        <h5>Humedad</h5>
                        <p><strong>Promedio:</strong> ${r.promedioHum.toFixed(2)} %</p>
                        <p><strong>Máximo:</strong> ${r.maxHum.toFixed(2)} %</p>
                        <p><strong>Mínimo:</strong> ${r.minHum.toFixed(2)} %</p>
                    </div>
                </div>
            `;

            nivel4Completado = true;
            btnSiguiente.disabled = false;

            worker.terminate();
        };

        worker.onerror = function () {

            clearInterval(intervalo);

            mostrarMensaje(
                "Ha ocurrido un error al procesar los datos.",
                "danger"
            );
        };
    }

    function inicializar() {

        if (btnProcesar) {
            btnProcesar.addEventListener("click", procesarDatos);
        }
    }

    window.Nivel4 = {
        inicializar: inicializar,
        isCompletado: function () {
            return nivel4Completado;
        }
    };

})();