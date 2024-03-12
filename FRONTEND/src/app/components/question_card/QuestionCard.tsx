"use client";
import { Question } from "@/app/models/Question";
import Card from "../card/Card";
import { useRouter } from "next/navigation";

export default function QuestionCard({ question }: { question: Question }) {

    const router = useRouter();

    const handleDetailsClick = () => {
        //add the competition id to the route
        router.push(`/pages/question/${question.id}`,);
    };
    return (
        <div className="col-6 m-3 p-2">
            <Card>
                <div className="card-body d-flex flex-row bg-grey ">
                    <div className="card-title fw-bold fs-4 text-white"> {question.name}</div>
                    <button onClick={handleDetailsClick} className="btn btn-darker  ms-auto">Solve</button>
                </div>
            </Card>
        </div>
    );
}