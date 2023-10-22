import { QuestionChoice } from "./questionchoice";

export interface Question {
    id: number;
    description: string;
    proficiency: string;
    enabled: boolean;
    topicId: number;
    questionChoices: QuestionChoice[];
}