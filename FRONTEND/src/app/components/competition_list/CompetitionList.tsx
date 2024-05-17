import { Competition } from "@/app/models/Competition";
import Card from "../card/Card";

export default function CompetitionList({
  competitions,
  title,
}: {
  competitions: Competition[];
  title: string;
}) {
  return (
    <div className="d-flex flex-column justify-content-center">
      <h3 className="text-white ">{title}</h3>
      <hr className="mb-4 border border-1 border-green opacity-100" />

      {competitions.map((competition, index) => (
        <div
          className="card h-100 w-100 rounded rounded-3 bg-grey text-white border-2 border-green my-2 py-2 px-3 fs-4 "
          key={competition.id || index}
        >
          {competition.title}
        </div>
      ))}
    </div>
  );
}
