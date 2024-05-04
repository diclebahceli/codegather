"use client";
import {TestCase} from '@/app/models/TestCase';
import {CreateTestCase, DeleteTestCase, UpdateTestCase} from '@/app/services/TestCaseService';
import React, {useEffect, useState} from 'react';
import toast from 'react-hot-toast';

export interface TestCaseProps {
  input: string;
  output: string;
}

const TestCaseForm = ({qId, initial}: {qId: string, initial: TestCase[]}) => {

  const [testCases, setTestCases] = useState<TestCase[]>([{id: "", questionId: qId, input: "", output: ''}]);
  const [error, setError] = useState<string>('');

  const handleAddTestCase = async (index: number, testCase: TestCase) => {
    setError('');
    if (testCase.input === '' || testCase.output === '') {
      setError('Please fill all fields');
      return;
    }
    const result = await CreateTestCase(testCase);
    if (result.error || !result.data) {
      toast.error(result.error);
      return;
    }

    toast.success('Test case added successfully');
    updateItemFromState(index, result.data);

    setTestCases([...testCases, {id: "", questionId: qId, input: "", output: ''}]);
  };

  useEffect(() => {
    initial.push({id: "", questionId: qId, input: "", output: ''})
    setTestCases(initial);
  }, [initial]);

  const handleDeleteTestCase = async (id: string) => {
    try {
      const result = await DeleteTestCase(id);

      if (result.error) {
        toast.error(result.error);
        return;
      }

    } catch (e: Error | any) {
      toast.error(e);
    }
    toast.success('Test case deleted successfully');
    setTestCases(testCases.filter(tc => tc.id !== id));
  }

  const handleUpdateTestCase = async (index: number) => {
    const testCase = testCases[index];
    try {
      const reuslt = await UpdateTestCase(testCase);
      if (reuslt.error || !reuslt.data) {
        toast.error(reuslt.error);
        return;
      }
      toast.success('Test case updated successfully');
      updateItemFromState(index, reuslt.data);
    } catch (e: Error | any) {
      toast.error(e);
    }
  }


  const updateItemFromState = (index: number, testCase: TestCase) => {
    const updatedTestCases = testCases.map((tc, i) => i === index ? testCase : tc);
    setTestCases(updatedTestCases);
  }

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
        <div key={index}>
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
              {testCases.length > 1 && testCase.input !== "" && (
                <button className='btn btn-danger mx-1 me-auto' onClick={() => handleDeleteTestCase(testCase.id)}>Delete</button>
              )}

              {testCases.length > 1 && testCase.input !== "" && (
                <button className='btn btn-orange mx-1 me-auto' onClick={() => handleUpdateTestCase(index)}>Update</button>
              )}
            </div>

            {index === testCases.length - 1 && (

              <button type='submit' className='btn btn-primary ms-auto' onClick={() => handleAddTestCase(index, testCase)}>Add</button>)
            }

          </div>
        </div>
      ))}
      <small className='text-danger'>{error}</small>
    </div>
  );
};

export default TestCaseForm;
