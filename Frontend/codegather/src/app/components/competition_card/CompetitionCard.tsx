import { Competition } from "@/app/models/Competition";
import Card from "../card/Card";

const CompetitionCard = ({ competition }: { competition: Competition }) => {
    return (
        <div className="col-4 ">
            <Card>
                <div className="card-body d-flex flex-column">
                    <div className="card-title fw-bold"> {competition.name}</div>
                    <div className="card-text"> {competition.description}</div>
                    <a href="#" className="btn btn-theme-color mt-2 ms-auto">Join</a>

                </div>
            </Card>
        </div>
    );
}
export default CompetitionCard;