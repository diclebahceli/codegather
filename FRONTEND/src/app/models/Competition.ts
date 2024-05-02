
import {Question} from "./Question";
import {UserDto} from "./UserDto";

export interface Competition {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  questions?: Question[];
  joinedUsers?: UserDto[];
  isPublic: boolean;
}
