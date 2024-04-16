import InputField from "@/app/components/input_field/InputField";
import { Competition } from "@/app/models/Competition";
import {
  getCompetitionById,
  updateCompetition,
} from "@/app/services/CompetitionService";
import router from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditCompetitionPage = ({ params }: { params: { id: string } }) => {
  const [competitionData, setCompetitionData] = useState<Competition>(
    {} as Competition
  );
  useEffect(() => {
    const fetchCompetition = async (competitionId: string) => {
      try {
        const competition = await getCompetitionById(competitionId);
        setCompetitionData(competition);
        console.log("Competition", competition);
      } catch (error: Error | any) {
        throw new Error("Error fetching user from backend", error);
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

    const reponse = await updateCompetition(competitionInfo);

    if (reponse.error) {
      toast.error(reponse.error);
      return;
    }

    toast.success("Logged in successfully");

    setTimeout(() => {
      router.push("/pages/ongoingCompetitions");
    }, 1000);
  };

  return (
    <form action={handleSubmit}>
      <div className="container">
        <h1>Edit Competitions</h1>

        <div className="form-group">
          <label htmlFor="fullName">Competition Title</label>
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Competition Description</label>
          <InputField
            type="text"
            name="description"
            label="description"
            required={true}
            value={competitionData.description}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fullName">Competition Description</label>
          <InputField
            type="text"
            name="startDate"
            label="startDate"
            required={true}
            value={competitionData.startDate}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fullName">Competition Description</label>
          <InputField
            type="text"
            name="endDate"
            label="endDate"
            required={true}
            value={competitionData.endDate}
          />
        </div>

        <button className="btn btn-primary">Save</button>
      </div>
    </form>
  );
};
