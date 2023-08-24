const FilteredList =({filterlist,currentWeather}) => {
    return(
        filterlist.map(item=>
            <div key={item.name.common}>
                <h1>{item.name.common}</h1>
                <p>capital {item.capital}</p>
                <p>area {item.area}</p>
                <h3>languages:</h3>
                <ul>
                    {Object.keys(item.languages)
                        .map((langKey, index)=> (
                            <li key={index}>
                                {item.languages[langKey]}
                            </li>
                        ))
                    }  
                </ul>          
                <img className="flag" src={item.flags.png}/>
                <h2>Weather in {item.capital}</h2>
                {currentWeather.length !==0 && (
                    <div>
                        <p>temperature {currentWeather.current.temp_c} Celcius</p>
                        <img src={currentWeather.current.condition.icon}/>
                        <p>wind {currentWeather.current.wind_kph} km/h</p>
                    </div>
                )}                
            </div>
        )
    )
}
export default FilteredList