"use client"
import CompetitionCard from "@/app/components/competition_card/CompetitionCard";
import { Competition } from "@/app/models/Competition";
import { getAllCompetitions } from "@/app/services/CompetitionService";
import { useState } from "react";

const ongoingCompetitions = () => {
    const [competitions, setCompetitions] = useState<Competition[]>(getAllCompetitions);
    return (
        <div className="vh-100">
            <h1 className="fs-1 mt-5 container">ONGOING COMPETITIONS</h1>
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
export default ongoingCompetitions;