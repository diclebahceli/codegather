
import {Question} from "./Question";
import {UserScore} from "./UserScore";

export interface Competition {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  questions?: Question[];
  joinedUsers?: UserScore[];
  isPublic: boolean;
}

export const DefaultCompetition: Competition = {
  id: "",
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  isPublic: false
};
