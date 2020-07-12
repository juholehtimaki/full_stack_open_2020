import React, { useState } from "react";
import ReactDOM from "react-dom";

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>
      <p>{text}</p>
    </td>
    <td>
      <p>{value}</p>
    </td>
  </tr>
);

const Statistics = ({ goodFeedback, neutralFeedback, badFeedback }) => {
  const totalReceivedFeedback = goodFeedback + neutralFeedback + badFeedback;
  const average =
    (goodFeedback * 1 + neutralFeedback * 0 + badFeedback * -1) /
    totalReceivedFeedback;
  const positiveFeedback = (goodFeedback / totalReceivedFeedback) * 100 + "%";
  return (
    <>
      <h1>statistics</h1>
      {totalReceivedFeedback > 0 ? (
        <table>
          <tbody>
            <StatisticLine text="good" value={goodFeedback} />
            <StatisticLine text="neutral" value={neutralFeedback} />
            <StatisticLine text="bad" value={badFeedback} />
            <StatisticLine text="all" value={totalReceivedFeedback} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positiveFeedback} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodFeedback = () => setGood(good + 1);
  const handleNeutralFeedback = () => setNeutral(neutral + 1);
  const handleBadFeedback = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={handleGoodFeedback}>good</button>
        <button onClick={handleNeutralFeedback}>neutral</button>
        <button onClick={handleBadFeedback}>bad</button>
      </div>
      <Statistics
        goodFeedback={good}
        neutralFeedback={neutral}
        badFeedback={bad}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
