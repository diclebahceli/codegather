import {Competition} from "./Competition";

export interface UserDto {
    id: string;
    userName: string;
    email: string;
    competitions?: Competition[];
    submissions?: any[];
};
