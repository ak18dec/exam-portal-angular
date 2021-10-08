export interface Quiz {
    id: number;
    title: string;
    description: string;
    questionIds: number[];
    enabled: boolean;
    instructionEnabled: boolean;
    instructionIds: number[];
}