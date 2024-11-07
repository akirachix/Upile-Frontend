export interface MissingPerson {
  id: string;
  first_name: string;
  last_name: string;
  age: number;
  location:string;
  gender: string;
  image: string;
  contact:string;
  clothes_worn: string;
  missing_date: string;
  height: number;
  weight:number;
  hair_color: string;
  eye_color: string;
  skin_color: string;
  created_at: string;
  officer_id: number; 
  status: string
}

export interface FetchMissingPersonsResponse {
  missing_persons: MissingPerson[];
  total_missing_persons: number

}
export interface PersonDetails {
    first_name: string;
    last_name: string;
    age: number;
    gender: string;
}
export interface LastSeenDetails {
    missing_date: string;
    location: string;}



  export interface MissingPersonsData{
    missing_person: MissingPerson[];
    total_missing_persons: number
  }


  export interface Matches{
    name_match:boolean;
    gender_match: boolean;
    location: boolean;
    date_reported:boolean;
    clothes_worn: boolean;
    unidentified_body:UnidentifiedBodies
    missing_person: MissingPerson
  }

  export interface MatchesData{
    matches:Matches[];
  }

  export interface FirstPageForm{
    name: string,
    gender: string,
    location: string,
    reporting_date: string,

  }

  export interface NextPageForm{
  hair_color: string,
  skin_color:string,
  height: number,
  weight: number,
  body_marks?: string,
  clothes_worn?: string,

  }

export interface BodyDetailsData{
    firstpageform?: FirstPageForm[],
    nextpageform?: NextPageForm[],
   
}

export interface UnidentifiedBodies{
    name:string;
    gender:string;
    reporting_date:string;
    clothes_worn: string;
    location: string
}




export interface PhysicalDescription {
    image: string;
    height: number;
    weight: number;
    hair_color: string;
    eye_color: string;
    skin_color: string;
}

export interface MissingPersonData{
    physicaldescription: PhysicalDescription[],
    lastseendetails: LastSeenDetails[],
    persondetails: PersonDetails[],
}

export interface UnidentifiedBodiesData{
    unidentified_bodies: UnidentifiedBodies[];
    total_unidentified_bodies: number
}

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
  missing_persons: MissingPersons[];
  total_missing_persons: number

}


