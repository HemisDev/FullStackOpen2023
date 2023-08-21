import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
const Header = ({title}) => {  
  return <h1>{title}</h1>
};
const StatisticsLine = ({title, amount, suffix}) => {
  return (
    <>
      <td>{title}</td>
      <td> {amount} {suffix}</td>
    </>
  )
}

const CountTotal = (props) => props.good+props.bad+props.neutral  

const Average = (props) => {
  const value = (props.good*1+props.neutral*0+props.bad*-1)/CountTotal(props)
  return Number.isNaN(value) ? 0: value
}
const PositivePercent = (props) => {
  const value = (props.good/CountTotal(props))*100
  return Number.isNaN(value) ? 0:value
}

const Statistics = (props) =>{  
  return (    
    <div>
      <Header title={props.title}/>      
      {CountTotal(props)!==0 &&(
        <table>
          <tbody>
            <tr><StatisticsLine title="good" amount={props.good}/></tr>
            <tr><StatisticsLine title="neutral" amount={props.neutral}/></tr>
            <tr><StatisticsLine title="bad" amount={props.bad}/></tr>
            <tr><StatisticsLine title="total" amount={CountTotal(props) ?? 0}/></tr>
            <tr><StatisticsLine title="average" amount={Average(props)}/></tr>
            <tr><StatisticsLine title="positive" amount={PositivePercent(props)} suffix="%"/></tr>
          </tbody>
        </table>
      )}

      {CountTotal(props) === 0 && (        
        <p>{props.noFeedBack}</p>        
      )} 
    </div>
  )
}
const FeedBack = (props) =>{
  return (
    <div>
      <Header title={props.title}/>
      <Button handleClick={props.good} text="good"/>
      <Button handleClick={props.neutral} text="neutral"/>
      <Button handleClick={props.bad} text="bad"/>      
      <Button handleClick={props.reset} text="reset"/>      
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)    
  const feedback_title = "give feedback"
  const statistics_title = "statistics"
  const noFeedBack ="No feedback given"

  const handleGood = () => {    
    const updatedValue = good + 1
    setGood(updatedValue)
  }
  const handleNeutral = () => {    
    const updatedValue = neutral + 1
    setNeutral(updatedValue)        
  }
  const handleBad = () => {    
    const updatedValue = bad + 1
    setBad(updatedValue)    
  }
  const handleReset = () => {
    setGood(0)
    setNeutral(0)
    setBad(0)
  }
      
  return (
    <div>
      <FeedBack 
        title={feedback_title}
        good={handleGood}
        bad={handleBad}
        neutral={handleNeutral}
        reset={handleReset}
      />   
      <Statistics 
        title={statistics_title}
        noFeedBack={noFeedBack}
        good={good}
        bad={bad}
        neutral={neutral}
      />
    </div>
  )
}

export default App