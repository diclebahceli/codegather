"use client";
import CompetitionCard from "@/app/components/competition_card/CompetitionCard";
import Protected from "@/app/components/protected/Protected";
import {Competition} from "@/app/models/Competition";
import {getAllCompetitions} from "@/app/services/CompetitionService";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function OngoingCompetitions() {
  const [ongoingCompetitions, setOngoingCompetitions] = useState<Competition[]>([]);

  useEffect(() => {

    const fetchdata = async () => {
      const result = await getAllCompetitions();
      if (result.error) {
        toast.error(result.error);
      } else {
        if (result.data) {
          setOngoingCompetitions(result.data);
        }
      }
    };

    fetchdata();
  }, []);


  return (
    <Protected>
      <div className="h-100 bg-dark">
        <h1 className="pt-5 container text-white fs-m">
          ONGOING COMPETITIONS
        </h1>
        <div className="d-flex flex-row justify-content-evenly">
          <div className="mt-5 ms-5 d-flex flex-wrap col-7">
            {ongoingCompetitions.length === 0 ? (
            <div> No Competitions Yet!</div>
            ) : (
              ongoingCompetitions.map((competition, index) => (
                <CompetitionCard
                  key={competition.id || index}
                  competition={competition}
                />
              ))
            )}
          </div>
          <div className="col-3 text-center mt-5 fs-2 text-white"> Disclaimer</div>
        </div>
      </div>
    </Protected>
  );
}
