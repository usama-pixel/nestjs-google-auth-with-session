import { Injectable } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../typeorm/entities/User.entity";
import { Repository } from "typeorm";

@Injectable() // a provider must always have this Injectable decorator
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ){}
    async validateUser(userDto: UserDto) {
        const user = await this.userRepo.findOneBy({email: userDto.email})
        console.log({user})
        if(user) {
            // to updated the name or profile pic if the user has changed them on his google account
            const updatedUser = await this.userRepo.update(user.id, userDto)
            return updatedUser
        }
        const newUser = this.userRepo.create(userDto)
        return this.userRepo.save(newUser)
    }
    async findUser(id: number) {
        const user = await this.userRepo.findOneBy({id})
        return user
    }
}