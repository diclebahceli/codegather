"use client";
import React, {useState} from 'react';
import {TestCaseProps} from '../test_case/TestCase';


const TestCaseForm = () => {
  const [testCases, setTestCases] = useState<TestCaseProps[]>([{input: '', expectedOutput: ''}]);

  const handleAddTestCase = (testCase: TestCaseProps) => {
    //Try to add test cases in backend than add a new blank
    //TODO
    setTestCases([...testCases, {input: "", expectedOutput: ''}]);
  };

  const handleRemoveTestCase = (index: number) => {
    const newTestCases = testCases.filter((_, i) => i !== index);
    setTestCases(newTestCases);
  };

  const handleValueChanged = (index: number, key: string, value: string) => {
    const newTestCases = testCases.map((testCase, i) => {
      if (i === index) {
        return {
          ...testCase,
          [key]: value,
        };
      }
      return testCase;
    });
    setTestCases(newTestCases);
    console.log(newTestCases)
  }

  return (
    <div className="">
      <h2>Test Cases</h2>
      {testCases.map((testCase, index) => (
        <div className="test-case" key={index}>
          <input
            type="text"
            placeholder="Input"
            name='input'
            value={testCase.input}
            required={true}
            onChange={(e) => handleValueChanged(index, 'input', e.target.value)}
          />
          <input
            type="text"
            placeholder="Expected Output"
            name='expectedOutput'
            required={true}
            value={testCase.expectedOutput}
            onChange={(e) => handleValueChanged(index, 'expectedOutput', e.target.value)}
          />
          <button onClick={() => handleRemoveTestCase(index)}>Remove</button>
          {index === testCases.length - 1 && (

            <button onClick={() => handleAddTestCase(testCase)}>Add</button>)
          }
        </div>
      ))}
    </div>
  );
};

export default TestCaseForm;
