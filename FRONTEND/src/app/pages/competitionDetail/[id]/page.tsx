import Card from "@/app/components/card/Card";
import QuestionCard from "@/app/components/question_card/QuestionCard";
import { GetCompetitionById } from "@/app/services/CompetitionService";
import { GetQuestionsByCompetitionId } from "@/app/services/QuestionService";

export default async function CompetitionDetail({ params }: { params: { id: number } }) {
    var competition = await GetCompetitionById(params.id);
    const questions = await GetQuestionsByCompetitionId(params.id);
    return (
        <div className="h-100 bg-dark">
            <h1 className="pt-5 container" style={{ fontSize: "3rem" }}>{competition?.name}</h1>

            <div className="d-flex flex-row justify-content-around">
                <div className="mt-5 d-flex flex-column col-3 align-self-center">
                    {questions.map((question, index) => (
                        <QuestionCard key={question.id || index} question={question}/>
                    ))}
                </div>
                <div className="col-3 text-center mt-5 fs-2">
                    <div className="d-flex flex-column align-items-center">
                        <div className="fw-bold fs-3">Leaderboard</div>
                        <div className="w-75">
                            <Card>
                                <div className="card-body d-flex flex-column bg-grey">
                                    <div className="card-title fs-4 text-white"> 1. John Doe</div>
                                    <div className="card-title fs-4 text-white"> 2. Mark Ellen</div>
                                    <div className="card-title fs-4 text-white"> 3. Peter Parker</div>
                                    <div className="card-title fs-4 text-white"> 4. Jack Stone </div>
                                </div>
                            </Card>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
