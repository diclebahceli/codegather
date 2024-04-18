"use client";
import Card from "@/app/components/card/Card";
import {UserDto} from "@/app/models/UserDto";
import {getUserById} from "@/app/services/UserService";
import {getWithExpiry} from "@/app/utils/StorageGetter";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function Profile({params}: {params: {id: string}}) {
  const [userInfo, setUserInfo] = useState<UserDto>();
  const router = useRouter();

  useEffect(() => {
    const fethUser = async () => {
      const result = await getUserById(params.id);
      if (result.error || !result.data) {
        router.replace("/");
        return;
      }
      let user = result.data;

      setUserInfo(user);
    }

    fethUser();

  }, []);

  return (

    <div>
      <div className="position-fixed h-100 w-100 bg-dark">
        <div className="position-fixed bottom-0 start-50 translate-middle-x text-center h-75 w-75 ">
          {userInfo === undefined ?
            <div className="d-flex justify-content-center align-items-center ">
              <div className="spinner-border text-white"></div>
            </div> :
            <Card >
              {userInfo.id === getWithExpiry("userId") && <button className="btn btn-green position-fixed top-0 end-0 m-3 fs-4">Edit</button>}
              <Image
                className=" rounded rounded-circle bg-green position-fixed start-50 translate-middle"
                src="/profile.png"
                width={180}
                height={180}
                alt=""
              />
              <div className="d-flex flex-column justify-content-around h-100">
                <div className=" text-white">
                  <h1>{userInfo.userName}</h1>
                  <h1>{userInfo.email}</h1>
                  <h1>{userInfo.id}</h1>
                </div>

                <div className="d-flex flex-row">
                  {}
                </div>
              </div>
            </Card>
          }
        </div>
      </div>
    </div>
  );
}
