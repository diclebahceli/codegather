"use client";
import AceEditorComponent from "@/app/components/ace_editor/AceEditor";
import {Question} from "@/app/models/Question";
import {useState} from "react";
import TestCaseForm from "../../components/test_case_form/TestCaseForm";

export default function Page({params}: {params: {compid: string}}) {
  const [question, setQuestion] = useState<Question>({} as Question);

  const handleInputChange = (e: any) => {
    const {name, value} = e.target;
    setQuestion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    //submitto
  }

  function onValueChange(value: string) {
    setQuestion((prevState) => ({
      ...prevState,
      starterCode: value,
    }));
  }
  return (
    <div className="h-100 bg-dark p-5">
      <div className="container ">
        <h1 className="text-white">Create Question</h1>
        <div className="d-flex flex-column w-100">
          <form action={"handleSubmit"} className="col-6">
            <div className="container">
              <div className="form-floating rounded my-3">
                <input
                  className="form-control border border-2 fs-5"
                  type="text"
                  name="name"
                  placeholder="name"
                  required={true}
                />
                <label htmlFor={"name"}>Name</label>
              </div>
              <div className="form-floating rounded my-3">
                <textarea
                  className="form-control border border-2 fs-5 h-100"
                  name="description"
                  placeholder="description"
                  required={true}
                  rows={12}
                />
                <label htmlFor={"description"}>Description</label>
              </div>

            </div>

          </form>

          <div className="d-flex flex-row w-100 justify-content-around">
            <div className="col-6">
              <TestCaseForm />
            </div>

            <div className="col-6" style={{height: "30em"}}>
              <label className="text-white">Starter Code</label>
              <AceEditorComponent onValueChange={onValueChange} />
            </div>
          </div>


        </div>
        <button className="btn btn-primary mt-3 text-white fs-4">Create</button>

      </div>

    </div>
  );

}
