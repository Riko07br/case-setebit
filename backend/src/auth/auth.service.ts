import { Body, ForbiddenException, Injectable, Req, Res } from "@nestjs/common";
import { SignInDto, SignUpDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) {}

    async signUp(@Body() signUpDto: SignUpDto) {
        const hash = await argon.hash(signUpDto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    name: signUpDto.name,
                    email: signUpDto.email,
                    hash,
                },
            });

            return this.signToken(user.id, user.email);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002")
                    throw new ForbiddenException("Credentials taken");
            }
            throw error;
        }
    }

    async signIn(
        @Body() signInDto: SignInDto,
        @Res({ passthrough: false }) res
    ) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: signInDto.email,
            },
        });

        if (!user) throw new ForbiddenException("Invalid credentials");

        const pwMatch = await argon.verify(user.hash, signInDto.password);

        if (!pwMatch) throw new ForbiddenException("Invalid credentials");

        const cookie = await this.signToken(user.id, user.email);

        res.cookie("access_token", cookie.access_token, {
            expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 4), //4h
            httpOnly: true,
        });

        res.send({ message: "Authentication Successful." });
    }

    signOut(@Req() req, @Res({ passthrough: false }) res) {
        if (req.cookies && "access_token" in req.cookies) {
            res.cookie("access_token", "", { expires: new Date() });
            res.send({ message: "Logout Successful." });
        } else {
            res.send({ message: "Logout not needed." });
        }
    }

    async signStatus(@Req() req) {
        if (req.cookies && "access_token" in req.cookies) {
            //console.log("has cookies");

            const secret = this.config.get("JWT_SECRET");

            try {
                await this.jwt.verifyAsync(req.cookies["access_token"], {
                    secret,
                    ignoreExpiration: false,
                });
                //console.log("Successful: " + test.email);
            } catch (error) {
                //console.log("Erro: " + error.message);
                return false;
            }
            return true;
        }
        return false;
    }

    private async signToken(
        userId: number,
        email: string
    ): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email,
        };

        const secret = this.config.get("JWT_SECRET");

        const token = await this.jwt.signAsync(payload, {
            expiresIn: "1m",
            secret: secret,
        });

        return {
            access_token: token,
        };
    }
}
