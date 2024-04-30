"use client";
import InputField from "@/app/components/input_field/InputField";
import {Competition} from "@/app/models/Competition";
import {
  GetCompetitionById,
  UpdateCompetition,
} from "@/app/services/CompetitionService";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

const EditCompetitionPage = ({params}: {params: {id: string}}) => {
  const router = useRouter();
  const [competitionData, setCompetitionData] = useState<Competition>({} as Competition);

  const handleInputChange = (e: any) => {
    const {name, value} = e.target;
    setCompetitionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchCompetition = async (competitionId: string) => {
      try {
        const competition = await GetCompetitionById(competitionId);
        if (competition.error || !competition.data) {
          toast.error(competition.error);
          return;
        }
        setCompetitionData(competition.data as Competition);
      } catch (error: Error | any) {
        toast.error("Error fetching competition");
      }
    };
    fetchCompetition(params.id);
  }, []);

  const handleSubmit = async (formData: FormData) => {
    const competitionInfo: Competition = {
      id: competitionData.id,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
    };

    const reponse = await UpdateCompetition(competitionInfo);

    if (reponse.error) {
      toast.error(reponse.error);
      return;
    }

    toast.success("Updated successfully");

    setTimeout(() => {
      router.push("/pages/admin/competition");
    }, 1000);
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <form action={handleSubmit} className="col-6">
        <div className="container">
          <h1>Edit Competitions</h1>

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
              className="form-control border border-2"
              name="description"
              placeholder="description"
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
              disabled={new Date(competitionData.startDate) < new Date()}
              value={competitionData.startDate}
              required={true}
              onChange={handleInputChange}
            />
            <label htmlFor="startDate">Start Date</label>
          </div>

          <div className="form-floating rounded my-3">
            <input
              className="form-control border border-2"
              type="datetime-local"
              name="endDate"
              value={competitionData.endDate}
              required={true}
              onChange={handleInputChange}
            />
            <label htmlFor="endDate">End Date </label>
          </div>

          <div className="d-flex flex-row w-100">
            <button type="submit" className="btn btn-primary mt-3 text-white">Save</button>
            <button onClick={() => {router.push(`/pages/admin/question/createQuestion/${competitionData.id}`)}}
              className="btn btn-green mt-3 text-white ms-auto">Add Question</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCompetitionPage;
