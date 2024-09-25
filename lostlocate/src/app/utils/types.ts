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