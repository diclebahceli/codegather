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


export const DefaultSubmission: Submission = {
    id: "",
    questionId: "",
    userId: "",
    submissionTime: "",
    code: "",
    successCount: "",
    compileTime: 0,
    memoryUsage: 0,
    score: 0,
    errorFree: false,
    errorMessage: "",
}

