import { Role } from "../../models/role";
export interface UserResponse {
    id: number;
    full_name: string;
    phone_number: string;
    address:string;
    is_active: boolean;
    date_of_birth: Date;
    gender: string;
    facebook_account_id: number;
    google_account_id: number;
    role: Role;    
}

