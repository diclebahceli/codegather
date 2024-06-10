
export interface RunResult{
  stdout: string;
  stderr: string;
  time: string;
  memory: string;
  token: string;
}

export const DefaultRunResult: RunResult = {
  stdout: "",
  stderr: "",
  time: "",
  memory: "",
  token: "",
}
