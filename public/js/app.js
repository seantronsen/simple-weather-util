const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const first = document.getElementById('first')
const second = document.getElementById('second')

var searchWeather =  (weatherString) => {
    fetch('http://localhost:3000/weather?address=' + encodeURI(weatherString)).then((response) => {
        response.json().then((data)=> {
            if (data.err) {
                first.textContent = data.err
            } else {
                first.textContent = data.location
                second.textContent = data.forecastData
            }
        })
    })
}
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    first.textContent = 'Loading...'
    const location = search.value
    searchWeather(location)
})
