import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../../prisma/prisma.service";
import { Request as RequestType } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(
        private config: ConfigService,
        private prisma: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            secretOrKey: config.get("JWT_SECRET"),
            ignoreExpiration: false,
        });
    }

    async validate(payload: { sub: number; email: string }) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub,
            },
        });
        //console.log(user != undefined ? user.name : "no user found");
        delete user.hash;
        return user;
    }

    private static extractJWT(req: RequestType): string | null {
        if (req.cookies && "access_token" in req.cookies) {
            //console.log("has cookies");
            return req.cookies["access_token"];
        }
        //console.log("cookie null");
        return null;
    }
}
