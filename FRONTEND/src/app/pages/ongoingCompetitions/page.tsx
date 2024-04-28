import CompetitionCard from "@/app/components/competition_card/CompetitionCard";
import Protected from "@/app/components/protected/Protected";
import {Competition} from "@/app/models/Competition";
import {getAllCompetitions} from "@/app/services/CompetitionService";
import toast from "react-hot-toast";

export default async function OngoingCompetitions() {
  let competitions: Competition[] = []

  const result = await getAllCompetitions();
  if (result.error) {
    // toast.error(result.error);
  } else {
    if (result.data) {
      competitions = result.data
    }
  }



  return (
    <div className="h-100 bg-dark">
      <h1 className="pt-5 container text-white fs-m mb-3">
        ONGOING COMPETITIONS
      </h1>
      <div className="d-flex flex-row">
      <div className="col-sm-0 col-md-1"></div>
        {competitions.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center col-7">
          <div className="text-white fs-3"> No Competitions Yet 👻</div>
        </div>
        ) : (
          <div className="mt-5 ms-5 d-flex flex-wrap col-7">
            {competitions.map((competition, index) => (
              <CompetitionCard
                key={competition.id || index}
                competition={competition}
              />
            ))}
          </div>
        )}
        <div className="flex-grow-1"></div>
        <div className="col-3 text-center mt-5 fs-2 text-white"> Disclaimer</div>
      </div>
      </div>
  );
}
