export interface QuestionChoice {
    id: number;
    content: string;
    enabled: boolean;
    correct: boolean;
    questionId: number;
}