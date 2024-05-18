export interface Submission {
    id: string;
    questionId: string;
    userId: string;
    submissionTime: string;
    code: string;
    successRate: number;
    compileTime: number;
    memoryUsage: number;
}

