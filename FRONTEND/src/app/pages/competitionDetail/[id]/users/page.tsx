"use client";
import Paginator from "@/app/components/paginator/Paginator";
import {Competition, DefaultCompetition} from "@/app/models/Competition";
import {UserScore} from "@/app/models/UserScore";
import {GetCompetitionById} from "@/app/services/CompetitionService";
import {Poppins} from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

export default function Page({params}: {params: {id: string}}) {
  const [competition, setCompetition] = useState<Competition>(DefaultCompetition);
  const [currentUsers, setCurrentUsers] = useState<UserScore[]>([]);


  useEffect(() => {
    const fetchUsers = async () => {
      const result = await GetCompetitionById(params.id);
      if (result.error || !result.data) {
        toast.error(result.error);
        return;
      }
      setCompetition(result.data);

      setCurrentUsers(result.data.joinedUsers || []);
    };

    fetchUsers();

  }, [])

  const users = competition.joinedUsers || [];


  return (
    <div className="h-100 bg-dark">
      <div className="container h-100 pt-5 d-flex flex-column">
        <h1 className={`text-white ${poppins.className}`}>
          Users joined in <span className="fst-italic"> {competition.title}</span>
        </h1>
        <hr className="border border-2 border-green" />

        <div className="d-flex flex-row flex-wrap justify-content-start">
          {currentUsers?.map((user, index) => {
            return (
              <Link href={`/pages/profile/${user.userName}`} className="text-decoration-none col-12 col-md-6 col-lg-4" key={index}>
                <div className="card m-3 bg-grey text-white" >
                  <div className="card-body d-flex flex-row align-items-center">
                  <div className="d-flex flex-column">
                    <h5 className="card-title text-start text-break">{user.userName}</h5>
                    <h5 className="card-title text-start text-break">Score: {user.score}</h5>

                  </div>
                    <Image
                      src={`data:image/png;base64,${user.profileImage}`}
                      alt="profile picture"
                      width={100}
                      height={100}
                      className="rounded-circle overflow-hidden bg-green ms-auto"
                    />
                  </div>
                </div>
              </Link>

            )
          })}


        </div>
        <Paginator data={users} handlePageChange={(data) => {setCurrentUsers(data)}} pageSize={12}></Paginator>

      </div>

    </div >


  )
}
