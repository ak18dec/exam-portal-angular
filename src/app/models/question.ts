import { QuestionChoice } from "./questionchoice";

export interface Question {
    id: number;
    content: string;
    proficiencyId: number;
    enabled: boolean;
    topicId: number;
    questionChoices: QuestionChoice[];
}