import React from 'react';
import { RunResult } from '@/app/models/RunResult';
import { Submission } from '@/app/models/Submission';
import { TestCase } from '@/app/models/TestCase';

interface ResultsSectionProps {
  result: RunResult;
  submission: Submission;
  testCase: TestCase;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ result, submission, testCase }) => {
  const { stderr, stdout } = result;
  const { successCount: successRate, score, errorFree } = submission;
  const { input, output } = testCase;

  console.log(result)

  const getOutputColor = () => {
    if (stderr) return 'text-danger';
    if (output !== stdout && !stderr) return 'text-danger';
    return 'text-success';
  };

  const renderOutput = () => {
    if (output !== stdout && !stderr)
      return <div className={getOutputColor()}>Your Output: {stdout}</div>;
    return (
      <div className={getOutputColor()}>
        Your Output: <span className="mx-2 fw-normal opacity-75">{stdout}</span>
      </div>
    );
  };

  return (
    <div className="my-2">
      {stderr && (
        <div className="text-white fw-bold">
          Compile Error: <span className="text-danger opacity-75"> {stderr}</span>
        </div>
      )}
      {result.token && (
        <div className="d-flex flex-column h-100">
          <div className="d-flex flex-row">
            <div className="text-white me-3 fw-bold">
              Input: <span className="mx-2 fw-normal opacity-75">{input}</span>
            </div>
            <div className="text-white me-3 fw-bold">
              Expected Output: <span className="mx-2 fw-normal opacity-75">{output}</span>
            </div>
          </div>
          <div className="py-3">{renderOutput()}</div>
        </div>
      )}
      {submission.id !== '' && errorFree && (
        <div className="text-white fw-bold">
          Passed Test Cases: <span className="text-white m-2">{successRate}</span>
          <div className="text-success me-3 fw-bold">
            Your Score: <span>{score}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsSection;
