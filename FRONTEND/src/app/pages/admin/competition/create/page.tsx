"use client";
import {Competition} from "@/app/models/Competition";
import {CreateCompetition} from "@/app/services/CompetitionService";
import {useRouter} from "next/navigation";
import {useState} from "react";
import toast from "react-hot-toast";

export default function Page() {
  const [competitionData, setCompetitionData] = useState<Competition>({} as Competition);
  const router = useRouter();

  const handleInputChange = (e: any) => {
    const {name, value} = e.target;
    setCompetitionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log(competitionData);
      const result = await CreateCompetition(competitionData)
      if (result.error) {
        toast.error(result.error)
        return;
      }
      toast.success("Competition created successfully")

      setTimeout(() => {
        router.replace("/pages/admin/competition");
      }, 1000);
    }
    catch (error: Error | any) {
      toast.error("Error creating competition")

    }
  }
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <form action={handleSubmit} className="col-6">
        <div className="container">
          <h1>Create Competition</h1>

          <div className="form-floating rounded my-3">
            <input
              className="form-control border border-2"
              type="text"
              name="title"
              placeholder="title"
              required={true}
              onChange={handleInputChange}
            />
            <label htmlFor={"title"}>Title</label>
          </div>
          <div className="form-floating rounded my-3">
            <textarea
              className="form-control border border-2"
              name="description"
              placeholder="description"
              required={true}
              onChange={handleInputChange}
            />
            <label htmlFor={"description"}>Description</label>
          </div>

          <div className="form-floating rounded my-3">
            <input
            className="form-control border border-2"
            type="datetime-local"
              name="startDate"
              required={true}
              onChange={handleInputChange}
            />
            <label htmlFor="startDate">Start Date</label>
          </div>

          <div className="form-floating rounded my-3">
            <input
            className="form-control border border-2"
            type="datetime-local"
              name="endDate"
              required={true}
              onChange={handleInputChange}
            />
            <label htmlFor="endDate">End Date </label>
          </div>
          <button className="btn btn-primary mt-3 text-white">Create</button>
        </div>
      </form>
    </div>

  );
}
