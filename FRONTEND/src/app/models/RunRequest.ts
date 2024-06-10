export interface RunRequest {
    userId: string;
    questionId: string;
    code: string;
    languageId: number;
}

export const DefaultRunRequest: RunRequest = {
    userId: "",
    questionId: "",
    code: "",
    languageId: 0,
}
