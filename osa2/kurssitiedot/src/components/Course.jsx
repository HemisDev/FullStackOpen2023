import Header from './Header'

  const Part = ({name, value}) => (
    <p>
      {name}: {value}
    </p>
  );
  
  const Content = ({parts}) => (  
      <div>
        {parts.map((part) => <Part key={part.id} name={part.name} value={part.exercises}/>)}      
      </div>
    );
  
  const Course = ({courses}) => {  
    return (
      <div>      
      {courses.map((course)=>    
        <div key={course.id}>
          <Header title={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />      
        </div>
      )}  
      </div>  
    )
  }
  
  const Total = (props) => (
    <p>
      <b>total of {props.parts.reduce((total, part) => total + part.exercises, 0)} exercises</b>
    </p>
  )

  export default Course