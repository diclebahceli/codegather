"use client";
import CompetitionCard from "@/app/components/competition_card/CompetitionCard";
import { Competition } from "@/app/models/Competition";
import { GetAllCompetitions } from "@/app/services/CompetitionService";
import { GetUserById } from "@/app/services/UserService";
import { getWithExpiry } from "@/app/utils/StorageGetter";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyCompetitions() {
  const [passedCompetitions, setPassedCompetitions] = useState<Competition[]>(
    []
  );

  const [currentCompetitions, setCurrentCompetitions] = useState<Competition[]>(
    []
  );

  useEffect(() => {
    const fetchJoinedCompetitions = async () => {
      // use client
      const result = await GetUserById(getWithExpiry("userId") || "");
      const competitions = result.data?.competitions;

      if (result.error) {
        toast.error(result.error);
      } else {
        if (competitions) {
          competitions.forEach((competition) => {
            if (new Date(competition.endDate) < new Date()) {
              if (
                !passedCompetitions.some((comp) => comp.id === competition.id)
              )
                setPassedCompetitions((prev) => [...prev, competition]);
            } else {
              if (
                !currentCompetitions.some((comp) => comp.id === competition.id)
              )
                setCurrentCompetitions((prev) => [...prev, competition]);
            }
          });

        }
      }
    };

    fetchJoinedCompetitions();
  }, []);

  return (
    <div className="h-100 bg-black bg-gradient">
      <h1 className="pt-5 container text-white fs-m mb-3">MY COMPETITIONS</h1>
      {currentCompetitions.length == 0 && passedCompetitions.length == 0 ? (
        <div className="d-flex justify-content-center align-items-center col-7">
          <div className="text-white fs-3"> No Competitions Yet 👻</div>
        </div>
      ) : (
        <div className="d-flex flex-row ">
          <div className="mt-5 d-flex flex-column col-6 align-items-center">
            <h1 className="text-white fs-3">Current Competitions</h1>
            {currentCompetitions.map((competition, index) => (
              <CompetitionCard
                key={competition.id || index}
                competition={competition}
              />
            ))}
          </div>

          <div className="mt-5  d-flex flex-column col-6 align-items-center">
            <h1 className="text-white fs-3">Passed Competitions</h1>
            {passedCompetitions.map((competition, index) => (
              <CompetitionCard
                key={competition.id || index}
                competition={competition}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
