const Header =(props) => (
  <h1>{props.course}</h1>
)
const Part=(props) => <p>{props.name} {props.value}</p>

const Content=(props) => {
 return (
  <div>
    <Part name={props.parts[0].key} value={props.parts[0].value}/>
    <Part name={props.parts[1].key} value={props.parts[1].value}/> 
    <Part name={props.parts[2].key} value={props.parts[2].value}/>  
  </div>
 )
}

const Total= (props) => 
<p>
  Number of exercises {
    props.parts.reduce(
      (total,part) => 
        total + part.value,0
    )
  } 
</p>
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {key:'Fundamentals of React', value:10},
    {key:'Using props to pass data',value:7},
    {key:'State of a component',value:14}
  ]
  return (
    <div>
      <Header course = {course}/>
      <Content parts = {parts}/>            
      <Total parts = {parts}/>
    </div>
  )
}

export default App