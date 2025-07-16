import { Controller, Get, Inject, ParseUUIDPipe, Query, UseGuards, UsePipes } from "@nestjs/common";
import { JwtAuthGuard } from "core/global-modules/jwt-auth-module/guard-strategy/jwt.auth.guard";
import { ControllersRoutes, EndpointsParameters, EndpointsRoutes, INJECTION_KEYS } from "core/@types/enum.keys";
import { IUserPaymentsService } from "./payment.service";

@Controller(ControllersRoutes.payments)
@UseGuards(JwtAuthGuard)
export class PaymentsController {
    constructor(@Inject(INJECTION_KEYS.PaymentService) private readonly paymentService: IUserPaymentsService) {}

    @Get(EndpointsRoutes.filter)
    public async getByCategoryId(@Query(EndpointsParameters.categoryId, ParseUUIDPipe) categoryId: string) {
        return this.paymentService.getByCategoryId(categoryId)
    }
}