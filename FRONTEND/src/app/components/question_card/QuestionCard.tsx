import { Question } from "@/app/models/Question";
import Card from "../card/Card";

export default function QuestionCard({ question }: { question: Question }) {
    return (
        <div className="col-6 m-3">
            <Card>
                <div className="card-body d-flex flex-row bg-white  h-100">
                    <div className="card-title fw-bold fs-4 text-background"> {question.name}</div>
                    <button className="btn btn-orange  ms-auto">Solve</button>
                </div>
            </Card>
        </div>
    );
}