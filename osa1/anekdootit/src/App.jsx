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
const Anecdotes = (props) => {
  return (
    <div>
      <Header title={props.title}/>
      {props.anecdotes[props.selected]}
      <br/>
      has {props.votes[props.selected]} votes
      <br/>
      <Button handleClick={props.handleVote} text="vote"/>
      <Button handleClick={props.handleNext} text="next anecdote"/>
    </div>
  )
}

const MostVotedIndex = (voteSet) => voteSet.reduce((maxIndex, currentValue, currentIndex,array) =>{
  return currentValue > array[maxIndex] ? currentIndex : maxIndex
},0)

const MostVoted = (props) => {  
  return (
    <div>
      <Header title={props.title}/>
      {props.anecdotes[MostVotedIndex(props.votes)]}
      <br/>
      has {props.votes[MostVotedIndex(props.votes)]} votes
    </div>
  )
}
const App = () => {
  const points = Array(8).fill(0)
  const [votes, setVotes] = useState(points)
  const mainTitle= "Anecdote of the day"
  const mostVoted= "Anecdote with most votes"
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)  
  const min = 0
  const max = 7
  const handleNext = () =>{
    setSelected(Math.floor(Math.random()*(max-min+1))+min)
  }
  const handleVote = () =>{    
    const updatedPoints = [...votes]
    updatedPoints[selected] +=1
    setVotes(updatedPoints)    
  }
  return (
    <div>
      <Anecdotes 
        title={mainTitle}
        handleVote={handleVote}
        handleNext={handleNext}
        anecdotes={anecdotes}
        selected={selected}
        votes={votes}
      />
      <MostVoted
        title={mostVoted}
        anecdotes={anecdotes}
        votes={votes}
      />      
    </div>
  )
}

export default App