"use client";
import AceEditorComponent from "@/app/components/ace_editor/AceEditor";
import TestCaseForm from "../../components/test_case_form/TestCaseForm";
import {useEffect, useState} from "react";
import {DefaultQuestion, Question} from "@/app/models/Question";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {GetQuestionById, UpdateQuestion} from "@/app/services/QuestionService";
import {Competition, DefaultCompetition} from "@/app/models/Competition";
import {GetCompetitionById} from "@/app/services/CompetitionService";

export default function Page({params}: {params: {id: string}}) {

  const [question, setQuestion] = useState<Question>(DefaultQuestion);
  const router = useRouter();
  const [competition, setCompetition] = useState<Competition>(DefaultCompetition);


  const handleInputChange = (e: any) => {
    const {name, value} = e.target;
    setQuestion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  useEffect(() => {
    const fetchQuestion = async (questionId: string) => {
      try {
        const result = await GetQuestionById(questionId);
        if (result.error || !result.data) {
          toast.error(result.error);
          router.replace("/pages/admin/competition");
          return;
        }
        setQuestion(result.data);
      } catch (error: Error | any) {
        toast.error("Invalid Question");
        return;
      }
    };

    const fetchCompetition = async (competitionId: string) => {
      if (competitionId === "") return;
      try {
        const result = await GetCompetitionById(competitionId);
        if (result.error || !result.data) {
          toast.error(result.error);
          router.replace("/pages/admin/competition");
          return;
        }
        setCompetition(result.data);

      } catch (error: Error | any) {
        toast.error("Error fetching competition");
        router.replace("/pages/admin/competition");
        return;
      }
    }
    fetchQuestion(params.id);
    fetchCompetition(question.competitionId);
  }, [question.competitionId]);

  const handleSubmit = async () => {
    question.competitionId = params.id;
    if (question.starterCode === undefined || question.starterCode === "") {
      toast.error("Starter code is required")
      return;
    }
    try {
      const result = await UpdateQuestion(question)
      if (result.error || !result.data) {
        toast.error(result.error)
        return;
      }
      toast.success("Question updated successfully")
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
        <h1 className="text-white mb-3">Update Question</h1>
        <div className="d-flex flex-column w-100 justify-content-center ">
          <div className="d-flex flex-row justify-content-around">
            <form action={handleSubmit} className="col-6 mx-3">
              <div className="form-floating rounded my-3">
                <input
                  className="form-control border border-2 fs-5"
                  type="text"
                  name="name"
                  placeholder="name"
                  required={true}
                  value={question.name}
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
                  value={question.description}
                  onChange={handleInputChange}
                />
                <label htmlFor={"description"}>Description</label>
              </div>
              <button className="btn btn-primary mt-3 text-white fs-4">Save</button>
            </form>
            <div className="col-6" style={{height: "24.5em"}}>
              <label className="text-white fs-4">Starter Code</label>
              <AceEditorComponent onValueChange={onCodeChange} defaultValue={question.starterCode} />
            </div>

          </div>
          <div className="col-8 mt-3">
            <TestCaseForm qId={params.id} initial={question.testCases || []} isPublic={competition.isPublic} />
          </div>
        </div>
      </div>
    </div>
  )
}
