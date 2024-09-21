export interface MissingPerson {
    first_name: string;
    last_name: string;
    age: number;
   
  }

  export interface MissingPersonsData{
    missing_person: MissingPerson[];
    total_missing_persons: number
  }