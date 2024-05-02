"use client";
import {TestCase} from '@/app/models/TestCase';
import React, {useState} from 'react';

export interface TestCaseProps {
  input: string;
  output: string;
}

// USE THIS FORM IN A NEW EDIT QUESTION PAGE INSTEAD OF CREATE
// USER WILL FIRST CREATE THE QUESTION AND THEN ADD TEST CASES
const TestCaseForm = () => {

  const [testCases, setTestCases] = useState<TestCase[]>([{id: "", questionId: "", input: "", output: ''}]);
  const [error, setError] = useState<string>('');

  const handleAddTestCase = (testCase: TestCase) => {
    setError('');
    if (testCase.input === '' || testCase.output === '') {
      setError('Please fill all fields');
      return;
    }
    setTestCases([...testCases, {id: "", questionId: "", input: "", output: ''}]);
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
                name='output'
                required={true}
                value={testCase.output}
                onChange={(e) => handleValueChanged(index, 'output', e.target.value)}
              />
              {testCases.length > 1 && (
                <button className='btn btn-danger mx-2' onClick={() => handleRemoveTestCase(index)}>Remove</button>)
              }
            </div>

            {index === testCases.length - 1 && (

              <button type='submit' className='btn btn-primary ms-auto' onClick={() => handleAddTestCase(testCase)}>Add</button>)
            }

          </div>
        </div>
      ))}
      <small className='text-danger'>{error}</small>
    </div>
  );
};

export default TestCaseForm;
