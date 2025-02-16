const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / ((height / 100) * (height / 100));
  if (bmi < 15) return "Very severely underweight";
  if (bmi >= 15 && bmi < 16) return "Severely underweight";
  if (bmi >= 16 && bmi < 18.5) return "Underweight";
  if (bmi >= 18.5 && bmi < 25) return "Normal (healthy weight)";
  if (bmi >= 25 && bmi < 30) return "Overweight";
  if (bmi >= 30 && bmi < 35) return "Obese Class I (Moderately obese)";
  if (bmi >= 35 && bmi < 40) return "Obese Class II (Severely obese)";
  return "Obese Class III (Very severely obese)";
};

if (process.argv.length === 4) {
  const receivedHeight = Number(process.argv[2]);
  const receivedWeight = Number(process.argv[3]);
  console.log(calculateBmi(receivedHeight, receivedWeight));
}

export { calculateBmi };
