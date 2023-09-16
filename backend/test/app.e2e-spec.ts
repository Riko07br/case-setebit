import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { PrismaService } from "../src/prisma/prisma.service";
import * as pactum from "pactum";
import { SignInDto, SignUpDto } from "../src/auth/dto";

describe("App e2e", () => {
    let app: INestApplication;
    let prisma: PrismaService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        //Basically same thing inside main.ts
        app = moduleRef.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
            })
        );

        await app.init();
        await app.listen(3333); //use 3333 instead of 3000 fro tests

        prisma = app.get(PrismaService);
        await prisma.dropDbTables();
        pactum.request.setBaseUrl("http://localhost:3333");
    });

    afterAll(() => {
        app.close();
    });

    describe("Auth", () => {
        describe("Signup", () => {
            const signUpDto: SignUpDto = {
                name: "tester",
                email: "test@testing.com",
                password: "123456789",
            };

            it("Should throw if email is empty", () => {
                return pactum
                    .spec()
                    .post("/auth/signup")
                    .withBody({ password: signUpDto.password })
                    .expectStatus(400);
            });

            it("Should signup", () => {
                return pactum
                    .spec()
                    .post("/auth/signup")
                    .withBody(signUpDto)
                    .expectStatus(201);
            });
        });

        describe("Signin", () => {
            const signInDto: SignInDto = {
                email: "test@testing.com",
                password: "123456789",
            };

            it("Should throw if email is empty", () => {
                return pactum
                    .spec()
                    .post("/auth/signin")
                    .withBody({ password: signInDto.password })
                    .expectStatus(400);
            });

            it("Should signin", () => {
                return pactum
                    .spec()
                    .post("/auth/signin")
                    .withBody(signInDto)
                    .expectStatus(200)
                    .stores("access_token", "access_token");
            });
        });
    });

    describe("Users", () => {
        describe("Current user", () => {
            it.todo("Should get current user");
            it.todo("Should edit current user");
        });
    });
});
