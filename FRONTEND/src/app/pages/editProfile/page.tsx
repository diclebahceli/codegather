"use client";
import {AuthContext, AuthContextType} from "@/app/contexts/AuthContext";
import {User} from "@/app/models/User";
import {UpdateUser} from "@/app/services/UserService";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function Page() {

  const [userInfo, setUserInfo] = useState<User>({email: "", id: "", userName: "", profileImage: "", score: 0});


  const context = useContext(AuthContext) as AuthContextType;
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      const maxSize = 1024 * 1024; // 1 MB in bytes

      // Check if the file size exceeds the limit
      if (file.size > maxSize) {
        event.target.value = '';
        toast.error('File size exceeds the limit of 1 MB');
        return;
      }

      reader.onload = () => {
        const base64String = reader.result?.toString().split(',')[1]; // Extract the base64 string part

        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          profileImage: base64String || '', // Assign the base64 string to profileImage
        }));
      }

      reader.readAsDataURL(file);
    };
  }

  useEffect(() => {
    const user = context.user
    setUserInfo(user);
  }, [context.user]);

  const handleSave = async (e: any) => {
    try {
      const res = await UpdateUser(userInfo)
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
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handeCancel = () => {
    router.replace(`/pages/profile/${context.user.userName}`);
  }

  return (
    <div className="d-flex justify-content-center align-items-center h-100 bg-dark">
      <div className="d-flex flex-column col-4">
        <form>
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
            <div className="form-group my-3">
              <label htmlFor="filePicker" className="text-white">Profile Picture</label>
              <input type="file" name="filePicker" className="form-control" onChange={handleFileChange}></input>
              <small className="text-white">At most 1MB</small>
            </div>
          </div>
        </form>
        <div>
          <button className="btn btn-primary mt-3 text-white" onClick={handleSave}>Save</button>
          <button className="btn btn-danger mt-3 text-white mx-3" onClick={handeCancel}>Cancel</button>
        </div>

      </div>
      <div className="col-1"> </div>
      <div className="position-relative" style={{height: "15rem", width: "15rem"}}>
        {userInfo.profileImage && (
          <Image
            src={`data:image/jpeg;base64,${userInfo.profileImage}`}
            layout="fill"
            objectFit="cover"
            alt="Profile Image"
            className="rounded-circle bg-green border border-2 border-green"
          />

        )}

      </div>
    </div>

  )

}

