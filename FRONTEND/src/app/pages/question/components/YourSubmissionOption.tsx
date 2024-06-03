import {Submission} from "@/app/models/Submission";
import {DropdownItem} from "reactstrap";

export default function YourSubmissionOption({submission, onClicked}: {submission: Submission; onClicked: () => void}) {
  const color = submission.successRate !== 0 ? "text-success" : "text-danger";
  return (
    <DropdownItem onClick={onClicked}> 
      <div className={`d-flex flex-row justify-content-between ${color}`}>
        <div className="mx-2">Score:  {submission.score}</div>
        <div className="">
          Success: {submission.successRate}
        </div>
      </div>

    </DropdownItem>
  )

}
