import { Controller, Get, Inject, UseGuards } from "@nestjs/common";
import { User } from "decorators/user.decorator";
import { IService } from "infrastructure";
import { UserDto } from "models/dtos";
import { JwtAuthGuard } from "modules/global/jwt-auth-module/guard-strategy/jwt.auth.guard";
import { JwtPayload } from "modules/global/jwt-auth-module/guard-strategy/jwt.strategy";
import { ControllersRoutes, EndpointsRoutes, INJECTION_KEYS } from "types";

@Controller(ControllersRoutes.payment)
@UseGuards(JwtAuthGuard)
export class PaymentsController {
    constructor(@Inject(INJECTION_KEYS.PaymentService) private readonly paymentService: IService<UserDto>) {}

    @Get(EndpointsRoutes.all)
    public getAllPayments(@User() user: JwtPayload) {
        
    }


}