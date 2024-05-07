"use client";
import DeleteModal from "@/app/components/delete_modal/DeleteModal";
import {Competition} from "@/app/models/Competition";
import {Question} from "@/app/models/Question";
import {
  GetCompetitionById,
  UpdateCompetition,
} from "@/app/services/CompetitionService";
import {DeleteQuestion} from "@/app/services/QuestionService";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {FormGroup, Input, Label} from "reactstrap";

//TODO: ADD QUESTION LIST OF COMPETITION IN THIS PAGE WITH EDIT AND DELETE OPTIONS
const EditCompetitionPage = ({params}: {params: {id: string}}) => {
  const router = useRouter();
  const [competitionData, setCompetitionData] =
    useState<Competition>({description: "", endDate: "", id: "", startDate: "", title: "", isPublic: false});

  const [pickedId, setPickedId] = useState("");
  const [show, setShow] = useState(false);

  const [questions, setQuestions] = useState<Question[]>([]);


  const handleInputChange = (e: any) => {
    const {name, value} = e.target;
    setCompetitionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePublic = () => {
    setCompetitionData((prevState) => ({
      ...prevState,
      isPublic: !competitionData.isPublic
    }));
  };

  useEffect(() => {
    const fetchCompetition = async (competitionId: string) => {
      try {
        const result = await GetCompetitionById(competitionId);
        if (result.error || !result.data) {
          toast.error(result.error);
          router.replace("/pages/admin/competition");
          return;
        }
        setQuestions(result.data.questions || []);
        setCompetitionData(result.data as Competition);
        
      } catch (error: Error | any) {
        toast.error("Error fetching competition");
        router.replace("/pages/admin/competition");
      }
    };
    fetchCompetition(params.id);
  }, []);

  const handleSubmit = async (formData: FormData) => {
    const reponse = await UpdateCompetition(competitionData);

    if (reponse.error) {
      toast.error(reponse.error);
      return;
    }

    toast.success("Updated successfully");
  };

  const handleModal = (e: any) => {
    setPickedId(e as string);
    setShow(!show);
  };

  const handleDeleteCompetition = async () => {
    const response = await DeleteQuestion(pickedId);
    if (response.error || !response.success) {
      toast.error(response.error);
      return;
    }
    toast.success("Question deleted successfully");
    setQuestions(questions.filter((question) => question.id !== pickedId));
    setShow(!show);
  }

  function handleEditQuestion(id: string): void {
    router.push(`/pages/admin/question/edit/${id}`);
  }

  return (
    <div className="h-100 bg-dark p-5">
      <div className="d-flex justify-content-center align-items-center h-100 w-100">
        {competitionData.id === "" ? null :
          <div className="d-flex flex-row justify-content-around w-100">
            <form action={handleSubmit} className="col-4">
              <div className="container">
                <h1 className="text-white">Edit Competition</h1>

                <div className="form-floating rounded my-3">
                  <input
                    className="form-control border border-2"
                    type="text"
                    name="title"
                    placeholder="title"
                    required={true}
                    value={competitionData.title}
                    onChange={handleInputChange}
                  />
                  <label htmlFor={"title"}>Title</label>
                </div>

                <div className="form-floating rounded my-3">
                  <textarea
                    className="form-control border border-2 h-100"
                    name="description"
                    placeholder="description"
                    rows={5}
                    required={true}
                    onChange={handleInputChange}
                    value={competitionData.description}
                  />
                  <label htmlFor={"description"}>Description</label>
                </div>

                <div className="form-floating rounded my-3">
                  <input
                    className="form-control border border-2"
                    type="datetime-local"
                    name="startDate"
                    value={competitionData.startDate}
                    disabled={new Date(competitionData.startDate) < new Date()}
                    required={true}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="startDate">Start Date</label>
                </div>

                <div className="form-floating rounded my-3">
                  <input
                    className="form-control border border-2"
                    type="datetime-local"
                    disabled={new Date(competitionData.endDate) < new Date()}
                    name="endDate"
                    required={true}
                    value={competitionData.endDate}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="endDate">End Date </label>
                </div>
                <FormGroup switch>
                  <Input
                    type="switch"
                    checked={competitionData.isPublic}
                    onClick={() => {
                      togglePublic();
                    }}
                  />
                  <Label className="text-white" check>Public</Label>
                </FormGroup>
                <div className="d-flex flex-row w-100">
                  <button type="submit" className="btn btn-primary mt-3 text-white">Save</button>
                  <button type="button" onClick={() => {router.push(`/pages/admin/question/create/${competitionData.id}`, {scroll: false})}}
                    className="btn btn-green mt-3 text-white ms-auto">Add Question</button>
                </div>
              </div>
            </form>
            <div className="col-4">
              <table className="table table-dark table-borderless">
                <thead>
                  <tr>
                    <th className="col-2">Question</th>
                    <th className="col-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question) => (
                    <tr key={question.id}>
                      <td>{question.name}</td>
                      <td>
                        <button
                          className="btn btn-primary me-2 text-white"
                          onClick={() => handleEditQuestion(question.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger text-white"
                          onClick={() => handleModal(question.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        }
        <DeleteModal handleOnDelete={handleDeleteCompetition} isOpen={show}
          message="Are you sure you want to delete this question" handleToggle={handleModal} />

      </div>
    </div>
  );
};

export default EditCompetitionPage;
