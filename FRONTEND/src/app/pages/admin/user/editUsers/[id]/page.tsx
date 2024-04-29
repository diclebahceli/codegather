"use client";
import { UserDto } from "@/app/models/UserDto";
import {
  GetUserRoles,
  SetUserRole,
  getUserById,
  updateUser,
} from "@/app/services/UserService";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button, ButtonGroup } from "reactstrap";

const EditUserPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserDto>({} as UserDto);
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
        const user = await getUserById(userId);
        if (user.error || !user.data) {
          toast.error(user.error);
          return;
        }
        setUserData(user.data as UserDto);
      } catch (error: Error | any) {
        toast.error("Error fetching user");
      }
    };

    fetchUser(params.id);
    fetchRoles(params.id);
  }, []);

  const handleSubmit = async (formData: FormData) => {
    const userInfo: UserDto = {
      id: userData.id,
      userName: formData.get("userName") as string,
      email: formData.get("email") as string,
    };
    const roles = await SetUserRole(userData.id, cSelected);
    if (roles.error) {
      toast.error(roles.error);
      return;
    }
    console.log(roles);
    const response = await updateUser(userInfo);

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
    <div className="d-flex justify-content-center align-items-center h-100">
      <form action={handleSubmit} className="col-6">
        <div className="container">
          <h1>Edit User</h1>

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
          <div>
            <h5>Checkbox Buttons</h5>
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
            <p>Selected: {JSON.stringify(cSelected)}</p>
          </div>
          <button className="btn btn-primary mt-3 text-white">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPage;
