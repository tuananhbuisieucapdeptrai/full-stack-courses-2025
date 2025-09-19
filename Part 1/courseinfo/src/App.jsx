const Header = (input) => {
  return (
    <div>
      <h1>{input.course}</h1>
    </div>
  )
}

const Part = (input) =>{
  return (
    <>
      <p>
        {input.part} {input.exercises}
      </p>
    </>
  )
}

const Content = (input) => {
  return (
    <div>
      <Part part = {input.parts[0].name} exercises = {input.parts[0].exercises}/>
      <Part part = {input.parts[1].name} exercises = {input.parts[1].exercises}/>
      <Part part = {input.parts[2].name} exercises = {input.parts[2].exercises}/>
    </div>
  )
}


const Total = (input) => {
  return (
    <div>
      <p>Number of exercises {input.parts[0].exercises + input.parts[1].exercises + input.parts[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course = {course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App