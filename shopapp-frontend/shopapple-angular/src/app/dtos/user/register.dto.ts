import{
    IsString,
    IsNotEmpty,
    IsPhoneNumber,
    IsDate
} from 'class-validator'

export class RegisterDTO {
    @IsString()
    full_name: string;

    @IsPhoneNumber( )
    phone_number: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    retype_password: string;

    @IsDate()
    date_of_birth: Date;

    @IsString()
    gender: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    facebook_account_id: number=0;

    google_account_id: number=0;

    role_id: number=1;
    constructor(data: any) {
        this.full_name = data.fullname;
        this.phone_number = data.phone_number;
        this.password = data.password;
        this.retype_password = data.retype_password;
        this.gender = data.gender;
        this.address = data.address;
        this.date_of_birth = new Date();
        this.facebook_account_id = data.facebook_account_id || 0;
        this.google_account_id = data.google_account_id || 0;
        this.role_id = data.role_id || 1;
    }
}