import Card from "@/app/components/card/Card";
import {Competition} from "@/app/models/Competition";
import {User} from "@/app/models/User";
import {UserScore} from "@/app/models/UserScore";
import {GetUserScores} from "@/app/services/CompetitionService";
import Link from "next/link";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function Leaderboard({comp}: {comp: Competition | undefined}) {

  const [userScores, setUserScores] = useState<UserScore[]>([]);
  useEffect(() => {
    if (!comp?.joinedUsers) return;
    setUserScores(comp?.joinedUsers);


  }, [comp])


  const orderedScores = userScores.sort((a, b) => b.score - a.score).slice(0, 10);
  return (
    <div className="col-3 text-center mt-5 fs-2">
      <div className="d-flex flex-column align-items-center">
        <div className="fw-bold fs-3 text-white mb-4">Leaderboard</div>
        <div className="w-75">
          <Card>
            <div className="card-body d-flex flex-column align-items-start">
              {Array.from({length: 10}, (value, index) => index).map((index) => {
                const name = orderedScores.length > index ? orderedScores[index].userName : "";
                const score = orderedScores.length > index ? orderedScores[index].score : "";
                return (
                  <div className=" d-flex flex-row w-100">
                    <div key={index} className="card-title fs-4 text-white text-break text-start">
                      {index + 1}. {name}
                    </div>
                    <div className="flex-grow-1"> </div>
                    <div className="fs-5 text-white"> {score}</div>
                  </div>)

              })}
            </div>
            <Link className="fs-5 btn btn-green m-2 text-decoration-none" href={`/pages/competitionDetail/${comp?.id}/users`}>All Users</Link>
          </Card>
        </div>
      </div>
    </div>
  );

}
