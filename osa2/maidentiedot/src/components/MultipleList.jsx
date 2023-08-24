const MultipleList=({filterlist,handleQuickChange})=>{
    return(
        filterlist.map(item=>
            <li key={item.name.common}>
                {item.name.common} 
                <button onClick={()=>handleQuickChange(item.name.common)}>
                    show
                </button>
            </li>
        )
)}
export default MultipleList