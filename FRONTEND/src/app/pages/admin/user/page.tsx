"use client";
import { User } from "@/app/models/User";
import { DeleteUser, GetAllUsers } from "@/app/services/UserService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const UserPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pickedId, setPickedId] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await GetAllUsers();
        if (response.error || !response.data) {
          toast.error(response.error);
          return;
        }
        const users = response.data as User[];
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleModal = (e: any) => {
    setPickedId(e as string);
    setShow(!show);
  };

  const handleDeleteUser = async () => {
    const response = await DeleteUser(pickedId);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("User deleted successfully");
    setUsers(users.filter((user) => user.id !== pickedId));
    setShow(!show);
  };

  const handleEditUser = (userId: string) => {
    router.push(`/pages/admin/user/editUsers/${userId}`);
  };

  return (
    <div className="d-flex flex-column  align-items-center bg-dark h-100">
      <div className="container mt-5">
        <h1 className="text-white mb-5">Users</h1>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th className="col-2">Id</th>
              <th className="col-2">Full Name</th>
              <th className="col-2">Email</th>
              <th className="col-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-primary m-2 text-white"
                    onClick={() => handleEditUser(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger text-white"
                    onClick={() => handleModal(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal isOpen={show}>
          <ModalHeader>Delete User</ModalHeader>
          <ModalBody>Are you sure you want to delete this user?</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={handleDeleteUser}>
              Delete
            </Button>
            <Button color="secondary" onClick={handleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default UserPage;
