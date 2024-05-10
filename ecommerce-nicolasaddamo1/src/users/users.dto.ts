import { PickType } from "@nestjs/swagger";
import { MatchPassword } from "src/decorators/matchPassword.decorator";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";
export class CreateUserDto {
    /** 
     * Debe ser un nombre entre 3 y 80 caracteres
     * @example 'Nicolas'
     */
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    @IsString()
    name: string;
    /** 
     *  Debe ser un email valido, y no debe estar vacio
     *  @example 'XWwZa@example.com'
     */
    @IsNotEmpty()
    @IsEmail()
    email: string;
    /**
     * Debe ser un string con al menos una minuscula, una mayuscula, un numero y un caracter especial
     * @example 'Nicolas@123'
     */
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    })
    @MinLength(8)
    @MaxLength(16)
    password: string;
    /**
     * Debe ser un string con al menos una minuscula, una mayuscula, un numero y un caracter especial
     * @example 'Nicolas@123'
     */
    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    confirmPassword: string

    /**     
     * Debe ser un string entre 3 y 80 caracteres, no debe estar vacio, 
     * @example 'Calle falsa 123'
     */
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    @IsString()
    address: string;

    /**
     * Debe ser un numero entre 3 y 80 caracteres, no debe estar vacio
     * @example 123456789
     */

    @IsNotEmpty()
    @IsNumber()
    phone: number;

    /** 
    * Debe ser un string entre 4 y 80 caracteres, no debe estar vacio
    * @example 'Colombia'
    */

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(80)
    @IsString()
    country: string;

    /**
     * Debe ser un string entre 4 y 80 caracteres, no debe estar vacio
     * @example 'Bogota'
     */
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(80)
    @IsString()
    city: string;

    /**
     *Este campo no debe ser llenado por el usuario
     * @example
     */
    @IsEmpty()
    isAdmin?: boolean

}

export class LogingUserDto extends PickType(CreateUserDto, ['email', 'password']) { }