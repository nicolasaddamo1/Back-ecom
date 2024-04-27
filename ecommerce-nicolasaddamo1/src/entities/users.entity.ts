import {
    Entity,
    Column,
    OneToMany,
    JoinColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import { Orders } from "./orders.entity";

@Entity({
    name:"users"
})
export class Users{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({
        type:"varchar",
        length: 50,
        nullable: false
    })
    name:string

    @Column({
        type:"varchar",
        length: 50,
        nullable: false,
        unique: true
    })
    email:string

    @Column({
        type:"varchar",
        length: 100,
        nullable: false
    })
    password:string

    @Column({
        default: true
    })
    isAdmin:boolean
    @Column({
        type:"int",

    })
    phone:number

    @Column({
        type:"varchar",
        length: 50
    })
    country:string

    @Column({
        type:"text"
    })
    address:string
    
    @Column({
        type:"varchar",
        length: 50
    })
    city:string

    @OneToMany(() => Orders, (order) => order.user)
    @JoinColumn({ name: "orders_id" })
    orders: Orders[]

}