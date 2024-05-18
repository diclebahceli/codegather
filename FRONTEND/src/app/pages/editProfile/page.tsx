"use client";
import {AuthContext, AuthContextType} from "@/app/contexts/AuthContext";
import {UserDto} from "@/app/models/UserDto";
import {updateUser} from "@/app/services/UserService";
import {useRouter} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function Page() {

  const [userInfo, setUserInfo] = useState<UserDto>({email: "", id: "", userName: ""});

  const context = useContext(AuthContext) as AuthContextType;
  const router = useRouter();

  useEffect(() => {
    const user = context.user
    setUserInfo(user);
  }, [context.user]);

  const handleSubmit = async (e: any) => {
    try {
      const res = await updateUser(userInfo)
      if (res.error) {
        toast.error(res.error);
        return
      }
      toast.success("Updated successfully!");
      context.setTheUser(userInfo);
      router.push(`/pages/profile/${userInfo.userName}`);

    } catch (e: Error | any) {
      toast.error(e.message);
    }
  }

  function handleInputChange(e: any) {
    const {name, value} = e.target;
    console.log(name, value);
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className="d-flex justify-content-center align-items-center h-100 bg-dark">
      <form action={handleSubmit} className="col-6">
        <div className="container">
          <h1 className="text-white">Edit User</h1>

          <div className="form-group my-3">
            <label className="text-white" htmlFor="userName">Username</label>
            <input
              className="form-control border border-2"
              type="text"
              name="userName"
              placeholder="username"
              required={true}
              value={userInfo.userName}
              onChange={handleInputChange}
            />
          </div>
          <button className="btn btn-green mt-3 text-dark">Save</button>
        </div>
      </form>
    </div>
  )

}
