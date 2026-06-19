self.onmessage = function (e) {

    const datos = e.data;

    let sumaTemp = 0;
    let sumaHum = 0;

    let maxTemp = -Infinity;
    let minTemp = Infinity;

    let maxHum = -Infinity;
    let minHum = Infinity;

    for (let i = 0; i < datos.length; i++) {

        const temperatura = datos[i].temperatura;
        const humedad = datos[i].humedad;

        sumaTemp += temperatura;
        sumaHum += humedad;

        if (temperatura > maxTemp) maxTemp = temperatura;
        if (temperatura < minTemp) minTemp = temperatura;

        if (humedad > maxHum) maxHum = humedad;
        if (humedad < minHum) minHum = humedad;
    }

     self.postMessage({
     promedioTemp: sumaTemp / datos.length,
     promedioHum: sumaHum / datos.length,
     maxTemp,
     minTemp,
     maxHum,
     minHum,
     cantidadRegistros: datos.length
     });
};
