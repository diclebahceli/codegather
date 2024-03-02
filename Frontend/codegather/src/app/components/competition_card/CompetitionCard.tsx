import { Competition } from "@/app/models/Competition";
import Card from "../card/Card";

const CompetitionCard = ({ competition }: { competition: Competition }) => {
    return (
        <div className=" col-md-4 col-sm-6 m-3 " >
            <Card >
                <div className="card-body d-flex flex-column">
                    <div className="card-title fw-bold fs-4"> {competition.name}</div>
                    <div className="card-text mb-3 fs-5 text-wrap"> {competition.description}</div>
                    <a href="#" className="btn btn-theme-color mt-2 ms-auto">Join</a>

                </div>
            </Card>
        </div>
    );
}
export default CompetitionCard;