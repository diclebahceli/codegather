"use client";
import { Competition } from "@/app/models/Competition";
import {
  deleteCompetition,
  getAllCompetitions,
} from "@/app/services/CompetitionService";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CompetitionPage = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await getAllCompetitions();
        if (response.error || !response.data) {
          toast.error(response.error);
          return;
        }
        const competitions = response.data as Competition[];
        for (let i = 0; i < competitions.length; i++) {
          competitions[i].startDate = competitions[i].startDate.split("T")[0];
          competitions[i].endDate = competitions[i].endDate.split("T")[0];
        }
        setCompetitions(competitions);
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    };
    fetchCompetitions();
  }, []);

  const handleDelete = async (competitionId: string) => {
    if (showConfirmation) {
      await deleteCompetition(competitionId);
      window.location.reload();
      setShowConfirmation(false);
    } else {
      setShowConfirmation(true);
    }
  };

  const handleEditCompetition = (competitionId: string) => {
    router.push(`/pages/admin/competition/editCompetitions/${competitionId}`);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <h1>Competition Page</h1>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="col-2">Competition Date</th>
            <th className="col-2">Competition Title</th>
            <th className="col-5">Competition Description</th>
            <th className="col-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {competitions.map((competition) => (
            <tr key={competition.id}>
              <td>
                {competition.startDate} / {competition.endDate}
              </td>
              <td>{competition.title}</td>
              <td>{competition.description}</td>

              <td>
                <button
                  className="btn btn-primary me-2 text-white"
                  onClick={() => handleEditCompetition(competition.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger text-white"
                  onClick={() => handleDelete(competition.id)}
                >
                  Delete
                </button>
                {showConfirmation && (
                  <div>
                    <p>Are you sure you want to delete this team?</p>
                    <button onClick={() => handleDelete(competition.id)}>
                      Yes
                    </button>
                    <button onClick={() => setShowConfirmation(false)}>
                      No
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompetitionPage;
