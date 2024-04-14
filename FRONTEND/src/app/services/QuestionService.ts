import { Question } from "../models/Question";

const questions: Question[] = [
    {
        id: 1,
        name: "Question 1",
        competitionId: 1,
        description: ` Challenge: String Reversal Imagine you're a secret agent and need to quickly encode messages to send back to headquarters. You've been given a simple encryption method: reversing the order of the letters in a message.
        The Mission: Write a function that takes a string as input and returns a new string with the characters reversed. For example, the message "hello world" should become "dlrow olleh" after encryption.
        Bonus Mission: Can you crack the code without using any built-in string reversal functions? This could involve using loops to iterate through the string character by character and building the reversed string from scratch.
        `,
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
