const request = require('request')

const forecast = (lat,long,callback) => {
	const url = 'https://api.darksky.net/forecast/33cffb33dadc74c1163d01f63d55440c/'+lat+','+long
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service.',undefined)
		} else if (body.error) {
			callback('Unable to find location.',undefined)
		} else {
			callback(undefined,body.daily.data[0].summary + ' It is currently '+ body.currently.temperature + ' degrees outside. There is a '+ body.currently.precipProbability+ ' percent chance of rain')
		}
	})
}

module.exports = forecast