const weatherForm = document.querySelector('form')
const searchValue = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchData = searchValue.value
    const report = document.getElementsByClassName('report')[0]
    report.innerHTML = 'loading.....'
    fetch('/weather?search='+searchData).then((response)=>{
        response.json().then(({error_response, data})=>{
            // console.log(data, 'original')
            report.innerHTML = ''
            if(error_response) {
                report.innerHTML = error_response
            } else {
                console.log(data, 'output')
                report.innerHTML = `humidity is ${data.humidity} however it feels like  ${data.feelslike}
                . its acyually a ${data.is_day}. cloud cover is ${data.cloudcover}. widndirection is ${data.wind_dir}
                wind speed is ${data.wind_speed}`
                // data.weather_icons
                // data.weather_descriptions
              
            }
        })

    })
})
