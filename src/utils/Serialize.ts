import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "src/auth/auth.service";
import { User } from "../typeorm/entities/User.entity";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService
    ) {
        super()
    }
    serializeUser(user: User, done: Function) {
        console.log('Serializing user')
        done(null, user)
    }
    async deserializeUser(payload: any, done: Function) {
        const user = await this.authService.findUser(payload.id)
        console.log('Deserializing user')
        console.log({userYOO: user})
        return user ? done(null, user) : done(null, null)
    }
}