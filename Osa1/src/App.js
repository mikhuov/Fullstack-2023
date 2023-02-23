import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick = { handleClick }>{ text }</button>
);

const Statistics = ({ good, neutral, bad }) => {
  if(good === 0  && neutral === 0  && bad === 0) {
    return <div>No feedback given</div>
  }

  return <table>
    <tbody>
      <StatisticLine  text="Good" value = { good }/>
      <StatisticLine  text="Neutral" value = { neutral }/>
      <StatisticLine  text="Bad" value = { bad }/>
      <StatisticLine  text="All" value = { good + neutral + bad }/>
      <StatisticLine  text="Average" value = { (good - bad) / (good + neutral + bad) }/>
      <StatisticLine  text="Positive" value = { (good / (good + neutral + bad)) * 100 + '%' }/>
    </tbody>
  </table>
};

const StatisticLine  = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
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