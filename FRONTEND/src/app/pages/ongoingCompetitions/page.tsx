"use client";
import Card from "@/app/components/card/Card";
import CompetitionCard from "@/app/components/competition_card/CompetitionCard";
import {Competition} from "@/app/models/Competition";
import {getAllCompetitions} from "@/app/services/CompetitionService";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function OngoingCompetitions() {
  const router = useRouter();
  const [ongoingCompetitions, setOngoingCompetitions] = useState<Competition[]>([]);

  if (localStorage.getItem("accessToken") === null) {
    router.push("/pages/login");
  }

  useEffect(() => {
    const fetchdata = async () => {
      const result = await getAllCompetitions();
      if (result.error) {
        toast.error(result.error);
      } else {
        console.log(result.data);
        if (result.data) {
          setOngoingCompetitions(result.data);
        }
      }
    };
    fetchdata();
  }, []);


  return (
    <div className="h-100 bg-dark">
      <h1 className="pt-5 container text-white fs-m">
        ONGOING COMPETITIONS
      </h1>
      <div className="d-flex flex-row justify-content-evenly">
        <div className="mt-5 ms-5 d-flex flex-wrap col-7">
          {ongoingCompetitions.length === 0 ? (
            <div className="text-white fs-2">No competitions yet!</div>
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
  );
}
