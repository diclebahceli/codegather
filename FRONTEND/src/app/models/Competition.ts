
import {Question} from "./Question";
import {User} from "./User";

export interface Competition {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  questions?: Question[];
  joinedUsers?: User[];
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
