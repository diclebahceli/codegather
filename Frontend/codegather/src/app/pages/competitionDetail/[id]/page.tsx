import { Competition } from "@/app/models/Competition";

const competitionDetail = (comp: Competition) => {
    return (

        <div className="h-100 bg-theme-background" style={{ backgroundAttachment: 'fixed' }}>
            <h1 className="fs-1 pt-5 container">{comp.name}</h1>
            <h1>SELAMUN ALY</h1>
        </div>
    );
}

export default competitionDetail;