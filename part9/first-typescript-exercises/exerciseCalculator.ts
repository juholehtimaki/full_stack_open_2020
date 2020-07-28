interface resultObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exercises: number[],
  goal: number
): resultObject => {
  return {
    periodLength: exercises.length,
    trainingDays: exercises.filter((x) => x > 0).length,
    success: exercises.reduce((total, hours) => total + hours, 0) > goal,
    rating:
      exercises.reduce((total, hours) => total + hours, 0) /
        exercises.length ===
      goal
        ? 2
        : exercises.reduce((total, hours) => total + hours, 0) /
            exercises.length <
          goal
        ? 1
        : 3,
    ratingDescription:
      exercises.reduce((total, hours) => total + hours, 0) > goal * 7
        ? "awesome"
        : "could be better",
    target: goal,
    average:
      exercises.reduce((total, hours) => total + hours, 0) / exercises.length,
  };
};

if (process.argv.length === 4) {
  const receivedTrainingDays: string = process.argv[2];
  const receivedGoal = Number(process.argv[3]);

  const stringArray: string[] = receivedTrainingDays.split(",");
  let numberArray: number[] = [];

  for (const string of stringArray)
    numberArray = numberArray.concat(parseInt(string));

  console.log(calculateExercises(numberArray, receivedGoal));
}

export { calculateExercises };
