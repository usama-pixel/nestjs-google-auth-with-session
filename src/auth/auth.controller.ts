import { Controller, Get, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "src/guards/google-auth.guard";

@Controller('auth')
export class AuthController {
    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleLogin() {
        return {msg: 'Google Auth'}
    }
    // auth/google/callback
    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    handleCallback() {
        return {msg: 'ok'}
    }
}