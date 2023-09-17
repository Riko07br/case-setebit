import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto, SignUpDto } from "./dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("signup")
    signup(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post("signin")
    signin(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res) {
        return this.authService.signIn(signInDto, res);
    }

    @Get("signout")
    async logout(@Req() req, @Res({ passthrough: true }) res) {
        return this.authService.signOut(req, res);
    }

    @Get("status")
    signStatus(@Req() req) {
        return this.authService.signStatus(req);
    }
}
