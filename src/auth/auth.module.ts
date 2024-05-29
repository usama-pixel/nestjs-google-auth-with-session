import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from '../strategies/google.strategy';
import { User } from '../typeorm/entities/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionSerializer } from 'src/utils/Serialize';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [
        GoogleStrategy,
        SessionSerializer,
        {
            provide: 'AUTH_SERVICE',
            useClass: AuthService
        },
    ],
    exports: []
})
export class AuthModule {}
