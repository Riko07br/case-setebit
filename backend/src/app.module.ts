import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FdoModule } from "./fdo/fdo.module";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { BetsModule } from "./bets/bets.module";
import { BetsPoolsModule } from "./bets-pools/bets-pools.module";
import { GamesModule } from './games/games.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        FdoModule,
        UsersModule,
        PrismaModule,
        AuthModule,
        JwtModule,
        BetsModule,
        BetsPoolsModule,
        GamesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
