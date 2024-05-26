"use client";
import CompetitionCard from "@/app/components/competition_card/CompetitionCard";
import Protected from "@/app/components/protected/Protected";
import { Competition } from "@/app/models/Competition";
import { GetAllCompetitions } from "@/app/services/CompetitionService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import image from "./../../assets/5.png";

export default function OngoingCompetitions() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);

  useEffect(() => {
    const fetchCompetitions = async () => {
      const result = await GetAllCompetitions();
      if (result.error) {
        toast.error(result.error);
      } else {
        if (result.data) {
          setCompetitions(result.data);
        }
      }
    };

    fetchCompetitions();
  }, []);

  return (
    <div className="h-100 bg-black bg-gradient">
      <h1 className="pt-5 container text-white fs-m p-5 mb-3">
        ONGOING COMPETITIONS
      </h1>
      <div className="d-flex flex-row justify-content-center flex-wrap">
        {competitions.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center col-md-7 col-sm-12">
            <div className="text-white fs-3"> No Competitions Yet 👻</div>
          </div>
        ) : (
          <div className="my-md-5 d-flex flex-wrap col-md-7 col-sm-4 h-50 mw-100 p-5 p-md-0">
            {competitions.map((competition, index) => (
              <CompetitionCard
                key={competition.id || index}
                competition={competition}
              />
            ))}
          </div>
        )}
        <div className="col-md-3 col-sm-12 mt-5 fs-2 text-white mx-5">
          <div className="text-center">Disclaimer: </div>
          <div className=" fs-4">
            The information provided on this page is for general informational
            purposes only. It is not intended to be a substitute for
            professional advice. Always seek the advice of a qualified
            professional for any specific concerns or questions you may have
            regarding competitions, user profiles, or any other matters
            referenced on this platform.
          </div>
        </div>
      </div>
    </div>
  );
}
