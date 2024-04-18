import {Competition} from "@/app/models/Competition";
import Link from "next/link";

export default function CompetitionSlot({competition}: {competition: Competition}) {
  return (
    <div className="card h-100 w-100 rounded rounded-3 bg-dark border-2 border-green">
      <div>
        <Link href={`/pages/competitionDetail/${competition.id}`}>{competition.title}</Link>
      </div>
    </div>
  );
}
