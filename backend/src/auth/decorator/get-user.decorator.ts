import { ExecutionContext, createParamDecorator } from "@nestjs/common";

// Makes easier to retrive data from a request and gives more separation of concerns
export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        if (data) return request.user[data];

        return request.user;
    }
);
