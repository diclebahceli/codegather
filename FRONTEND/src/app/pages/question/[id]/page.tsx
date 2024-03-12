import { GetQuestionById } from "@/app/services/QuestionService";

export default async function QuestionPage({ params }: { params: { id: number } }) {
    const question = await GetQuestionById(params.id);
    return (
        <div className="h-100 bg-theme-background" style={{ backgroundAttachment: 'fixed' }}>
        </div>
    );
};
