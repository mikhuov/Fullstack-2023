const Part = props => {
  return (
    <h4>{ props.part } { props.exercise }</h4>
  );
}

const Header = props => {
  return (
    <h1>{ props.course }</h1>
  );
};

const Content = content => {
  return (
    <div>
      <Part part = { content.parts[0].name + ','} exercise = {'Exercices: ' + content.parts[0].exercises } />
      <Part part = { content.parts[1].name + ','} exercise = {'Exercices: ' + content.parts[1].exercises } />
      <Part part = { content.parts[2].name + ','} exercise = {'Exercices: ' + content.parts[2].exercises } />
    </div>
  );
};

const Total = total => {
  return (
    <p>Number of total exercises: { total.parts[0].exercises + total.parts[1].exercises + total.parts[2].exercises }</p>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts : [
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
  };

  return (
    <div>
      <Header course = { course.name }/>
      <Content parts = { course.parts }/>
      <Total parts = { course.parts}/>
    </div>
  );
}

export default App;