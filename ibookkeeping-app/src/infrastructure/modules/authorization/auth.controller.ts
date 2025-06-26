import { Controller, Post, Body, UsePipes, ValidationPipe } from "@nestjs/common";
import { User } from "data-provider";
import { LoginPayload } from "dto/dtos";
import { IService } from "infrastructure/service/idto.service";

@Controller('auth')
export class AuthController {

    constructor(private readonly userService: IService<User>) {}

    @Post('login')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    public login(@Body() credentials: LoginPayload) {
        this.userService.
    }
}