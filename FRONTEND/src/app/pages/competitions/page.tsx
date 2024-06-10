"use client";
import CompetitionCard from "@/app/components/competition_card/CompetitionCard";
import {Competition} from "@/app/models/Competition";
import {GetAllCompetitions} from "@/app/services/CompetitionService";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function Page() {
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

  const startedCompetitions = competitions.filter(c => c.isPublic && new Date() > new Date(c.startDate));
  const upcomingCompetitions = competitions.filter(c => c.isPublic && new Date() < new Date(c.startDate));

  return (
    <div className="h-100 bg-black bg-gradient">
      <h1 className="pt-5 container text-white fs-m p-5 mb-3">
        COMPETITIONS
      </h1>
      <div className="d-flex flex-column justify-content-center align-items-center flex-wrap">
        <div className="d-flex flex-row justify-content-around w-100 flex-wrap min-vh-100">
          <div className="col-md-4 col-12">
            <div className="text-white fs-2 text-center">
              Ongoing Competitions
              <hr className="border border-1 border-green opacity-100 mx-5"></hr>
            </div>
            {competitions.filter(c => c.isPublic).length === 0 ? (
              <div className="d-flex justify-content-center align-items-center ">
                <div className="text-white fs-3"> No Competitions Yet 👻</div>
              </div>
            ) : (
              <div className="my-md-5 d-flex flex-column align-items-center mw-100 p-5 p-md-0">
                {startedCompetitions.map((competition, index) => (
                  <CompetitionCard
                    key={competition.id || index}
                    competition={competition}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="col-md-4 col-12">
            <div className="text-white fs-2 text-center">
              Upcoming Competitions
              <hr className="border border-1 border-green opacity-100 mx-5"></hr>
            </div>
            {competitions.filter(c => c.isPublic).length === 0 ? (
              <div className="d-flex justify-content-center align-items-center ">
                <div className="text-white fs-3"> No Competitions Yet 👻</div>
              </div>
            ) : (
              <div className="my-md-5 d-flex flex-column align-items-center mw-100 p-5 p-md-0">
                {upcomingCompetitions.map((competition, index) => (
                  <CompetitionCard
                    key={competition.id || index}
                    competition={competition}
                  />

                ))}
              </div>
            )}
          </div>


        </div>
        <div className="col-md-6 col-sm-12 mt-5 fs-2 text-white m-5">
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
