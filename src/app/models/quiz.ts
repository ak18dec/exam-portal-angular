export interface Quiz {
    id: number;
    title: string;
    description: string;
    questionIds: number[];
    published: boolean;
    maxMarks: number;
    maxTime: number;
}