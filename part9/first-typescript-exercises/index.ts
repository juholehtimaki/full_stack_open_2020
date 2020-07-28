import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

interface bmiObject {
  weight: number;
  height: number;
  bmi: string;
}

interface errorMessage {
  error: string;
}

interface calcReqBody {
  daily_exercises: number[];
  target: number;
}

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);
  if (!weight || !height) {
    res.json(errorResponse("malformatted parameters"));
    return;
  }
  const response: bmiObject = {
    weight: weight,
    height: height,
    bmi: calculateBmi(height, weight),
  };
  res.json(response);
});

app.post("/exercises", (req, res) => {
  const request: calcReqBody = req.body;
  if (!request.daily_exercises || !request.target) {
    res.json(errorResponse("parameters missing"));
    return;
  }
  const target = Number(request.target);
  const daily_exercises: number[] = request.daily_exercises;
  if (!target || !daily_exercises) {
    res.json(errorResponse("malformatted parameters"));
    return;
  }
  const response = calculateExercises(daily_exercises, target);
  res.json(response);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const errorResponse = (message: string): errorMessage => {
  const response: errorMessage = {
    error: message,
  };
  return response;
};
