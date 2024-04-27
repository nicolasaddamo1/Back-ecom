import { Products } from "src/entities/products.entity"
import { ApiProperty } from "@nestjs/swagger"
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator"

export class CreateOrderDto {
    /**
     * Debe ser un string que no es llenado por el usuario

     */ 
    @ApiProperty({example: "f47ac10b-58cc-4372-a567-0e02b2c3d479"})
    // @IsUUID()
    // @IsNotEmpty()
    userId: string
    
    /**
     * Debe ser un array que no es vacio, con un minimo de 1 elemento
     */
    @ApiProperty({example: [{"id":"d282d6fa-1304-40a4-8003-998a39c62165"},{"id":"ea3e848d-d895-4900-b7dd-5e3b43b22793"}]})
    @IsArray()
    @ArrayMinSize(1)
    products: Partial<Products[]>

}