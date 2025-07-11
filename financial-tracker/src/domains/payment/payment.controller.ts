import { BadRequestException, Controller, Get, Inject, UseGuards } from "@nestjs/common";
import { User } from "core/decorators/user.decorator";
import { JwtAuthGuard } from "core/global-modules/jwt-auth-module/guard-strategy/jwt.auth.guard";
import { JwtPayload } from "core/global-modules/jwt-auth-module/guard-strategy/jwt.strategy";
import { ControllersRoutes, EndpointsRoutes, INJECTION_KEYS } from "core/@types/enum.keys";
import { IUserPaymentsService } from "./payment.service";

@Controller(ControllersRoutes.payment)
@UseGuards(JwtAuthGuard)
export class PaymentsController {
    constructor(@Inject(INJECTION_KEYS.PaymentService) private readonly paymentService: IUserPaymentsService) {}

    @Get(EndpointsRoutes.getAllPayments)
    public async getAllPayments(@User() user: JwtPayload) {
        if(!user.userId) {
            throw new BadRequestException()
        }
        const userPayments = await this.paymentService.getUserPayments(user.userId)
        return userPayments
    }
}