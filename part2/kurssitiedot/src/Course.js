import React from "react";

const Header = ({ course }) => <h2>{course.name}</h2>;
const Content = (props) => (
  <div>
    {props.course.parts.map((part, index) => (
      <Part part={part} key={index} />
    ))}
  </div>
);
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);
const Total = ({ course }) => {
  const numberOfExercises = course.parts.reduce(
    (total, part) => total + part.exercises,
    0
  );
  return (
    <p>
      <b>total of exercises: {numberOfExercises}</b>
    </p>
  );
};

export const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};
