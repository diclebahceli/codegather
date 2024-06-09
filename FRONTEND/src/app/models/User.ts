import {Competition} from "./Competition";

export interface User {
    id: string;
    userName: string;
    email: string;
    profileImage: string;
    competitions?: Competition[];
    submissions?: any[];
};
