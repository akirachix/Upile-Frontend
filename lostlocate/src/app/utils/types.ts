export interface PersonDetails {
    officer_id: number;
    first_name: string;
    last_name: string;
    age: number;
    gender: string;
}
export interface LastSeenDetails {
    missing_date: string;
    location: string;
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
export interface nextofkin {
   next_of_kin_id: number
   missing_person_id: number,
   first_name: string,
   last_name : string,
   address: string,
   relationship: string,
   contact: number, 
   alternative_contact: string
}


export interface MissingPersonData{
    physicaldescription: PhysicalDescription[],
    lastseendetails: LastSeenDetails[],
    persondetails: PersonDetails[],
    nextofkin:nextofkin[],
}

