export interface TestCase {
  id: string,
  input: string,
  output: string,
  questionId: string,
}

export const DefaultTestCase: TestCase = {
  id: "",
  input: "",
  output: "",
  questionId: "",
}
