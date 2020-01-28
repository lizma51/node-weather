const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./geocode')
const forecast = require('./forecast')

const app = express()
const port = process.env.port || 3000

//Define Express paths
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static dir
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Liz'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Liz'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Liz',
        helpText: 'Texto de ayuda'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Falta el lugar a buscar'
        })
    }

    geocode(req.query.search, (error, {latitud, altitud, lugar} = {}) => {
        if(error) {
            return res.send({ error })
        }
        else {
            forecast(latitud, altitud, (error, forecastInf) => {
                if(error) {
                    return res.send({ error })        
                }
                else {
                    res.send({
                        forecast: forecastInf,
                        lugar: lugar
                    })
                }
            });
        }
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Liz',
        errorMsg: 'Error con la página de ayuda'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Liz',
        errorMsg: 'Error con la página'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})