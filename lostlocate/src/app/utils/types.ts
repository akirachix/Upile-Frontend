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
}

export interface FetchMissingPersonsResponse {
  missing_persons: MissingPerson[];
  total_missing_persons: number

}
export interface PersonDetails {
    officer_id: number;
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
    clothes_worn: boolean;
    unidentified_body:[]
    missing_person: MissingPerson
  }

  export interface MatchesData{
    matches:Matches[];
  }

  export interface FirstPageForm{
    staff_id: number,
    name: string,
    gender: string,
    location: string,
    reporting_date: Date,

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
    id:number;
    name:string;
    gender:string;
    reporting_date:Date;
    clothes_worn: string;
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



