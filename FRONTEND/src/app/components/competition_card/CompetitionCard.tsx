"use client";
import { Competition } from "@/app/models/Competition";
import Card from "../card/Card";
import { useRouter } from "next/navigation";

export default function CompetitionCard({
  competition,
}: {
  competition: Competition;
}) {
  const router = useRouter();

  const handleDetailsClick = () => {
    //add the competition id to the route
    router.push(`/pages/competitionDetail/${competition.id}`);
  };

  return (
    <div className=" col-md-4 col-sm-6 m-3">
      <Card>
        <div className="card-body d-flex flex-column bg-grey rounded rounded-3">
          <div className="card-title fw-bold fs-4 text-white">
            {competition.title}
          </div>
          <div className="card-text mb-3 fs-5 text-wrap text-white">
            {competition.description}
          </div>
          <button
            onClick={handleDetailsClick}
            className="btn btn-green mt-2 ms-auto mt-auto stretched-link"
          >
            Details
          </button>
        </div>
      </Card>
    </div>
  );
}
