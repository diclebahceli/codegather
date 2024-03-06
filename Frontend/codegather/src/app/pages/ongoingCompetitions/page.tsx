import CompetitionCard from "@/app/components/competition_card/CompetitionCard";
import { GetAllCompetitions } from "@/app/services/CompetitionService";

export default async function OngoingCompetitions() {
    const competitions =  await GetAllCompetitions();
    return (
        <div className="h-100 bg-background" style={{backgroundAttachment: 'fixed'}}>
            <h1 className="pt-5 container" style={{fontSize: "5rem"}}>ONGOING COMPETITIONS</h1>
            <div className="d-flex flex-row justify-content-evenly">
                <div className="mt-5 ms-5 ps-5 d-flex flex-wrap  col-7">
                    {competitions.map((competition, index) => (
                        <CompetitionCard key={competition.id || index} competition={competition} />
                    ))}
                </div>
                <div className="col-3 text-center mt-5 fs-2"> Disclaimer</div>
            </div>

        </div>
    );
}