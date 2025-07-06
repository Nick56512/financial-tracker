import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { DbContext } from "data-provider";
import { INJECTION_KEYS } from "types";

@Injectable()
export class DatabaseCreateConnection implements OnModuleInit {
    constructor(@Inject(INJECTION_KEYS.DbContext)private readonly dbContext: DbContext) {}
    async onModuleInit() {
        await this.dbContext.createConnection()
    }
}