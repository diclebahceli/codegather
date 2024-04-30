"use client";
import React, {useState} from 'react';

export interface TestCaseProps {
  input: string;
  expectedOutput: string;
}

const TestCaseForm = () => {
  const [testCases, setTestCases] = useState<TestCaseProps[]>([{input: '', expectedOutput: ''}]);
  const [error, setError] = useState<string>('');

  const handleAddTestCase = (testCase: TestCaseProps) => {
    //Try to add test cases in backend than add a new blank
    //TODO
    setError('');
    if (testCase.input === '' || testCase.expectedOutput === '') {
      setError('Please fill all fields');
      return;
    }
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
  }

  return (
    <div className="container">
      <div className='text-white fs-3'>Test Cases</div>
      {testCases.map((testCase, index) => (
        <div className="test-case" key={index}>
          <div className='col-8'>
            <div className="input-group rounded my-2">
              <input
                className="form-control"
                type="text"
                placeholder="Input"
                required={true}
                name='input'
                value={testCase.input}
                onChange={(e) => handleValueChanged(index, 'input', e.target.value)}
              />
              <input
                className="form-control"
                type="text"
                placeholder="Expected Output"
                name='expectedOutput'
                required={true}
                value={testCase.expectedOutput}
                onChange={(e) => handleValueChanged(index, 'expectedOutput', e.target.value)}
              />
              {testCases.length > 1 && (
                <button className='btn btn-danger mx-2' onClick={() => handleRemoveTestCase(index)}>Remove</button>)
              }
              {index === testCases.length - 1 && (

                <button type='submit' className='btn btn-primary mx-2 ' onClick={() => handleAddTestCase(testCase)}>Add</button>)
              }
            </div>

          </div>
        </div>
      ))}
      <small className='text-danger'>{error}</small>
    </div>
  );
};

export default TestCaseForm;
