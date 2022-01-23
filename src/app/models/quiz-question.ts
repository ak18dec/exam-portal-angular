import { QuizQuestionChoice } from "./quiz-question-choice";

export interface QuizQuestion {
    id: number;
    quesId: number;
    content: string;
    proficiencyId: number;
    choices: QuizQuestionChoice[];
    userChoice: QuizQuestionChoice;
}