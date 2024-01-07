export default interface IUserProps {
    id: string;
    name: string;
    email: string;
    password: string;
    rooms: string[];
    userSalt: string;
}

export interface InewUserProps {
    name: string;
    email: string;
    password: string;
}