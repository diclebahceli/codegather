"use client";
import { Competition } from "@/app/models/Competition";
import Card from "../card/Card";
import { useRouter } from 'next/navigation';

export default function CompetitionCard({ competition }: { competition: Competition }) {
    const router = useRouter();

    const handleDetailsClick = () => {
        //add the competition id to the route
        router.push(`/pages/competitionDetail/${competition.id}`,);
    };

    return (
        <div className=" col-md-4 col-sm-6 m-3" >
            <Card>
                <div className="card-body d-flex flex-column bg-grey ">
                    <div className="card-title fw-bold fs-4 text-white"> {competition.name}</div>
                    <div className="card-text mb-3 fs-5 text-wrap text-white"> {competition.description}</div>
                    <button onClick={handleDetailsClick} className="btn btn-darker mt-2 ms-auto">Details</button>

                </div>
            </Card>
        </div>
    );
}