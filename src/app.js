const path = require('path')
const express = require('express')
const hbs = require('hbs')
const chalk = require('chalk')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const errMessage = (message) => {
    console.log(chalk.red(message))
}

const regMessage = (message) => {
    console.log(chalk.green(message))
}

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup of handlebars and the views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup the serving directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sean Tronsen'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sean Tronsen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Sean Tronsen'
    })
})

app.get('/weather', (req, res) => {
   
   
   if (!req.query.address) {
        return res.send({
            error: 'Address was not entered'
        })
   }

   geocode(req.query.address, (err, {latitude, longitude, location} ={}) => {
        if (err) {
          
            return res.send({
                err: 'Geocde Error: ' + err
            })
        }
        forecast (longitude, latitude, (err, forecastData)=> {
            if (err) {
                return res.send({
                    err: 'Forecast Error: ' + err
                })
            }
            res.send({
                location: location,
                address: req.query.address,
                forecastData: forecastData
            })
        })
   })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help Article Not Found.'
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        error: 'About Article Not Found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page Not Found.',
        title: 'Weather App',
        name: 'Sean Tronsen'
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})