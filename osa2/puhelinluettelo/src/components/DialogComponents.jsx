export const PhoneFilter = (props) => {
    return(
      <div>
        <h2>{props.title}</h2>
        <form>
          filter shown with<input value={props.filter} onChange={props.filterHandler}/>
        </form>
      </div>
    )
}

export const NewPhoneItemDialog = (props) => {
  return(
    <div>
    <h2>{props.title}</h2>
      <form onSubmit={props.onSubmit}>
        <div>
          name: <input value={props.namebox} onChange={props.nameHandler}/>
        </div>
        <div>
          phone: <input value={props.phonebox} onChange={props.phoneHandler}/>
        </div>
        <div>        
          <button type="submit">add</button>        
        </div>
      </form>
    </div>
  )
} 

export default PhoneFilter