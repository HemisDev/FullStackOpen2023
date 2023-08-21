const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
};
const Part = (props) => (
  <p>
    {props.name}: {props.value}
  </p>
);

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} value={props.parts[0].exercises} />
      <Part name={props.parts[1].name} value={props.parts[1].exercises} />
      <Part name={props.parts[2].name} value={props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => (
  <p>
    Number of exercises{" "}
    {props.parts.reduce((total, part) => total + part.exercises, 0)}
  </p>
)
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App;