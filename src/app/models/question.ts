import { QuestionChoice } from "./questionchoice";

export interface Question {
    id: number;
    description: string;
    proficiency: string;
    enabled: boolean;
    questionChoices: QuestionChoice[];
}