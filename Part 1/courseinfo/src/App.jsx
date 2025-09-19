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
      <Part part = {input.part1} exercises = {input.exercises1}/>
      <Part part = {input.part2} exercises = {input.exercises2}/>
      <Part part = {input.part3} exercises = {input.exercises3}/>
    </div>
  )
}


const Total = (input) => {
  return (
    <div>
      <p>Number of exercises {input.exercises1 + input.exercises2 + input.exercises3}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course = {course}/>
      <Content part1= {part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
      <Total exercises1 = {exercises1} exercises2={exercises2} exercises3={exercises3}/>
    </div>
  )
}

export default App