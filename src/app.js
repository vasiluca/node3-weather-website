const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// const fs = require('fs')

const app = express()
const port = process.env.PORT || 3000

// Define paths 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', {
		'title': 'Weather App',
		'name': 'Andrew Mead'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		'title': 'This is some helpful text.'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		'title': 'About me.'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address!'
		})
	}

	geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
		if (error) {
			return res.send({error})
		}

		forecast(latitude,longtitude, (error, forecastData) => {
			if (error) {
				return res.send({error})
			}
			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			})
		})
		
	})

	// res.send({
	// 	'forecast': 'It is snowing',
	// 	'location': 'Pennyslvania',
	// 	'address': req.query.address
	// })
})

app.get('/products', (req, res) => {
	if (!req.query.search) {
		res.send({
			error: 'You must provide a search term'
		})
	}

	console.log(req.query.search)
	res.send({
		products: []
	})
})

app.get('/help/*', (req, res) => {
	res.send('Article not found ')
})

app.get('*', (req, res) => {
	res.render('404', {
		'title': '404',
		'name': 'Luca Vasilache',
		'errorMessage': 'Help article not found'
	})
})

app.listen(port, () => {
	console.log('Server is up on port ' + port)
})