import { QuestionChoice } from "./questionchoice";

export interface Question {
    id: number;
    title: string;
    content: string;
    proficiencyId: number;
    enabled: boolean;
    topicId: number;
    quesChoices: QuestionChoice[];
}