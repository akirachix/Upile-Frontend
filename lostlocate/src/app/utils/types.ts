export interface MissingPerson {

    first_name: string;
    created_at:Date
    last_name: string;
    age: number;
    gender: string;
    location:string;
    image: string;
    clothes_worn: string;
   
  }

  export interface MissingPersonsData{
    missing_person: MissingPerson[];
    total_missing_persons: number
  }


  export interface Matches{
    name_match:boolean;
    gender_match: boolean;
    clothes_worn: boolean;
    unidentified_body:[]
    missing_person: MissingPerson
  }

  export interface MatchesData{
    matches:Matches[];
  }