import Card from "@/app/components/card/Card";
import {Competition} from "@/app/models/Competition";
import {User} from "@/app/models/User";

export default function Leaderboard({users, comp}: {users: User[], comp: Competition | undefined}) {
  return (
    <div className="col-3 text-center mt-5 fs-2">
      <div className="d-flex flex-column align-items-center">
        <div className="fw-bold fs-3 text-white">Leaderboard</div>
        <div className="w-75">
          <Card>
            <div className="card-body d-flex flex-column align-items-start">
              {users.map((user, index) => (
                <div className=" d-flex flex-row">
                  <div key={user.id || index} className="card-title fs-4 text-white"> {index + 1}. {user.userName}</div>
                  <div> </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

}
