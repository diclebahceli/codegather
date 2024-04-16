"use client";
import CompetitionCard from "@/app/components/competition_card/CompetitionCard";
import { Competition } from "@/app/models/Competition";
import { getAllCompetitions } from "@/app/services/CompetitionService";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function OngoingCompetitions() {
  const router = useRouter();
  const result: { data: Competition[] | null; error: string | null } = {
    data: null,
    error: null,
  };
  let competitions: Competition[] = [];

  if (localStorage.getItem("accessToken") === null) {
    router.push("/pages/login");
  }

  useEffect(() => {
    const fetchdata = async () => {
      const result = await getAllCompetitions();
      let competitions: Competition[] = [];

      if (result.error) {
        toast.error(result.error);
      } else {
        if (result.data) {
          competitions = result.data;
        }
      }
    };
    fetchdata();
  }, []);

  if (result.error) {
    toast.error(result.error);
  } else {
    if (result.data) {
      competitions = result.data;
    }
  }

  return (
    <div className="h-100 bg-dark">
      <h1 className="pt-5 container text-white" style={{ fontSize: "5rem" }}>
        ONGOING COMPETITIONS
      </h1>
      <div className="d-flex flex-row justify-content-evenly">
        <div className="mt-5 ms-5 d-flex flex-wrap justify-content-evenly  col-7">
          {competitions.length === 0 ? (
            <div className="text-white fs-2">No competitions yet!</div>
          ) : (
            competitions.map((competition, index) => (
              <CompetitionCard
                key={competition.id || index}
                competition={competition}
              />
            ))
          )}
        </div>
        <div className="col-3 text-center mt-5 fs-2"> Disclaimer</div>
      </div>
    </div>
  );
}
