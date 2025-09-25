import { useState } from 'react'
const Header = () => {
  return (
    <>
      <h1>
        give feedback
      </h1>
    </>
  )
}


const Statistics = (props) => {
  if (props.good == 0 && props.bad == 0 && props.neutral == 0){
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  return ( 
    <>
      <h1>statistics</h1>
      <table>
          <tr>Good {props.good}</tr>
          <tr>Neutral {props.neutral}</tr>
          <tr>Bad {props.bad}</tr>
          <tr>All {props.good + props.neutral + props.bad}</tr>
          <tr>Average {(props.good - props.bad) / (props.good + props.bad + props.neutral)}</tr>
          <tr>Positive {(props.good)/(props.good+props.neutral+props.bad)}</tr>

      </table>
    </>
  )
}


const Button = (props) => {
  return(
  <div>
    <button onClick={props.function}>{props.text}</button>
  </div>)
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <Header/>
      <Button function = {()=> setGood(good+1)} text="Good"/>
      <Button function = {()=>setNeutral(neutral+1)} text="Neutral"/>
      <Button function = {()=>setBad(bad+1)} text="Bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App