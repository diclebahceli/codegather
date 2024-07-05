"use client";
import CompetitionList from "@/app/components/competition_list/CompetitionList";
import {Competition} from "@/app/models/Competition";
import {User} from "@/app/models/User";
import {GetUserByUserName} from "@/app/services/UserService";
import {getWithExpiry} from "@/app/utils/StorageGetter";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function Profile({params}: {params: {name: string}}) {
  const [userInfo, setUserInfo] = useState<User>();
  const router = useRouter();
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [isMe, setIsMe] = useState<boolean>(false);

  useEffect(() => {
    const fethUser = async () => {
      const result = await GetUserByUserName(params.name);
      if (result.error || !result.data) {
        router.replace("/");
        return;
      }
      const id = result.data.id;
      if (getWithExpiry("userId") == id) {
        setIsMe(true);
      }
      let user = result.data;
      setUserInfo(user);
    };

    const fetchJoinedCompetitions = async () => {
      const result = await GetUserByUserName(params.name);
      if (result.error || !result.data) {
        toast.error(result.error);
        return;
      }
      let competition = result.data.competitions;
      if (competition === undefined) return;
      setCompetitions(competition);
    };

    fethUser();
    fetchJoinedCompetitions();
  }, []);

  function handleEdit() {
    router.push(`/pages/editProfile`);
  }

  return (
    <div className="h-100 bg-black bg-gradient">
      <div className="d-flex flex-column">
        <div className="d-flex flex-row align-items-center mt-5">
          <div className="col-1"></div>
          <h1 className="container mx-0 text-white fs-m ">Profile</h1>
          {isMe && <button onClick={handleEdit} className="btn btn-green  fs-3">Edit</button>}
          <div className="col-2"></div>
        </div>
        <div className="d-flex flex-row justify-content-around w-100 mt-5 pt-5">
          <div className="d-flex flex-column col-4">
            <div className="text-center ">
              <div>
                <CompetitionList
                  competitions={competitions}
                  title="Joined Competitions"
                />
              </div>
            </div>
          </div>

          <div className="d-flex flex-column  align-items-center mb-4 col-5">
            {userInfo ? (
              <>
                <div className="d-flex flex-row align-items-center">
                  <h1 className="text-white me-5 mt-3 fs-m text-wrap text-break">
                    {userInfo.userName}
                  </h1>
                  <div className="position-relative">
                    <Image
                      src={`data:image/png;base64,${userInfo.profileImage}`}
                      alt="user"
                      width={250}
                      height={250}
                      className="rounded-circle overflow-hidden bg-green"
                    />
                  </div>

                </div>
                <h3 className="text-white mt-5 fs-1">Code Score: {userInfo.score.toFixed(0)}</h3>
              </>
            ) : (
              <div className="spinner-border text-white"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
