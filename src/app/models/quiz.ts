export interface Quiz {
    id: number;
    title: string;
    description: string;
    questionIds: number[];
    proficiencyId: number;
    published: boolean;
    instructionEnabled: boolean;
    instructionIds: number[];
    maxMarks: number;
    maxTime: number;
}