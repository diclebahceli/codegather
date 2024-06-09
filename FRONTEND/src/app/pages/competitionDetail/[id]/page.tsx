"use client";
import QuestionCard from "@/app/components/question_card/QuestionCard";
import {Competition, DefaultCompetition} from "@/app/models/Competition";
import {GetCompetitionById} from "@/app/services/CompetitionService";
import {getWithExpiry} from "@/app/utils/StorageGetter";
import {useRouter} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import Leaderboard from "../components/Leaderboard";
import {JoinCompetition, GetUserById} from "@/app/services/UserService";
import toast from "react-hot-toast";
import {AuthContext, AuthContextType} from "@/app/contexts/AuthContext";

export default function Page({params}: {params: {id: string}}) {

  const [competition, setCompetition] = useState<Competition>(DefaultCompetition);
  const router = useRouter();

  const [joinedCompetitions, setJoinedCompetitions] = useState<Competition[]>(
    []
  );

  const context = useContext(AuthContext) as AuthContextType;


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
          setCompetition(result.data);
        }
      }
    }
    fetchdata();

    const fetchUserComps = async () => {
      const userId = getWithExpiry("userId");
      if (userId) {
        const result = await GetUserById(userId);
        if (result.error || !result.data) {
          toast.error(result.error);
          return;
        }
        const userComp = result.data.competitions;
        if (userComp) {
          setJoinedCompetitions(userComp);
        }
      }
    };
    fetchUserComps();

  }, []);


  const handleJoin = async (compId: string) => {
    const userId = getWithExpiry("userId");
    if (userId) {
      const result = await JoinCompetition(userId, compId);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("You have joined the competition");
      joinedCompetitions.push(competition);
      context.setTheUser({...context.user, competitions: joinedCompetitions});
    }
  };


  const userJoined = joinedCompetitions.some((comp) => comp.id === competition?.id);

  return (
    <div className="h-100 bg-dark">
      <div className="w-100 bg-green p-3">
        <div className="container d-flex flex-column">
          <h1 className="fs-l text-white">{competition?.title}</h1>
          <div className="fs-4 my-4 text-white w-75">{competition?.description}</div>
          {userJoined ? (
            <div className="btn disabled btn-dark align-self-end text-white fs-3">Joined</div>
          ) : (
            <button onClick={() => handleJoin(competition.id)} className="btn btn-dark align-self-end text-white fs-3">Join</button>
          )}
        </div>
      </div>

      <div className="d-flex flex-row justify-content-around">
        <div className="mt-5 d-flex flex-column col-3 align-self-center">
          <h1 className="text-white">Questions</h1>
          {competition?.questions?.map((question, index) => (
            <QuestionCard key={question.id || index} question={question} canSolve={userJoined} />
          ))}
        </div>
        <Leaderboard users={competition?.joinedUsers || []} comp={competition}></Leaderboard>

      </div>
    </div>
  );
};
