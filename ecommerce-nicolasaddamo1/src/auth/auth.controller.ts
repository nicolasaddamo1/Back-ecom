import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto, LogingUserDto } from "src/users/users.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Autentication: ')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signin')
    signIn(@Body() credentials: LogingUserDto) {
        const {email, password} = credentials
        return this.authService.signIn(email, password)
    }
    @Post('/signup')
    signUp(@Body() user: CreateUserDto) {
        
        return this.authService.signUp(user)

    }
}