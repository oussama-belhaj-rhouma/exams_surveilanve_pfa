import { Section } from "./Section"

export interface Etudiant {
    id: number,
    firstName: string,
    lastName: string,
    username: string
    email: string,
    section: Section

}