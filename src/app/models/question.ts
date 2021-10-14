import { QuestionChoice } from "./questionchoice";

export interface Question {
    id: number;
    title: string;
    description: string;
    proficiencyId: number;
    enabled: boolean;
    topicId: number;
    questionChoices: QuestionChoice[];
}