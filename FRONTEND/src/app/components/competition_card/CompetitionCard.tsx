"use client";
import {Competition} from "@/app/models/Competition";
import Card from "../card/Card";
import {useRouter} from "next/navigation";
import {use, useEffect, useState} from "react";
import {GetAllCompetitions} from "@/app/services/CompetitionService";
import {JoinCompetition, getUserById} from "@/app/services/UserService";
import {getWithExpiry} from "@/app/utils/StorageGetter";
import toast from "react-hot-toast";

export default function CompetitionCard({
  competition,
}: {
  competition: Competition;
}) {
  const router = useRouter();
  const [joinedCompetitions, setJoinedCompetitions] = useState<Competition[]>(
    []
  );

  const handleDetailsClick = () => {
    //add the competition id to the route

    router.push(`/pages/competitionDetail/${competition.id}`);
  };

  useEffect(() => {
    const SwitchText = async () => {
      const userId = getWithExpiry("userId");
      if (userId) {
        const result = await getUserById(userId);
        const userComp = result.data?.competitions;
        if (userComp) {
          setJoinedCompetitions(userComp);
        }
      }
    };
    SwitchText();
  }, []);

  const handle = () => {
    handleJoin(competition.id);
  };

  const handleJoin = async (compId: string) => {
    const userId = getWithExpiry("userId");
    if (userId) {
      const result = await JoinCompetition(userId, compId);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("You have joined the competition");
      const user = await getUserById(userId);
      if (user.data?.competitions) {
        setJoinedCompetitions(user.data?.competitions);
      }
    };
  }

  return (
    <div className=" col-md-4 col-sm-6 m-3">
      <Card>
        <div className="card-body d-flex flex-column bg-grey rounded rounded-3">
          <div className="card-title fw-bold fs-4 text-white">
            {competition.title}
          </div>
          <div className="card-text mb-3 fs-5 text-wrap text-white">
            {competition.description}
          </div>
          {joinedCompetitions.find((c) => c.id === competition.id) ? (
            <button className="btn btn-primary" onClick={handleDetailsClick}>
              Details
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handle}>
              Join
            </button>
          )}
        </div>
      </Card>
    </div>
  );

}

