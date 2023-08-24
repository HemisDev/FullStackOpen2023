import { useState,useEffect } from 'react'
import apiService from './services/apicalls'
import MultipleList from './components/MultipleList'
import FilteredList from './components/FilteredList'
import CountryFinder from './components/CountryFinder'

function App() {
  const [country, setCountry] = useState('')  
  const [list, setCountryList] = useState([])
  const [filterlist, setFilterlist] = useState([])
  const [weatherCountry, setWeatherCountry] = useState('')
  const [currentWeather, setCurrentWeather] = useState([])
  
  const weatherapi = import.meta.env.VITE_WEATHERAPI_KEY

  useEffect(() => {
    apiService.getCountryList()
    .then(response =>{      
      setCountryList(response)
    })    
  }, [])

  useEffect(()=>{    
    if(weatherCountry)
    {
      apiService.getWeatherOfLocation({weatherapi,weatherCountry})      
      .then(response =>{        
        setCurrentWeather(response)
      })
    }
  },[weatherCountry,setCurrentWeather,weatherapi])

  useEffect(() => {
    if(country)
    {            
      const searchCountry = country.toLowerCase();
      const currentList = list.filter(item=>item.name.common.toLowerCase().includes(searchCountry) || item.name.official.toLowerCase().includes(searchCountry))
      if(currentList.length !== 0 && currentList.length <11)
      {
        setFilterlist(currentList);
      }
      else      
      {
        setFilterlist([]);
      }      
    }
    else
    {
      setFilterlist([])
    }
  },[country,list])

  useEffect(() => {
    if(filterlist && filterlist.length ===1)
    {
      setWeatherCountry(country)
    }
  },[filterlist,setWeatherCountry,country])

  const handleChange =(event) => {
    setCountry(event.target.value)
  }
  const handleQuickChange = (countryName) =>{
    setCountry(countryName)
  }
  return (
    
    <div>        
      <CountryFinder country={country} handleChange={handleChange}/>      
      <div>
        {filterlist.length>1 && (
          <MultipleList filterlist={filterlist} handleQuickChange={handleQuickChange} />
        )}
        {filterlist.length==1 && (
          <FilteredList filterlist={filterlist} currentWeather={currentWeather}/>
        )}        
      </div>
    </div>
  )
}

export default App
