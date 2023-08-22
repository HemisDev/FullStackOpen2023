import Course from './components/Course'
import Header from './components/Header'

const App = () => {
  const mainTitle = "Web development curriculum"
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1

        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 4
        }
      ]
    },
    {
      name: "Something else development",
      id: 2,
      parts: [
        {
          name: "Fundamentals of life",
          exercises: 42,
          id: 1

        },
        {
          name: "Using props to time",
          exercises: 24,
          id: 2
        },
        {
          name: "State of a state",
          exercises: 52,
          id: 3
        },
        {
          name: "State of a non-state",
          exercises: 1,
          id: 4
        }
      ]
    }
  ]  
  return (
    <div>
      <Header title={mainTitle} size={12} />
      <Course courses={courses}/>
    </div>
  )
}

export default App;