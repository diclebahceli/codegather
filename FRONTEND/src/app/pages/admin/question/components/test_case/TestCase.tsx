"use client";
import React, {useState} from 'react';

export interface TestCaseProps {
  input: string;
  expectedOutput: string;
}

// const TestCase = ({testCase: testCaseProp}: {testCase: TestCaseProps}) => {
//   const [testCase, setTestCase] = useState(testCaseProp.testCase);
//
//   const handleValueChanged = (e: any) => {
//     const {name, value} = e.target;
//     setTestCase((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   }
//   return (
//     <div className="test-case">
//       <input
//         type="text"
//         placeholder="Input"
//         name='input'
//         defaultValue={testCaseProp.testCase.input}
//         required={true}
//         onChange={handleValueChanged}
//       />
//       <input
//         type="text"
//         placeholder="Expected Output"
//         name='expectedOutput'
//         required={true}
//         defaultValue={testCaseProp.testCase.expectedOutput}
//         onChange={handleValueChanged}
//       />
//       {testCaseProp.onRemove && (
//         <button onClick={() => testCaseProp.onRemove ? testCaseProp.onRemove(testCaseProp) : undefined}>Remove</button>
//       )}
//     </div>
//   );
// };
//
// export default TestCase;
