const request = require('request')

const geocode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmFzaWx1Y2EiLCJhIjoiY2p3d3A3YmJ3MDc0NzQ0bnUyeTB2YXIydSJ9.GjJWcsLlT5e7ZBHyFpXlOQ'

	request({ url: url, json: true }, (error, {body}) => {
		if (error) {
			callback('Unabble to conncet to location services!', undefined)
		} else if (body.features.length == 0) {
			callback('Unable to find location. Try another search', undefined)
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longtitude: body.features[0].center[0],
				location: body.features[0].place_name
			})
		}
	})
}

module.exports = geocode