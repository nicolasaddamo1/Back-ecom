import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UsersRepository } from "src/users/users.repository";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/users.dto";
import { CategoriesRepository } from "src/categories/categories.repository";
import { ProductsRepository } from "src/products/products.repository";
@Injectable()
export class AuthService {
constructor(private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly productsRepository: ProductsRepository

) {}

    async signIn(email: string, password: string) {
      
        const user =  await this.userRepository.getUserByEmail(email)
        if(!user) { 
           throw new BadRequestException("Invalid Credentials")
        }

        const validatedPassword = bcrypt.compare(password, user.password)
        
        if(!validatedPassword) {
            throw new BadRequestException("Invalid Credentials")
        }
        const payload = {id: user.id, email: user.email, isAdmin: user.isAdmin}
        const token = await this.jwtService.sign(payload)
        return {
            token,
            payload,

        message:"logged in successfully"}
    }
    async signUp(user: Partial<CreateUserDto>) {
        const {confirmPassword, ...userWithoutPass} = user
        
        const {email, password} = userWithoutPass
        const foundUser= await this.userRepository.getUserByEmail(email)
        if(foundUser) {
            throw new Error('User already exists')
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        return this.userRepository.addUser({...userWithoutPass, password: hashedPassword, })
    }
}