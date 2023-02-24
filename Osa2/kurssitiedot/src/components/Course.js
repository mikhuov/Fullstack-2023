const Course = ({ course }) => {
  return (
    <div>
      <Header name = { course.name }/>
      <Content parts = { course.parts }/>
      <Total parts = { course.parts }/>
    </div>
  );
};

const Header = ({ name }) => {
  return <h1>{ name }</h1>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <h4 key = { part.id }>
          { part.name + " " + part.exercises }
        </h4>
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((totalAmount, part) => {
    return totalAmount + part.exercises;
  }, 0);

  return <h4>
    { "Total of " +  total + " exercises" }
  </h4>
};

export default Course;