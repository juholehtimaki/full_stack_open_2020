import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    },
    {
      name: "Super cool course",
      exerciseCount: 1,
      description: "Deep dive into super cool course",
    },
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header: React.FC<HeaderProps> = ({ courseName }) => {
  return <h1>{courseName}</h1>;
};

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map((part, index) => (
        <div key={index}>
          <Part part={part} />
        </div>
      ))}
    </>
  );
};

const Total: React.FC<TotalProps> = ({ courseParts }) => (
  <h2>
    Total number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </h2>
);

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>Exercises:{part.exerciseCount}</p>
        </div>
      );
    case "Using props to pass data":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercises:{part.exerciseCount}</p>
          <p>Project group count:{part.groupProjectCount}</p>
        </div>
      );
    case "Deeper type usage":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>Exercises:{part.exerciseCount}</p>
          <a href="https://fake-exercise-submit.made-up-url.dev">
            https://fake-exercise-submit.made-up-url.dev
          </a>
        </div>
      );
    case "Super cool course":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>Exercises:{part.exerciseCount}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

ReactDOM.render(<App />, document.getElementById("root"));

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description?: string;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBase {
  name: "Super cool course";
  description: string;
}

type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

interface HeaderProps {
  courseName: string;
}

interface ContentProps {
  courseParts: CoursePart[];
}

interface TotalProps {
  courseParts: CoursePart[];
}
