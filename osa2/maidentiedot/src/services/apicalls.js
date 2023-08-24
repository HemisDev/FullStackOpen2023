import axios from 'axios'

const getCountryList = () => {
    const request = axios.get(` https://studies.cs.helsinki.fi/restcountries/api/all`)
    return request.then(response=> {
        return response.data
    })
}
const getWeatherOfLocation = ({weatherapi, weatherCountry}) => {
    const request = axios.get(`http://api.weatherapi.com/v1/current.json?key=${weatherapi}&q=${weatherCountry}&aqi=no`)
    return request.then(response=> {
        return response.data
    })
}
export default {getCountryList, getWeatherOfLocation}