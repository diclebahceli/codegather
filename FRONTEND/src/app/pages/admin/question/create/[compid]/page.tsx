"use client";
import AceEditorComponent from "@/app/components/ace_editor/AceEditor";
import {Question} from "@/app/models/Question";
import {useState} from "react";
import TestCaseForm from "../../components/test_case_form/TestCaseForm";
import {CreateQuestion} from "@/app/services/QuestionService";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function Page({params}: {params: {compid: string}}) {
  const [question, setQuestion] = useState<Question>({} as Question);
  const router = useRouter();

  const handleInputChange = (e: any) => {
    const {name, value} = e.target;
    setQuestion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    question.competitionId = params.compid;
    if (question.starterCode === undefined || question.starterCode === "") {
      toast.error("Starter code is required")
      return;
    }
    try {
      const result = await CreateQuestion(question)
      console.log(result)
      if (result.error || !result.data) {
        toast.error(result.error)
        return;
      }
      toast.success("Question created successfully")

      setTimeout(() => {
        router.replace(`/pages/admin/competition/edit/${params.compid}`);
      }, 1000);

    } catch (error: Error | any) {
      toast.error(error.message)
    }
  }

  function onCodeChange(value: string) {
    setQuestion((prevState) => ({
      ...prevState,
      starterCode: value,
    }));
  }

  return (
    <div className="h-100 bg-dark p-5">
      <div className="container ">
        <h1 className="text-white mb-3">Create Question</h1>
        <div className="d-flex flex-row w-100 justify-content-center ">
          <form action={handleSubmit} className="col-6 mx-3">
            <div className="form-floating rounded my-3">
              <input
                className="form-control border border-2 fs-5"
                type="text"
                name="name"
                placeholder="name"
                required={true}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
              />
              <label htmlFor={"description"}>Description</label>
            </div>
            <button className="btn btn-primary mt-3 text-white fs-4">Create</button>
          </form>
          <div className="col-6" style={{height: "24.5em"}}>
            <label className="text-white fs-4">Starter Code</label>
            <AceEditorComponent onValueChange={onCodeChange} />
          </div>
        </div>

      </div>

    </div>
  );

}
