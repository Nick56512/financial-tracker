import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "core/global-modules/jwt-auth-module/guard-strategy/jwt.auth.guard";
import { ControllersRoutes, EndpointsParameters, EndpointsRoutes, INJECTION_KEYS } from "core/@types/enum.keys";
import { IUserPaymentsService } from "./payment.service";
import { CreatePaymentPayload, FilterPaymentsQuery, PaymentDto, PaymentsSummaryGroupBy, UpdatePaymentPayload } from "./payment.models";

@Controller(ControllersRoutes.payments)
@UseGuards(JwtAuthGuard)
export class PaymentsController {
    constructor(@Inject(INJECTION_KEYS.PaymentService) private readonly paymentService: IUserPaymentsService) {}

    @Get(EndpointsRoutes.filter)
    @UsePipes(new ValidationPipe({ transform: true }))
    public async filter(@Query() params: FilterPaymentsQuery) {
        return this.paymentService.filter(params)
    }

    @Get(`:${EndpointsParameters.id}`)
    public async getById(@Query(EndpointsParameters.id, new ParseUUIDPipe())id: string): Promise<PaymentDto | null> {
        return this.paymentService.findById(id)
    }

    @Get(EndpointsRoutes.summary)
    public async getSummary(
        @Query(EndpointsParameters.groupBy) groupBy: PaymentsSummaryGroupBy,
        @Query(EndpointsParameters.reportId) reportId: string
    ) {
        switch(groupBy) {
            case PaymentsSummaryGroupBy.CATEGORY : return this.paymentService.getPaymentsSummaryByCategories(reportId) 
            default: throw new BadRequestException()
        }
    }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    public async addPayment(@Body() payment: CreatePaymentPayload) {
        const id = this.paymentService.createOrUpdate({
            ...payment
        })
        return {
            id,
            ...payment
        }
    }

    @Put()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    public async updatePayment(@Body() payment: UpdatePaymentPayload) {
        await this.paymentService.createOrUpdate({
            ...payment
        })
        return payment
    }

    @Delete()
    public async deletePayment(@Query(EndpointsParameters.paymentId) paymentId: string) {
        return { 
           success: (await this.paymentService.removeById(paymentId))
        }
    }
}