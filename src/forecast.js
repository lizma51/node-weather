const request = require('request')

const forecast = (latitud, altitud, callback) => {
    const urlDarkSky = 'https://api.darksky.net/forecast/5acaaaf249bfdfe83faa423842252534/' + altitud + ',' + latitud + '?units=si&lang=es';
    request({ url: urlDarkSky, json: true }, (error, response, body) => {
        if(error) {
            callback('Error al conectarse al servicio', undefined);
        }
        else if(body.error) {
            callback('Error con la ubicación', undefined);
        }
        else {
            callback(undefined, {
                temperature:  body.currently.temperature,
                precip: body.currently.precipProbability,
                summary: body.daily.data[0].summary
            });
        }
    });
}

module.exports = forecast