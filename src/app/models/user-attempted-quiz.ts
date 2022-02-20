import { AttemptedQuiz } from "./attempted-quiz";


export interface UserAttemptedQuiz {
    id: number;
    userId: number;
    userFullName: string;
    username: string;
    attemptedOn: Date;
    proficiencyId: number;
    maxMarks: number;
    maxTime: number;
    userTime: number;
    score: number;
    quiz: AttemptedQuiz;
}