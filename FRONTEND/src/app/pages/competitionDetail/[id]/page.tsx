"use client";
import Card from "@/app/components/card/Card";
import QuestionCard from "@/app/components/question_card/QuestionCard";
import {Competition} from "@/app/models/Competition";
import {GetCompetitionById} from "@/app/services/CompetitionService";
import {getWithExpiry} from "@/app/utils/StorageGetter";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function CompetitionDetailnumber({params}: {params: {id: string}}) {
  const [competition, setCompetition] = useState<Competition>();
  const router = useRouter();


  useEffect(() => {
    
    if (getWithExpiry("accessToken") === null) {
      router.push("/pages/login");
      return;
    }
    const fetchdata = async () => {
      var result = await GetCompetitionById(params.id);
      if (result.error) {
          router.push("/pages/ongoingCompetitions")
          return;
      } else {
        if (result.data) {
          console.log(result.data);
          setCompetition(result.data);
        }
      }
    }
    fetchdata();

  }, []);
  return (
    <div className="h-100 bg-dark">
      <h1 className="pt-5 container" style={{fontSize: "3rem"}}>{competition?.title}</h1>

      <div className="d-flex flex-row justify-content-around">
        <div className="mt-5 d-flex flex-column col-3 align-self-center">
          {competition?.questions?.map((question, index) => (
            <QuestionCard key={question.id || index} question={question} />
          ))}
        </div>
        <div className="col-3 text-center mt-5 fs-2">
          <div className="d-flex flex-column align-items-center">
            <div className="fw-bold fs-3">Leaderboard</div>
            <div className="w-75">
              <Card>
                <div className="card-body d-flex flex-column bg-grey">
                  <div className="card-title fs-4 text-white"> 1. John Doe</div>
                  <div className="card-title fs-4 text-white"> 2. Mark Ellen</div>
                  <div className="card-title fs-4 text-white"> 3. Peter Parker</div>
                  <div className="card-title fs-4 text-white"> 4. Jack Stone </div>
                </div>
              </Card>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
