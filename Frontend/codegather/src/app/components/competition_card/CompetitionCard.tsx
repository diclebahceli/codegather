import { Competition } from "@/app/models/Competition";
import Card from "../card/Card";

const CompetitionCard = ({ competition }: { competition: Competition }) => {
    return (
        <div className=" col-md-4 col-sm-6 m-3  border border-theme-color border-3 rounded " >
            <Card >
                <div className="card-body d-flex flex-column bg-theme-dark ">
                    <div className="card-title fw-bold fs-4 text-theme-light"> {competition.name}</div>
                    <div className="card-text mb-3 fs-5 text-wrap text-theme-light"> {competition.description}</div>
                    <a href="#" className="btn btn-theme-color mt-2 ms-auto">Details</a>

                </div>
            </Card>
        </div>
    );
}
export default CompetitionCard;