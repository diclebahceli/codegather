"use client";
import MyModal from "@/app/components/delete_modal/DeleteModal";
import {Competition} from "@/app/models/Competition";
import {
  DeleteCompetition,
  GetAllCompetitions,
} from "@/app/services/CompetitionService";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

const CompetitionPage = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [pickedId, setPickedId] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await GetAllCompetitions();
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
      } catch (error: Error | any) {
        toast.error(error.message);
      }
    };
    fetchCompetitions();
  }, []);

  const handleModal = (e: any) => {
    setPickedId(e as string);
    setShow(!show);
  };

  const handleDeleteCompetition = async () => {
    const response = await DeleteCompetition(pickedId);
    if (response.error) {
      toast.error(response.error);
      return;
    }
    toast.success("Competition deleted successfully");
    setCompetitions(competitions.filter((competition) => competition.id !== pickedId));
    setShow(!show);
  }

  const handleEditCompetition = (competitionId: string) => {
    router.push(`/pages/admin/competition/edit/${competitionId}`);
  };

  return (
    <div className="d-flex justify-content-center bg-dark h-100">
      <div className="container mt-5">

        <h1 className="text-white">Competition Page</h1>
        <Link className="btn btn-primary text-white m-3" href="/pages/admin/competition/create"> Create Competition</Link>
        <table className="table table-dark table-borderless">
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
                    onClick={() => handleModal(competition.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <MyModal handleOnClick={handleDeleteCompetition} isOpen={show} message="Are you sure you want to delete this competition" handleToggle={handleModal} />


      </div>
    </div>
  );

};

export default CompetitionPage;
