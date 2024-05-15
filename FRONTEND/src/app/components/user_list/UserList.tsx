import { Competition } from "@/app/models/Competition";
import { UserDto } from "@/app/models/UserDto";

export default function UserList({
  users,
  title,
}: {
  users: UserDto[];
  title: string;
}) {
  return (
    <div className="d-flex flex-column justify-content-center bg-dark">
      <h3 className="text-white ">{title}</h3>
      <hr className="mb-4 border border-1 border-green opacity-100" />

      {users.map((user, index) => (
        <div
          className="card h-100 w-100 rounded rounded-3 bg-grey text-white border-2 border-green my-2 py-2 px-3 fs-4 "
          key={user.id || index}
        >
          {user.userName}
        </div>
      ))}
    </div>
  );
}
