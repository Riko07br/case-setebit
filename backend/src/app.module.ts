import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FdoModule } from "./fdo/fdo.module";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        FdoModule,
        UsersModule,
        PrismaModule,
        AuthModule,
        JwtModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
