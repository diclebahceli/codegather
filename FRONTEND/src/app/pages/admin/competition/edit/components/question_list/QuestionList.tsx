import MyModal from "@/app/components/delete_modal/DeleteModal";
import {Question} from "@/app/models/Question";
import {DeleteQuestion} from "@/app/services/QuestionService";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function QuestionList({initialQuestions}: {initialQuestions: Question[]}) {

  const [questions, setQuestions] = useState<Question[]>([]);
  const [pickedId, setPickedId] = useState("");
  const [show, setShow] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setQuestions(initialQuestions);
  }, [initialQuestions])

  function handleEditQuestion(id: string): void {
    router.push(`/pages/admin/question/edit/${id}`);
  }

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

  const handleModalDelete = (e: any) => {
    setPickedId(e as string);
    setShow(!show);
  };

  return (
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
                onClick={() => handleModalDelete(question.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>

      <MyModal handleOnClick={handleDeleteCompetition} isOpen={show}
        message="Are you sure you want to delete this question" handleCancel={handleModalDelete} />
    </table>

  );
}
