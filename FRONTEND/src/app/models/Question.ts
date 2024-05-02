import {TestCase} from "./TestCase";

export interface Question {
    id: string;
    name: string;
    competitionId: number;
    description: string;
    starterCode: string;
    testCases?: TestCase[];
    submissions?: any[];
}
