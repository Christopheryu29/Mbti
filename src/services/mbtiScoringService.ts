// MBTI Scoring Service for the 20 follow-up questions
// Based on the scoring sheet provided

export interface MBTIScore {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

export interface MBTIResult {
  type: string;
  scores: MBTIScore;
}

// Question mapping for the 20 follow-up questions
// Questions 1, 5, 9, 13, 17 -> E/I
// Questions 2, 6, 10, 14, 18 -> S/N
// Questions 3, 7, 11, 15, 19 -> T/F
// Questions 4, 8, 12, 16, 20 -> J/P

const QUESTION_MAPPING = {
  // E/I questions (1, 5, 9, 13, 17)
  1: { dimension: "E/I", optionA: "E", optionB: "I" },
  5: { dimension: "E/I", optionA: "E", optionB: "I" },
  9: { dimension: "E/I", optionA: "E", optionB: "I" },
  13: { dimension: "E/I", optionA: "E", optionB: "I" },
  17: { dimension: "E/I", optionA: "E", optionB: "I" },

  // S/N questions (2, 6, 10, 14, 18)
  2: { dimension: "S/N", optionA: "S", optionB: "N" },
  6: { dimension: "S/N", optionA: "S", optionB: "N" },
  10: { dimension: "S/N", optionA: "S", optionB: "N" },
  14: { dimension: "S/N", optionA: "S", optionB: "N" },
  18: { dimension: "S/N", optionA: "S", optionB: "N" },

  // T/F questions (3, 7, 11, 15, 19)
  3: { dimension: "T/F", optionA: "T", optionB: "F" },
  7: { dimension: "T/F", optionA: "T", optionB: "F" },
  11: { dimension: "T/F", optionA: "T", optionB: "F" },
  15: { dimension: "T/F", optionA: "T", optionB: "F" },
  19: { dimension: "T/F", optionA: "T", optionB: "F" },

  // J/P questions (4, 8, 12, 16, 20)
  4: { dimension: "J/P", optionA: "J", optionB: "P" },
  8: { dimension: "J/P", optionA: "J", optionB: "P" },
  12: { dimension: "J/P", optionA: "J", optionB: "P" },
  16: { dimension: "J/P", optionA: "J", optionB: "P" },
  20: { dimension: "J/P", optionA: "J", optionB: "P" },
};

export interface QuestionAnswer {
  questionNumber: number;
  selectedOption: "A" | "B";
}

export function calculateMBTIScore(answers: QuestionAnswer[]): MBTIResult {
  const scores: MBTIScore = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  // Process each answer
  answers.forEach((answer) => {
    const mapping =
      QUESTION_MAPPING[answer.questionNumber as keyof typeof QUESTION_MAPPING];
    if (mapping) {
      const letter =
        answer.selectedOption === "A" ? mapping.optionA : mapping.optionB;
      scores[letter as keyof MBTIScore]++;
    }
  });

  // Determine the final MBTI type
  const type =
    (scores.E >= scores.I ? "E" : "I") +
    (scores.S >= scores.N ? "S" : "N") +
    (scores.T >= scores.F ? "T" : "F") +
    (scores.J >= scores.P ? "J" : "P");

  return {
    type,
    scores,
  };
}

// Helper function to get question mapping for a specific question
export function getQuestionMapping(questionNumber: number) {
  return QUESTION_MAPPING[questionNumber as keyof typeof QUESTION_MAPPING];
}

// Helper function to get all questions for a specific dimension
export function getQuestionsForDimension(dimension: string): number[] {
  return Object.entries(QUESTION_MAPPING)
    .filter(([_, mapping]) => mapping.dimension === dimension)
    .map(([questionNumber, _]) => parseInt(questionNumber));
}
