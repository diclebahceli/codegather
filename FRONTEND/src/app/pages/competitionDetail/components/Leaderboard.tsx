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
    const fetchScores = async (compId: string) => {
      try {
        var result = await GetUserScores(compId);
        if (result.error || !result.data) {
          toast.error(result.error);
          return;
        }

        setUserScores(result.data);

      } catch (e: Error | any) {
        toast.error(e);
      }
    }

    if (comp != undefined && comp?.id) {
      fetchScores(comp.id);
    }
  }, [comp])


  const orderedScores = userScores.sort((a, b) => b.score - a.score).slice(0, 10);
  return (
    <div className="col-3 text-center mt-5 fs-2">
      <div className="d-flex flex-column align-items-center">
        <div className="fw-bold fs-3 text-white">Leaderboard</div>
        <div className="w-75">
          <Card>
            <div className="card-body d-flex flex-column align-items-start">
              {orderedScores.map((user, index) => (
                <div className=" d-flex flex-row w-100">
                  <div key={index} className="card-title fs-4 text-white text-break text-start"> {index + 1}. {user.userName}</div>
                  <div className="flex-grow-1"> </div>
                  <div className="fs-5 text-white"> {user.score}</div>
                </div>
              ))}
            </div>
            <Link className="fs-5 text-decoration-none" href={`/pages/competitionDetail/${comp?.id}/users`}>All Users</Link>
          </Card>
        </div>
      </div>
    </div>
  );

}
