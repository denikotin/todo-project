import { Role } from "../enums/roles";

export interface User{
    id: string;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    role: Role;
}
