import {TestCase} from "./TestCase";

export interface Question {
    id: string;
    name: string;
    competitionId: string;
    description: string;
    starterCode: string;
    testCases?: TestCase[];
    submissions?: any[];
}
