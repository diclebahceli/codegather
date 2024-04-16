import { Competition } from "@/app/models/Competition";
import { getAllCompetitions } from "@/app/services/CompetitionService";
import { use, useEffect, useState } from "react";

const CompetitionPage = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await getAllCompetitions();
        setCompetitions(response.data || []);
        console.log(competitions);
        console.log(response);
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    };
    fetchCompetitions();
  }, []);
};
