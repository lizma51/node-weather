const request = require('request')

const geocode = (busqueda, callback) => {
    const urlMapBox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(busqueda) + '.json?access_token=pk.eyJ1IjoibGl6bWEiLCJhIjoiY2syZjNmMTM1MDV0eDNobzFicGF0ZGg3ZCJ9.muvkLu8YtEXY-HZSO_GfiQ&limit=1&language=es';
    request({ url: urlMapBox, json: true}, (error, response, body) => {
        if(error) {
            callback('Error al conectarse al servicio', undefined);
        }
        else if(body.features.length === 0) {
            callback('Error con la ubicación', undefined);
        }
        else {
            callback(undefined, {
                latitud: body.features[0].center[0],
                altitud: body.features[0].center[1],
                lugar: body.features[0].place_name_es
            });
        }
    });
}

module.exports = geocode