import { Competition } from "@/app/models/Competition";
import Card from "../card/Card";
import { useRouter } from 'next/navigation';

const CompetitionCard = ({ competition }: { competition: Competition }) => {
    const router = useRouter();

    const handleDetailsClick = () => {
        //add the competition id to the route
        router.push(`competitionDetail/${competition.id}`,   ); 
    };

    return (
        <div className=" col-md-4 col-sm-6 m-3  border border-orange border-3 rounded " >
            <Card >
                <div className="card-body d-flex flex-column bg-white ">
                    <div className="card-title fw-bold fs-4 text-background"> {competition.name}</div>
                    <div className="card-text mb-3 fs-5 text-wrap text-background"> {competition.description}</div>
                    <button onClick={handleDetailsClick} className="btn btn-orange mt-2 ms-auto">Details</button>

                </div>
            </Card>
        </div>
    );
}
export default CompetitionCard;