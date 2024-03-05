import { Question } from "../models/Question";

const questions: Question[] = [
    {
        id: 1,
        name: "Question 1",
        competitionId: 1,
        description: "Given a string, find the length of the longest substring without repeating characters.",
        testCases: "Input: s = 'abcabcbb', Output: 3"
    },
    {
        id: 2,
        name: "Question 2",
        competitionId: 1,
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        testCases: "Input: s = 'pwwkew', Output: 3"
    },
    {
        id: 3,
        name: "Question 3",
        competitionId: 2,
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        testCases: "Input: s = 'pwwkew', Output: 3"
    },
    {
        id: 4,
        name: "Question 4",
        competitionId: 2,
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        testCases: "Input: s = 'pwwkew', Output: 3"
    },
    {
        id: 5,
        name: "Question 5",
        competitionId: 3,
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        testCases: "Input: s = 'pwwkew', Output: 3"
    },
    {
        id: 6,
        name: "Question 6",
        competitionId: 3,
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        testCases: "Input: s = 'pwwkew', Output: 3"
    },
    {
        id: 7,
        name: "Question 7",
        competitionId: 4,
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        testCases: "Input: s = 'pwwkew', Output: 3"
    },
    {
        id: 8,
        name: "Question 8",
        competitionId: 4,
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        testCases: "Input: s = 'pwwkew', Output: 3"
    },
    {
        id: 9,
        name: "Question 9",
        competitionId: 5,
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        testCases: "Input: s = 'pwwkew', Output: 3"
    }
]


export async function GetAllQuestions(): Promise<Question[]> {
    return questions;
};

export async function GetQuestionById(id: number): Promise<Question> {
    const question = await questions.find(question => question.id == id);
    if (question) {
        return question;
    }
    throw new Error(`Competition with id ${id} not found`);
}

export async function GetQuestionsByCompetitionId(id: number): Promise<Question[]> {
    const questionsByCompetition = await questions.filter(question => question.competitionId == id);
    if (questionsByCompetition) {
        return questionsByCompetition;
    }
    throw new Error(`Competition with id ${id} not found`);
}
