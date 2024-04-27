import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthRepository {
    constructor() {}
    resp() {
        return "Aqui vemos la respuesta de AuthRepository"
    }
    
}