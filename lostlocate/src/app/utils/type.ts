export interface MissingPersons {
    first_name: string;
    last_name: string;
    age: number;
  }

export interface NextOfKin {
    missing_person_id: number,
    first_name: string,
    last_name : string,
    address: string,
    relationship: string,
    contact: string,
    alternative_contact: string
  }
  
export interface MissingPersonsData{
    missing_person: MissingPersons[];
    total_missing_persons: number

  }

