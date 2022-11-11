const request = require('request')

const getGeoLocation = (location, callback) => {
    const URL = "http://api.weatherstack.com/current?access_key=2daad8ac9699f0065fd0a5bcad6ae3af&query="+location
    request({url:URL, json: true}, (err, data) => {
    //console.log(`Status: ${data.body.current.weather_descriptions[0]}. It is currently ${data.body.current.temperature} degree out. It feels like ${data.body.current.feelslike} degree here`)
    if(err){
        callback('Unable to get the '+location+' data. Check out Internet connection', undefined)
    } else if(data.body.error) {
        callback('Give valid location', undefined)
    } else {
        const { current } = data.body
        callback(undefined, current)
    }
})
}

module.exports = getGeoLocation