const CountryFinder=({country, handleChange}) =>{
    return(
        <form>
            find countries<input value={country} onChange={handleChange}/>
        </form>
    )
}
export default CountryFinder