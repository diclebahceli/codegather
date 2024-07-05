"use client";
import { User } from "@/app/models/User";
import {
  GetUserRoles,
  SetUserRole,
  GetUserById,
  UpdateUser,
} from "@/app/services/UserService";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button, ButtonGroup } from "reactstrap";

const EditUserPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<User>({} as User);
  const [cSelected, setCSelected] = useState<string[]>([]);

  const onCheckboxBtnClick = (selected: string) => {
    const index = cSelected.indexOf(selected);
    if (index < 0) {
      // Avoid directly mutating state
      setCSelected((prevState) => [...prevState, selected]);
    } else {
      setCSelected((prevState) =>
        prevState.filter((item) => item !== selected)
      );
    }
  };

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

        setUserData((prevUserInfo) => ({
          ...prevUserInfo,
          profileImage: base64String || '', // Assign the base64 string to profileImage
        }));
      }

      reader.readAsDataURL(file);
    };
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
   console.log(name, value);
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }; 

  useEffect(() => {
    const fetchRoles = async (userId: string) => {
      try {
        const result = await GetUserRoles(userId);
        setCSelected(result.data as string[]);
        if (result.error || !result.data) {
          toast.error(result.error);
          return;
        }
      } catch (error: Error | any) {
        toast.error("Error fetching roles");
      }
    };

    const fetchUser = async (userId: string) => {
      try {
        const user = await GetUserById(userId);
        if (user.error || !user.data) {
          toast.error(user.error);
          return;
        }
        setUserData(user.data as User);
      } catch (error: Error | any) {
        toast.error("Error fetching user");
      }
    };

    fetchUser(params.id);
    fetchRoles(params.id);
  }, []);

  const handleSubmit = async (formData: FormData) => {
    const userInfo: User = {
      id: userData.id,
      userName: formData.get("userName") as string,
      email: formData.get("email") as string,
      profileImage: userData.profileImage,
      score: userData.score,
    };
    const roles = await SetUserRole(userData.id, cSelected);
    if (roles.error) {
      toast.error(roles.error);
      return;
    }
    console.log(roles);
    const response = await UpdateUser(userInfo);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("User updated successfully");
    setTimeout(() => {
      router.push("/pages/admin/user");
    }, 1000);
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 bg-dark">
      <form action={handleSubmit} className="col-6">
        <div className="container">
          <h1 className="text-white">Edit User</h1>

          <div className="form-group my-3">
            <input
              className="form-control border border-2"
              type="text"
              name="userName"
              placeholder="userName"
              required={true}
              value={userData.userName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group my-3">
            <input
              className="form-control border border-2"
              type="text"
              name="email"
              placeholder="email"
              required={true}
              value={userData.email}
              onChange={handleInputChange}
            />
          </div>
            <div className="form-group my-3">
              <label htmlFor="filePicker" className="text-white">Profile Picture</label>
              <input type="file" name="filePicker" className="form-control" onChange={handleFileChange}></input>
              <small className="text-white">At most 1MB</small>
            </div>
          <div>
            <h5 className="text-white">User Roles</h5>
            <ButtonGroup>
              <Button
                color="primary"
                outline
                onClick={() => onCheckboxBtnClick("Admin")}
                active={cSelected.includes("Admin")}
              >
                Admin
              </Button>
              <Button
                color="primary"
                outline
                onClick={() => onCheckboxBtnClick("Manager")}
                active={cSelected.includes("Manager")}
              >
                Manager
              </Button>
              <Button
                color="primary"
                outline
                onClick={() => onCheckboxBtnClick("User")}
                active={cSelected.includes("User")}
              >
                User
              </Button>
            </ButtonGroup>

            <p className="text-white">Selected: {JSON.stringify(cSelected)}</p>
          </div>
          <button className="btn btn-primary mt-3 text-white">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPage;
