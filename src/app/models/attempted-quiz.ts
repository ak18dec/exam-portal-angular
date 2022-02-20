import { AttemptedQuizQuestion } from "./attempted-quiz-question";

export interface AttemptedQuiz {
    id: number;
    title: string;
    description: string;
    questions: AttemptedQuizQuestion[];
}
