import {Submission} from "./Submission";
import {TestCase} from "./TestCase";

export interface Question {
    id: string;
    name: string;
    competitionId: string;
    description: string;
    starterCode: string;
    testCases: TestCase[];
    submissions: Submission[];
}

export const DefaultQuestion: Question = {
    id: "",
    name: "",
    competitionId: "",
    description: "",
    starterCode: "",
    testCases: [],
    submissions: [],
}
