import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {

    constructor(private readonly usersRepository: UsersRepository) {}
    
    getUsers(page: number, limit: number) {
        return this.usersRepository.getUsers(page, limit);
    }
    getUsersByName(name: string) {
        return this.usersRepository.getUsersByName(name);
    }
    getUserById(id: string) {
        return this.usersRepository.getUser(id);    
    }
    addUser(user: any) {
        return this.usersRepository.addUser(user);
    }
    updateUser(id: string, user: any) {
        return this.usersRepository.updateUser(id, user);
    }
    deleteUser(id: string) {
        return this.usersRepository.deleteUser(id);
    }
}