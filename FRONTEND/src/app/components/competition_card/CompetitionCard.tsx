"use client";
import {Competition} from "@/app/models/Competition";
import Card from "../card/Card";
import {useRouter} from "next/navigation";

export default function CompetitionCard({
  competition,
}: {
  competition: Competition;
}) {
  const router = useRouter();

  const handleDetailsClick = () => {
    router.push(`/pages/competitionDetail/${competition.id}`);
  };

  return (
    <div className="col-md-4 col-12 m-sm-3 my-3">
      <Card>
        <div className="card-body d-flex flex-column bg-grey rounded rounded-3">
          <div className="card-title fw-bold fs-4 text-white">
            {competition.title}
          </div>
          <div
            className="card-text mb-3 fs-5 text-wrap text-truncate text-white overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: "2",
              lineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {competition.description}
          </div>
          <button
            className="btn btn-green  ms-auto mt-auto"
            onClick={handleDetailsClick}
          >
            Details
          </button>
        </div>
      </Card>
    </div>
  );
}
