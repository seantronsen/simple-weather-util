const request = require('request')
const forecast = ( longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/f74a9e09554aaf201c775805238a8c46/' + latitude + ',' + longitude + '?'
    request({url, json: true}, (err, {body}) => {
        if (err) {
            callback('Unable to connect to the weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + (body.currently.precipProbability*100) + '% chance of rain. \nThe high for the day is '  + body.daily.data[0].temperatureMax + ' degrees.')
        }
    })
}
module.exports = forecast