import CompetitionCard from "@/app/components/competition_card/CompetitionCard";
const ongoingCompetitions = () => {
    return (
        <div className="vh-100">
            <h1 className="fs-1 mt-5 container">ONGOING COMPETITIONS</h1>
            <div className="d-flex flex-row justify-content-evenly">
                <div className="mt-5 ms-5 ps-5 d-flex flex-wrap  col-7">
                    <CompetitionCard competition={{
                        name: "Competition 1"
                        , description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed blandit libero. Sed mollis ante non velit sollicitudin ornare. Pellentesque.", endDate: "Tomorrow", startDate: "Today", id: 1, imageUrl: "test"
                    }} />

                    <CompetitionCard competition={{
                        name: "Competition 1"
                        , description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed blandit libero. Sed mollis ante non velit sollicitudin ornare. Pellentesque.", endDate: "Tomorrow", startDate: "Today", id: 1, imageUrl: "test"
                    }} />

                    <CompetitionCard competition={{
                        name: "Competition 1"
                        , description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed blandit libero. Sed mollis ante non velit sollicitudin ornare. Pellentesque.", endDate: "Tomorrow", startDate: "Today", id: 1, imageUrl: "test"
                    }} />

                    {/* <CompetitionCard competition={{
                        name: "Competition 1"
                        , description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed blandit libero. Sed mollis ante non velit sollicitudin ornare. Pellentesque.", endDate: "Tomorrow", startDate: "Today", id: 1, imageUrl: "test"
                    }} /> */}
                </div>
                <div className="col-3 text-center mt-5 fs-2"> Disclaimer</div>


            </div>

        </div>
    );
}
export default ongoingCompetitions;