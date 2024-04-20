// import InputField from "@/app/components/input_field/InputField";
// import { Competition } from "@/app/models/Competition";
// import { deleteCompetition, getAllCompetitions } from "@/app/services/CompetitionService";
// import { use, useEffect, useState } from "react";

// const CompetitionPage = () => {
//   const [competitions, setCompetitions] = useState<Competition[]>([]);
//   useEffect(() => {
//     const fetchCompetitions = async () => {
//       try {
//         const response = await getAllCompetitions();
//         setCompetitions(response.data || []);
//         console.log(competitions);
//         console.log(response);
//       } catch (error) {
//         console.error("Error fetching competitions:", error);
//       }
//     };
//     fetchCompetitions();
//   }, []);

//   const [showConfirmation, setShowConfirmation] = useState(false);

//   const handleDelete = async (competitionId: string) => {
//     if (showConfirmation) {
//       await deleteCompetition(competitionId);
//       window.location.reload();
//       setShowConfirmation(false);
//     } else {
//       setShowConfirmation(true);
//     }
//   };

//   return (
//     <form action={handleDelete}>
//       <div className="container">
//         <h1>Edit Competitions</h1>

//         <div className="form-group">
//           <label htmlFor="fullName">Competition Title</label>
//         </div>
//         <div className="form-group">
//           <label htmlFor="fullName">Competition Description</label>
//           <InputField
//             type="text"
//             name="description"
//             label="description"
//             required={true}
//             value={competitions.description}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="fullName">Competition Description</label>
//           <InputField
//             type="text"
//             name="startDate"
//             label="startDate"
//             required={true}
//             value={competitions.startDate}
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="fullName">Competition Description</label>
//           <InputField
//             type="text"
//             name="endDate"
//             label="endDate"
//             required={true}
//             value={competitions.endDate}
//           />
//         </div>

//         <button
//                   className="btn btn-danger"
//                   onClick={() => handleDelete(team.id)}
//                 >
//                   Delete
//                 </button>
//                 {showConfirmation && (
//                   <div>
//                     <p>Are you sure you want to delete this team?</p>
//                     <button onClick={() => handleDelete(team.id)}>Yes</button>
//                     <button onClick={() => setShowConfirmation(false)}>
//                       No
//                     </button>
//                   </div>
//       </div>
//     </form>
//   );

// }
// };

