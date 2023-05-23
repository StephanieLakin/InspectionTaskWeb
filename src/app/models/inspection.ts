import { AssignedToPerson } from "./assignedToPerson";

export interface Inspection {
  id: number;
  name: string;
  location: string;
  assignedToPersonId: number;
  assignedToPerson: AssignedToPerson;
  }
