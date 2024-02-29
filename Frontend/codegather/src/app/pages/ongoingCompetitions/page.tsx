import CompetitionCard from "@/app/components/competition_card/CompetitionCard";
const ongoingCompetitions = () => {
    return (
        <div className="container vh-100">
            <CompetitionCard competition={{ name: "Competition 1"
            , description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed blandit libero. Sed mollis ante non velit sollicitudin ornare. Pellentesque.", endDate: "Tomorrow", startDate: "Today", id: 1, imageUrl: "test"  }} />

        </div>
    );
}
export default ongoingCompetitions;