export interface Submission {
    id: string;
    questionId: string;
    userId: string;
    submissionTime: string;
    code: string;
    successCount: string;
    compileTime: number;
    memoryUsage: number;
    score: number;
    errorFree: boolean;
    errorMessage?: string;
}

