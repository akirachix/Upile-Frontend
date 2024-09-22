export interface MissingPersons {
    first_name: string;
    last_name: string;
    age: number;
  }
export interface MissingPersonsData{
    missing_person: MissingPersons[];
    total_missing_persons: number
  }

