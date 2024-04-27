import { Users } from "src/entities/users.entity"
import * as bcrypt from "bcrypt"
import { Repository } from "typeorm"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class UsersRepository{
    
    constructor(
        @InjectRepository(Users) private readonly usersRepository: Repository<Users>){}

    async getUsers(page: number, limit: number):Promise<Partial<Users>[]>{
        let users = await this.usersRepository.find()
        const start = (page - 1) * limit
        const end = start + limit
        users = users.slice(start, end)
        return users.map(({password, ...user}) => user)

    }
    async getUser(id: string){
        const user = await this.usersRepository.findOne({
            where: {id},
            relations: {
                orders: true
            }
        })
        if (!user) {
            return "User not found"
        }
        const {password, isAdmin, ...userWithoutPass} = user
        return userWithoutPass
    }

    async addUser(user: Partial<Users>):Promise<Partial<Users>>{
        const newUser = await this.usersRepository.save(user)
        const {password,isAdmin, ...userWithoutPass} = newUser
        return userWithoutPass
    }
    
    async updateUser(id: string, user: Users){
        const hashedPassword2 = await bcrypt.hash(user.password, 10)
        const {password, ...userwithHashedPass}=user
        const user2 = {...userwithHashedPass, password: hashedPassword2}
         await this.usersRepository.update(id, user2 )

         const updatedUser = await this.usersRepository.findOneBy({id})
         const {password:passwordToRemove, ...userWithoutPass} = updatedUser

         return  {...userWithoutPass}
         
    }

    async getUsersByName(name: string) {
        const user = await this.usersRepository.findOneBy({name})
        if (!user) {
            return "User not found"
        }
        const {password, ...userWithoutPass} = user
        return  userWithoutPass
    }

    async deleteUser(id: string):Promise<Partial<Users>>{
            const user = await this.usersRepository.findOneBy({id})
            this.usersRepository.remove(user)
            const {password, ...userWithoutPass} = user
            return userWithoutPass
            
            
    }
    async getUserByEmail(email: string):Promise<Users>{
            return await this.usersRepository.findOneBy({email})
    }
        
        
    }
    