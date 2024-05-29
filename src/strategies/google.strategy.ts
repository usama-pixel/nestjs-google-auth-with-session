import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "src/auth/auth.service";
import { UserDto } from "src/auth/dto/user.dto";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService
    ) {
        super({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CB_URL,
            scope: ['profile', 'email']
        })
    }
    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback
    ): Promise<any> {
        const {id, name, emails, _json: {picture}, displayName} = profile
        // console.log({id, name, emails, picture})
        console.log('...Creating user')
        const user = await this.authService.validateUser({email: emails[0].value, displayName, profile_pic: picture })
        console.log('...Validated')
	return done(null, user)
        // return  user || null
    }
}