import { GetCompetitionById } from "@/app/services/CompetitionService";

export default async function CompetitionDetail ({ params }: { params: { id: number } }) {
    var competition = await GetCompetitionById(params.id);
  return (
    <div className="h-100 bg-theme-background" style={{ backgroundAttachment: 'fixed' }}>
      <h1 className="fs-1 pt-5 container">{competition?.name}</h1>
      <h1>SELAMUN ALY</h1>
    </div>
  );
};
