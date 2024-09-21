
export interface BodyDetailsData {
    staff_id:number;
    name: string;
    gender: string;
    location: string;
    reporting_date: string; 
    hair_color: string;
    skin_color: string;
    height: number; 
    weight: number; 
    body_marks: string;
    clothes_worn: string;
}

export interface UnidentifiedBodies{
    id:number;
    name:string;
    gender:string;
    reporting_date:string;
    clothes_worn: string;
}


export interface UnidentifiedBodiesData{
    unidentified_bodies: UnidentifiedBodies[];
    total_unidentified_bodies: number
}



