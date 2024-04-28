"use client";
import InputField from "@/app/components/input_field/InputField";
import { Competition } from "@/app/models/Competition";
import {
  GetCompetitionById,
  UpdateCompetition,
} from "@/app/services/CompetitionService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditCompetitionPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [competitionData, setCompetitionData] = useState<Competition>(
    {} as Competition
  );

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    console.log(name, value);
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
        competition.data.startDate = competition.data.startDate.split("T")[0];
        competition.data.endDate = competition.data.endDate.split("T")[0];
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

          <div className="form-group m-3">
            <input
              className="form-control border border-2"
              type="text"
              name="title"
              placeholder="title"
              required={true}
              value={competitionData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group m-3">
            <input
              className="form-control border border-2"
              type="text"
              name="description"
              placeholder="description"
              required={true}
              value={competitionData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group m-3">
            <label>Start Date </label>
            <input
              className="form-control border border-2"
              type="date"
              name="startDate"
              placeholder="Start Date"
              required={true}
              value={competitionData.startDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group m-3">
            <label>End Date </label>
            <input
              className="form-control border border-2"
              type="date"
              name="endDate"
              placeholder="End Date"
              required={true}
              value={competitionData.endDate}
              onChange={handleInputChange}
            />
          </div>

          <button className="btn btn-primary mt-3 text-white">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditCompetitionPage;
