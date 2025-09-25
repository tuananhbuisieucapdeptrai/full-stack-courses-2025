const Header = (input) => {
    return (
      <div>
        <h1>{input.course.name}</h1>
      </div>
    )
  }
  
  const Part = (input) => {
    return (
      <div>
        <p>{input.name} {input.exercises}</p>
      </div>
    )
  }
  const Content = (input)=>{
    return (
      <div>
        
          {input.parts.map(part=>
            <Part key = { part.id} name={part.name} exercises={part.exercises}/>
          )}
        
      </div>
    )
  }
  
  
  const Sum = (input) => {
    var total = 0
    const list = input.parts.map(part => part.exercises)
    total = list.reduce((left,right)=>left+right)
    return (
      <div>
        <h4>total of {total} exercises</h4>
      </div>
    )
  }
  
  
  
  
  
  const Course = (input) => {
    return (
      <div>
        <Header course = {input.course}/>
        <Content parts = {input.course.parts}/>
        <Sum parts = {input.course.parts}/>
      </div>
    )
  }
  
  
  
  const Courses = (input)=>{
    return (
      <div>
        {input.courses.map(course=>
          <Course key = {course.id} course = {course}/>
        )}
      </div>
    )
  }


export default Courses