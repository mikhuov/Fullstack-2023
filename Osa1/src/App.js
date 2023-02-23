import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick = { handleClick }>{ text }</button>
);

const Statistics = ({good, neutral, bad}) => {
  return <div>
    <Value text="good" value={ good }/>
    <Value text="neutral" value={ neutral }/>
    <Value text="bad" value={ bad }/>
  </div>
};

const Value = ({ text, value }) => (
  <div>
    { text }
    { value }
  </div>
);

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick = {() => setGood(good + 1)} text="good" />
      <Button handleClick = {() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick = {() => setBad(bad + 1)} text="bad" />
      <h1>Statistics</h1>
      <Statistics good = { good } neutral = { neutral } bad = { bad } />
    </div>
  )
};

export default App;